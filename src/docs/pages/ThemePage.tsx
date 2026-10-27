import { Highlight, Page, Title } from '../ui'

import { Button, Code, Flex, Typography } from '../../ui'
import styles from './DocPage.module.scss'

const options: [string, string, string][] = [
  ['-i, --input <file>', 'theme.scss', 'Source SCSS file compiled with the Sass compiler.'],
  ['-o, --output <file>', '.env.theme', 'Generated env file. Existing non-theme keys are preserved.'],
  ['-p, --prefix <prefix>', 'rd_', 'Class name prefix. Can also be set with RD_THEME__PREFIX.'],
  ['--no-minify', 'minified', 'Write readable CSS chunks instead of minified ones.'],
  ['-e, --error', 'off', 'Print the full error with a stack trace.'],
]

const mapping: [string, string][] = [
  ['.button', 'RD_THEME_BUTTON__ROOT'],
  ['.button_primary', 'RD_THEME_BUTTON__PRIMARY'],
  ['.button_square-left', 'RD_THEME_BUTTON__SQUARE_LEFT'],
  ['all .button rules', 'RD_THEME_BUTTON'],
  ['global rules', 'RD_THEME__ROOT'],
  ['class prefix', 'RD_THEME__PREFIX'],
]

export default function ThemePage () {
  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Theme CLI'
          subtitle='Compile theme.scss into component-scoped CSS chunks and env variables.'
          link
        />
        <p className={styles.lead}>
          <Code>rundom-react-theme</Code> is the bridge between the SCSS theme and the React
          components. It is the same idea as <Code>buildEnv.ts</Code> in Rundom UI, packaged as a
          standalone binary.
        </p>

        <Title h={2} title='Usage' link />
        <Highlight
          lang='shell'
          title='Terminal'
          code={`# generate .env.theme from theme.scss
npx rundom-react-theme

# custom source and destination
npx rundom-react-theme -i src/theme.scss -o .env.theme

# readable CSS for debugging
npx rundom-react-theme --no-minify`}
        />
        <p>
          The command prints a short report after writing the file:
        </p>
        <Highlight
          lang='shell'
          title='Output'
          code={`Starting env from scss
Found components: 22
Found global nodes: 25
Found keyframes: 9 (component-scoped: 9)
Found component view-transition nodes: 12
✅ Successfully updated .env.theme (Updated: 0, Added: 0, Removed: 0)`}
        />

        <Title h={2} title='Options' link />
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {options.map(([option, fallback, description]) => (
              <tr key={option}>
                <td><Code>{option}</Code></td>
                <td><Code>{fallback}</Code></td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Title h={2} title='What gets generated' link />
        <p>
          Every SCSS class is prefixed and recorded in the env file. The first underscore in a class
          separates the component from the element, and the element is uppercased:
        </p>
        <table>
          <thead>
            <tr>
              <th>SCSS selector</th>
              <th>Environment key</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map(([selector, key]) => (
              <tr key={key}>
                <td><Code>{selector}</Code></td>
                <td><Code>{key}</Code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          The env file also contains one chunk per component. For example{' '}
          <Code>RD_THEME_BUTTON</Code> holds all minified <Code>.rd_button*</Code> rules.
          Components inject that chunk on first render through <Code>addUiCSS</Code>.
        </p>

        <Title h={2} title='Environment setup' link />
        <p>
          Point your environment loader at the generated file. The project uses{' '}
          <Code>__ENV_EXTENDS</Code>, which is supported by innetjs and the docs setup:
        </p>
        <Highlight
          lang='shell'
          title='.env'
          code={`INNETJS_ENV_PREFIX=RD_
RD_THEME__PREFIX=rd_
__ENV_EXTENDS=.env.theme`}
        />
        <p>
          Keys starting with <Code>RD_THEME_</Code> are re-read from{' '}
          <Code>import.meta.env</Code> by the components. No runtime configuration or provider is
          needed.
        </p>

        <Title h={2} title='Theme authoring notes' link />
        <ul>
          <li>
            Keep component classes in the <Code>.component_element</Code> form. Classes without an
            underscore become <Code>__ROOT</Code>.
          </li>
          <li>
            Keyframes and view transitions that are only used inside one component are bundled with
            that component and renamed with a content hash.
          </li>
          <li>
            Global selectors, <Code>@font-face</Code>, <Code>@property</Code> and{' '}
            <Code>@layer</Code> rules go to <Code>RD_THEME__ROOT</Code>.
          </li>
          <li>
            Stale <Code>RD_THEME_*</Code> keys are removed on the next run, so the env file always
            matches the current theme.
          </li>
        </ul>

        <Flex gap={12} wrap>
          <Button color='accent' element='a' href='/quick-start'>Quick Start</Button>
          <Button view='bordered' element='a' href='/ui/layout'>Components</Button>
        </Flex>
      </Typography>
    </Page>
  )
}
