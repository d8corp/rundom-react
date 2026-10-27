import { Example } from '../components/Example'
import { Page, Title } from '../ui'

import { Card, Code, Flex, Link, Markdown, Text, Typography } from '../../ui'
import styles from './DocPage.module.scss'

const markdown = `# Markdown

**Markdown** is parsed with \`@textlint/markdown-to-ast\` and rendered through
a replaceable component map.

## Features

- headings
- lists
- **strong** and *emphasis*
- \`inline code\` and links

> Block quotes are rendered as regular blockquotes,
> so the application decides how they look.

| Syntax | Result |
| --- | --- |
| \`**text**\` | **text** |
| \`*text*\` | *text* |

\`\`\`ts
const answer = 42
\`\`\`
`

export default function TypographyPage () {
  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Typography'
          subtitle='Typography, Text, Link and Markdown for readable content.'
          link
        />
        <p className={styles.lead}>
          Typography components keep semantic HTML and expose design tokens as props. Global
          element styles come from <Code>theme.scss</Code>, so the same components work with any
          content theme.
        </p>

        <Title h={2} title='Typography' link />
        <p>
          <Code>Typography</Code> renders an <Code>article</Code> and passes through standard
          attributes. Use it as the root of prose content.
        </p>
        <Example
          title='Typography'
          description='`flex` turns the article into a flex item when it is used inside a layout.'
          code={`<Typography flex>
  <h3>Article heading</h3>
  <p>Paragraphs, lists and quotes inherit typography styles.</p>
</Typography>`}
        >
          <Card size='l' width='100%'>
            <Typography flex>
              <h3>Article heading</h3>
              <p>Paragraphs, lists and quotes inherit typography styles.</p>
            </Typography>
          </Card>
        </Example>

        <Title h={2} title='Text' link />
        <p>
          <Code>Text</Code> renders a <Code>span</Code> with helpers for weight, size, color,
          decoration, italic and nowrap.
        </p>
        <Example
          title='Text variants'
          description='Colors accept any CSS color, including theme variables.'
          code={`<Text weight='bold'>Bold</Text>
<Text italic>Italic</Text>
<Text decoration='underline'>Underlined</Text>
<Text color='var(--rd__accent_background)'>Accent color</Text>
<Text size={24} weight='900'>24px / 900</Text>`}
        >
          <Flex vertical gap={8}>
            <Text weight='bold'>Bold</Text>
            <Text italic>Italic</Text>
            <Text decoration='underline'>Underlined</Text>
            <Text color='var(--rd__accent_background)'>Accent color</Text>
            <Text size={24} weight='900'>24px / 900</Text>
            <Text nowrap>This line should never wrap, no matter how narrow the container becomes.</Text>
          </Flex>
        </Example>

        <Title h={2} title='Link' link />
        <p>
          <Code>Link</Code> adds theme colors and an active/disabled state. External links receive{' '}
          <Code>target=&quot;_blank&quot;</Code> and <Code>rel=&quot;noreferrer&quot;</Code> by default.
        </p>
        <Example
          title='Links'
          code={`<Link href='#link'>Regular link</Link>
<Link href='#' active>Active link</Link>
<Link href='#' disabled>Disabled link</Link>
<Link href='https://github.com/d8corp/rundom-react'>External link</Link>`}
        >
          <Flex gap={16} wrap align='center'>
            <Link href='#link'>Regular link</Link>
            <Link href='#' active>Active link</Link>
            <Link href='#' disabled>Disabled link</Link>
            <Link href='https://github.com/d8corp/rundom-react'>External link</Link>
          </Flex>
        </Example>

        <Title h={2} title='Markdown' link />
        <p>
          <Code>Markdown</Code> accepts a markdown string and an optional map of renderers. The
          default map covers documents, paragraphs, headings, lists, links, code, quotes, images
          and tables.
        </p>
        <Example
          title='Markdown'
          description='The demo below is rendered from a single markdown string.'
          code={`<Markdown text={markdown} />`}
        >
          <Card size='l' width='100%'>
            <Markdown text={markdown} />
          </Card>
        </Example>
        <p>
          Use <Code>MarkdownMap</Code> to replace any node renderer. Each renderer receives the
          parsed node children and a render function for nested content.
        </p>
      </Typography>
    </Page>
  )
}
