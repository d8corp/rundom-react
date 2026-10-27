#!/usr/bin/env node
/* eslint-disable no-console,import/no-nodejs-modules */
import { program } from 'commander'
import cssnano from 'cssnano'
import * as dotenv from 'dotenv'
import { createHash } from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { pathToFileURL } from 'node:url'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import * as sass from 'sass'

const DEFAULT_INPUT = 'theme.scss'
const DEFAULT_OUTPUT = '.env.theme'
const DEFAULT_PREFIX = 'rd_'
const ENV_PREFIX = 'RD_THEME_'
const GLOBAL_AT_RULES = new Set(['font-face', 'property', 'layer', 'charset'])
const KEYFRAMES_RE = /^(?:-[a-z]+-)?keyframes$/i
const ANIMATION_PROP_RE = /^(?:-[a-z]+-)?animation(?:-name)?$/i
const IDENT_RE = /-?[_a-zA-Z][\w-]*/g
const VIEW_TRANSITION_RE = /^::?view-transition-/
const VT_DECL_RE = /^view-transition-(?:name|class)$/i
const VT_CLASS_PROP_RE = /^view-transition-class$/i
const VT_NAME_KEYWORDS = new Set(['none', 'auto', 'match-element'])

export interface ThemeOptions {
  input?: string
  output?: string
  prefix?: string
  minify?: boolean
}

export interface ThemeSummary {
  components: number
  globalNodes: number
  keyframes: number
  scopedKeyframes: number
  viewTransitions: number
  updated: number
  added: number
  removed: number
}

const GLOBAL_OWNER = null
type Owner = string | typeof GLOBAL_OWNER

const escapeRegExp = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const toEnvKey = (name: string) => name.toUpperCase().replace(/-/g, '_')
const hash = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 6)

type WithParent = { parent?: any }

function hasAncestor (node: WithParent, test: (p: any) => boolean): boolean {
  for (let p = node.parent; p; p = p.parent) {
    if (test(p)) return true
  }

  return false
}

const isInsideGlobalAtRule = (node: postcss.Node, globalAtRules: Set<string>) =>
  hasAncestor(node, p => p.type === 'atrule' && globalAtRules.has(p.name))

const isGlobalPseudo = (n: any) =>
  n.type === 'pseudo' && (n.value === ':global' || VIEW_TRANSITION_RE.test(n.value))

function wrapInAtRuleAncestors (
  source: postcss.ChildNode,
  node: postcss.ChildNode = source.clone(),
): postcss.ChildNode {
  for (let p: any = source.parent; p?.type === 'atrule'; p = p.parent) {
    node = (p as postcss.AtRule).clone().removeAll().append(node)
  }

  return node
}

function getViewTransitionNames (selector: string): string[] {
  const names: string[] = []

  selectorParser((selectors) => {
    selectors.walkPseudos((pseudo) => {
      if (!VIEW_TRANSITION_RE.test(pseudo.value)) return

      pseudo.walk((n) => {
        if (n.type === 'class') names.push(`.${n.value}`)
        else if (n.type === 'tag') names.push(n.value)
        else if (n.type === 'universal') names.push('*')
      })
    })
  }).processSync(selector)

  return names
}

function collectViewTransitionNameOwners (
  root: postcss.Root,
  componentRegex: RegExp,
): Map<string, Set<Owner>> {
  const owners = new Map<string, Set<Owner>>()

  root.walkDecls(VT_DECL_RE, (decl) => {
    const isClass = VT_CLASS_PROP_RE.test(decl.prop)

    const keys = decl.value.trim().split(/\s+/)
      .filter(v => v && !VT_NAME_KEYWORDS.has(v))
      .map(v => (isClass ? `.${v}` : v))

    if (!keys.length) return

    const components = decl.parent?.type === 'rule'
      ? (decl.parent as postcss.Rule).selectors
          .map(sel => sel.match(componentRegex)?.[1])
          .filter((c): c is string => Boolean(c))
      : []

    for (const key of keys) {
      const set = owners.get(key) ?? new Set<Owner>()

      for (const o of components.length ? components : [GLOBAL_OWNER]) set.add(o)
      owners.set(key, set)
    }
  })

  return owners
}

function resolveSelectorOwner (
  selector: string,
  nameOwners: Map<string, Set<Owner>>,
  prefixedNameRe: RegExp,
): Owner {
  const names = getViewTransitionNames(selector)
  if (!names.length) return GLOBAL_OWNER

  const all = new Set<Owner>()

  for (const name of names) {
    if (name === '*' || name === 'root') return GLOBAL_OWNER
    const declared = nameOwners.get(name)

    if (declared) declared.forEach(o => all.add(o))
    else all.add(name.match(prefixedNameRe)?.[1] ?? GLOBAL_OWNER)
  }

  const [owner] = all

  return all.size === 1 ? owner : GLOBAL_OWNER
}

function createSelectorTransformer (prefix: string, classList: Record<string, string>) {
  return selectorParser((selectors) => {
    selectors.walkClasses((cls) => {
      if (hasAncestor(cls, isGlobalPseudo)) return
      const [component, element = 'root'] = cls.value.split('_')
      cls.value = prefix + cls.value
      classList[`${ENV_PREFIX}${toEnvKey(component)}__${toEnvKey(element)}`] = cls.value
    })

    selectors.walkPseudos((pseudo) => {
      if (pseudo.value === ':global') {
        pseudo.replaceWith(...pseudo.nodes.map(n => n.clone()))
      }
    })
  })
}

function extractKeyframes (root: postcss.Root, prefix: string): Map<string, postcss.ChildNode[]> {
  const byName = new Map<string, postcss.AtRule[]>()

  root.walkAtRules(KEYFRAMES_RE, (atRule) => {
    byName.set(atRule.params, [...(byName.get(atRule.params) ?? []), atRule])
  })

  const renamed = new Map<string, string>()

  for (const [name, atRules] of byName) {
    renamed.set(name, `${prefix}${name}-${hash(atRules.map(String).join(''))}`)
  }

  root.walkDecls(ANIMATION_PROP_RE, (decl) => {
    decl.value = decl.value.replace(IDENT_RE, token => renamed.get(token) ?? token)
  })

  const keyframes = new Map<string, postcss.ChildNode[]>()

  for (const [name, atRules] of byName) {
    const newName = renamed.get(name)!

    keyframes.set(newName, atRules.map((atRule) => {
      atRule.params = newName
      const wrapped = wrapInAtRuleAncestors(atRule)
      atRule.remove()

      return wrapped
    }))
  }

  return keyframes
}

function collectKeyframeOwners (
  componentRoot: postcss.Root,
  globalRoot: postcss.Root,
  viewTransitions: Map<string, postcss.ChildNode[]>,
  names: Set<string>,
  componentRegex: RegExp,
): Map<string, Set<Owner>> {
  const owners = new Map<string, Set<Owner>>()

  const track = (container: postcss.Root, getOwners: (decl: postcss.Declaration) => Owner[]) => {
    container.walkDecls(ANIMATION_PROP_RE, (decl) => {
      const used = (decl.value.match(IDENT_RE) ?? []).filter(token => names.has(token))
      if (!used.length) return
      const declOwners = getOwners(decl)

      for (const name of used) {
        const set = owners.get(name) ?? new Set<Owner>()
        declOwners.forEach(o => set.add(o))
        owners.set(name, set)
      }
    })
  }

  track(globalRoot, () => [GLOBAL_OWNER])

  track(componentRoot, (decl) => {
    const components = decl.parent?.type === 'rule'
      ? (decl.parent as postcss.Rule).selectors
          .map(sel => sel.match(componentRegex)?.[1])
          .filter((c): c is string => Boolean(c))
      : []

    return components.length ? components : [GLOBAL_OWNER]
  })

  for (const [component, nodes] of viewTransitions) {
    track(postcss.root().append(nodes.map(n => n.clone())), () => [component])
  }

  return owners
}

function splitGlobalAndComponentRules (
  root: postcss.Root,
  componentRegex: RegExp,
  prefixedNameRe: RegExp,
  globalAtRules: Set<string>,
) {
  const components = new Set<string>()
  const candidates: { owner: Owner, node: postcss.ChildNode }[] = []
  const nameOwners = collectViewTransitionNameOwners(root, componentRegex)

  root.walk((node) => {
    if (isInsideGlobalAtRule(node, globalAtRules)) return

    if (node.type === 'atrule' && globalAtRules.has(node.name)) {
      candidates.push({ owner: GLOBAL_OWNER, node: node.clone() })
      node.remove()

      return
    }

    if (node.type !== 'rule') return

    const globalByOwner = new Map<Owner, string[]>()
    const componentSelectors: string[] = []

    for (const sel of node.selectors) {
      const match = sel.match(componentRegex)

      if (match) {
        componentSelectors.push(sel)
        components.add(match[1])
      } else {
        const owner = resolveSelectorOwner(sel, nameOwners, prefixedNameRe)
        globalByOwner.set(owner, [...(globalByOwner.get(owner) ?? []), sel])
      }
    }

    for (const [owner, selectors] of globalByOwner) {
      candidates.push({ owner, node: wrapInAtRuleAncestors(node, node.clone({ selectors })) })
    }

    if (componentSelectors.length) node.selectors = componentSelectors
    else node.remove()
  })

  const globalNodes: postcss.ChildNode[] = []
  const viewTransitions = new Map<string, postcss.ChildNode[]>()

  for (const { owner, node } of candidates) {
    if (owner !== GLOBAL_OWNER && components.has(owner)) {
      viewTransitions.set(owner, [...(viewTransitions.get(owner) ?? []), node])
    } else {
      globalNodes.push(node)
    }
  }

  return { globalNodes, components, viewTransitions }
}

async function extractComponentCss (
  root: postcss.Root,
  component: string,
  prefix: string,
  extras: postcss.ChildNode[],
  minifyCss: (css: string) => Promise<string>,
): Promise<string> {
  const re = new RegExp(`^\\.${prefix}${component}(?![a-zA-Z0-9-])`)
  const clone = root.clone()

  clone.walkRules((rule) => {
    const selectors = rule.selectors.filter(sel => re.test(sel))
    if (selectors.length) rule.selectors = selectors
    else rule.remove()
  })

  clone.prepend(extras.map(n => n.clone()))

  return minifyCss(clone.toString())
}

const readEnv = (filePath: string): Record<string, string> =>
  fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath, 'utf-8')) : {}

function writeEnv (filePath: string, vars: Record<string, string>): void {
  const directory = path.dirname(filePath)
  if (directory !== '.') fs.mkdirSync(directory, { recursive: true })

  const content = Object.entries(vars)
    .map(([key, value]) => `${key}='${value}'`)
    .join('\n')

  fs.writeFileSync(filePath, content, 'utf-8')
}

export async function generateEnvFromScss (options: ThemeOptions = {}): Promise<ThemeSummary> {
  const input = options.input ?? DEFAULT_INPUT
  const output = options.output ?? DEFAULT_OUTPUT
  const prefix = options.prefix ?? process.env.RD_THEME__PREFIX ?? DEFAULT_PREFIX
  const shouldMinify = options.minify ?? true

  if (!fs.existsSync(input)) {
    throw Error(`Theme file not found: ${input}`)
  }

  const minifyCss = shouldMinify
    ? async (css: string) => (await postcss([cssnano({ preset: 'default' })]).process(css, { from: undefined })).css
    : async (css: string) => css

  const prefixedNameRe = new RegExp(`^${escapeRegExp(prefix)}([a-zA-Z0-9-]+)`)
  const componentRegex = new RegExp(`^\\.${escapeRegExp(prefix)}([a-zA-Z0-9-]+)`)
  const root = postcss.parse(sass.compile(input).css)

  const classList: Record<string, string> = {}
  const transformer = createSelectorTransformer(prefix, classList)
  root.walkRules((rule) => { rule.selector = transformer.processSync(rule.selector) })

  const keyframes = extractKeyframes(root, prefix)

  const { globalNodes, components, viewTransitions } = splitGlobalAndComponentRules(
    root,
    componentRegex,
    prefixedNameRe,
    GLOBAL_AT_RULES,
  )

  const globalRoot = postcss.root().append(globalNodes)

  const owners = collectKeyframeOwners(
    root,
    globalRoot,
    viewTransitions,
    new Set(keyframes.keys()),
    componentRegex,
  )

  const componentKeyframes = new Map<string, postcss.ChildNode[]>()

  for (const [name, nodes] of keyframes) {
    const nameOwners = owners.get(name)
    const [owner] = nameOwners ?? []

    if (nameOwners?.size === 1 && owner !== GLOBAL_OWNER && components.has(owner)) {
      componentKeyframes.set(owner, [...(componentKeyframes.get(owner) ?? []), ...nodes])
    } else {
      globalRoot.prepend(nodes)
    }
  }

  const componentExtras = new Map<string, postcss.ChildNode[]>()

  for (const c of components) {
    const extras = [...(componentKeyframes.get(c) ?? []), ...(viewTransitions.get(c) ?? [])]
    if (extras.length) componentExtras.set(c, extras)
  }

  const nextVars: Record<string, string> = {
    [`${ENV_PREFIX}_PREFIX`]: prefix,
    ...classList,
  }

  const globalCss = await minifyCss(globalRoot.toString())
  if (globalCss) nextVars[`${ENV_PREFIX}_ROOT`] = globalCss

  const componentCss = await Promise.all(
    [...components].map(async c => [c, await extractComponentCss(
      root,
      c,
      escapeRegExp(prefix),
      componentExtras.get(c) ?? [],
      minifyCss,
    )] as const),
  )

  for (const [component, css] of componentCss) {
    if (css) nextVars[`${ENV_PREFIX}${toEnvKey(component)}`] = css
  }

  const existing = readEnv(output)

  const isStale = (key: string) =>
    key.startsWith(ENV_PREFIX) && !key.startsWith(`${ENV_PREFIX}_`) && !(key in nextVars)

  const nextKeys = Object.keys(nextVars)
  const added = nextKeys.filter(k => !(k in existing)).length
  const updated = nextKeys.filter(k => k in existing && existing[k] !== nextVars[k]).length
  const removed = Object.keys(existing).filter(isStale).length

  const finalVars = {
    ...Object.fromEntries(Object.entries(existing).filter(([k]) => !isStale(k))),
    ...nextVars,
  }

  writeEnv(output, finalVars)

  return {
    components: components.size,
    globalNodes: globalNodes.length,
    keyframes: keyframes.size,
    scopedKeyframes: [...componentKeyframes.values()].flat().length,
    viewTransitions: [...viewTransitions.values()].flat().length,
    updated,
    added,
    removed,
  }
}

program
  .name('rundom-react-theme')
  .description('Compile a scss theme into a .env file for Rundom React UI')
  .option('-i, --input <file>', 'input scss file', DEFAULT_INPUT)
  .option('-o, --output <file>', 'output env file', DEFAULT_OUTPUT)
  .option('-p, --prefix <prefix>', 'class name prefix', process.env.RD_THEME__PREFIX ?? DEFAULT_PREFIX)
  .option('--no-minify', 'disable css minification')
  .option('-e, --error', 'show error details')
  .action(async ({ input, output, prefix, minify, error }) => {
    console.log('Starting env from scss')

    try {
      const summary = await generateEnvFromScss({ input, output, prefix, minify })

      console.log(`Found components: ${summary.components}`)
      console.log(`Found global nodes: ${summary.globalNodes}`)
      console.log(`Found keyframes: ${summary.keyframes} (component-scoped: ${summary.scopedKeyframes})`)
      console.log(`Found component view-transition nodes: ${summary.viewTransitions}`)
      console.log(`✅ Successfully updated ${output} (Updated: ${summary.updated}, Added: ${summary.added}, Removed: ${summary.removed})`)
    } catch (e) {
      if (error) console.error(e)
      else console.error(e instanceof Error ? e.message : e)

      process.exitCode = 1
    }
  })

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href

if (isMain) {
  program.parse(process.argv)
}
