import { parse } from '@textlint/markdown-to-ast'
import type { ReactNode } from 'react'
import { createElement, Fragment } from 'react'

import { Link } from '../../primitive'

export type MarkdownRender = (node: any, render: MarkdownRender) => ReactNode

export type MarkdownMap = Partial<Record<string, MarkdownRender>>

const renderChildren = (children: any[] | undefined, render: MarkdownRender): ReactNode[] | undefined =>
  children?.map((child, index) => <Fragment key={index}>{render(child, render)}</Fragment>)

const alignStyle = (align: string | undefined) => align ? { textAlign: align as any } : undefined

export const markdownMap: MarkdownMap = {
  Document: ({ children }, render) => renderChildren(children, render),
  Paragraph: ({ children }, render) => createElement('p', null, renderChildren(children, render)),
  Str: ({ value }) => value,
  Link: ({ url, children }, render) => <Link href={url}>{renderChildren(children, render)}</Link>,
  List: ({ children, ordered }, render) => createElement(ordered ? 'ol' : 'ul', null, renderChildren(children, render)),
  ListItem: ({ children }, render) => createElement('li', null, renderChildren(children, render)),
  Header: ({ children, depth }, render) => createElement(`h${depth}`, null, renderChildren(children, render)),
  HorizontalRule: () => createElement('hr'),
  Strong: ({ children }, render) => createElement('strong', null, renderChildren(children, render)),
  Emphasis: ({ children }, render) => createElement('em', null, renderChildren(children, render)),
  Delete: ({ children }, render) => createElement('s', null, renderChildren(children, render)),
  BlockQuote: ({ children }, render) => createElement('blockquote', null, renderChildren(children, render)),
  Code: ({ value }) => createElement('code', null, value),
  CodeBlock: ({ value, lang }) => (
    <pre>
      <code className={lang ? `language-${lang}` : undefined}>{value}</code>
    </pre>
  ),
  Image: ({ alt, url }) => createElement('img', { alt, src: url }),
  Break: () => createElement('br'),
  Table: ({ children, align }, render) => {
    const [header, ...rows] = children ?? []

    return (
      <table>
        {header && (
          <thead>
            <tr>
              {header.children?.map((cell: any, index: number) => (
                <th key={index} style={alignStyle(align?.[index])}>
                  {renderChildren(cell.children, render)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows?.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.children?.map((cell: any, cellIndex: number) => (
                <td key={cellIndex} style={alignStyle(align?.[cellIndex])}>
                  {renderChildren(cell.children, render)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
}

export interface MarkdownProps {
  text?: string
  map?: MarkdownMap
}

export function Markdown ({ text, map }: MarkdownProps) {
  if (!text) return null

  const currentMap: MarkdownMap = {
    ...markdownMap,
    ...map,
  }

  const render: MarkdownRender = (node) => currentMap[node.type]?.(node, render)

  return <>{render(parse(text), render)}</>
}
