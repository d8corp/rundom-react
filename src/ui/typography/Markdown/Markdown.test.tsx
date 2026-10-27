import { render, screen } from '@testing-library/react'

import { Markdown } from './Markdown'

const text = `# Title

A paragraph with **strong**, *emphasis*, ~~deleted~~ and \`code\`.

## List

- one
- two

[Example](https://example.com)

> quoted

| Name | Value |
| --- | --- |
| a | 1 |

\`\`\`ts
const answer = 42
\`\`\`
`

describe('Markdown', () => {
  it('renders nothing without text', () => {
    const { container } = render(<Markdown />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders headings, paragraphs and inline formatting', () => {
    render(<Markdown text={text} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'List' })).toBeInTheDocument()
    expect(screen.getByText('strong').tagName).toBe('STRONG')
    expect(screen.getByText('emphasis').tagName).toBe('EM')
    expect(screen.getByText('deleted').tagName).toBe('S')
    expect(screen.getByText('code').tagName).toBe('CODE')
  })

  it('renders lists, links, quotes and tables', () => {
    render(<Markdown text={text} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute('href', 'https://example.com')
    expect(screen.getByText('quoted').closest('blockquote')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(screen.getAllByRole('cell')).toHaveLength(2)
  })

  it('renders code blocks', () => {
    const { container } = render(<Markdown text={text} />)

    expect(container.querySelector('pre > code.language-ts')).toHaveTextContent('const answer = 42')
  })

  it('supports a custom renderer map', () => {
    render(
      <Markdown
        text='Hello'
        map={{
          Str: ({ value }) => <mark>{value}</mark>,
        }}
      />,
    )

    expect(screen.getByText('Hello').tagName).toBe('MARK')
  })
})
