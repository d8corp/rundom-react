import { useCallback, useState } from 'react'

import { Example } from '../components/Example'
import { Page, Title } from '../ui'

import { Box, Card, Code, Flex, Scrollbar, Typography } from '../../ui'
import styles from './DocPage.module.scss'

const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'disabled'] as const
const views = ['filled', 'bordered', 'dashed', 'ghost'] as const
const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const

export default function LayoutPage () {
  const [clicks, setClicks] = useState(0)
  const handleCardClick = useCallback(() => setClicks(value => value + 1), [])

  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Layout'
          subtitle='Flex, Box, Card and Scrollbar form the layout vocabulary.'
          link
        />
        <p className={styles.lead}>
          Layout primitives accept standard HTML props for their element, plus a small set of
          layout shortcuts. <Code>class</Code> and <Code>className</Code> are merged together.
        </p>

        <Title h={2} title='Flex' link />
        <p>
          <Code>Flex</Code> renders any element with flexbox enabled. Use{' '}
          <Code>vertical</Code>, <Code>gap</Code>, <Code>padding</Code>, <Code>align</Code>,{' '}
          <Code>justify</Code>, <Code>reverse</Code>, <Code>wrap</Code> and <Code>flex</Code>.
        </p>
        <Example
          title='Flex'
          description={'Gap and padding accept numbers in pixels or tuples, like `[16, 32]`.'}
          code={`<Flex gap={12} wrap>
  <Flex vertical gap={8} padding={12} style={{ border: '1px dashed #999' }}>
    <div>column 1</div>
    <div>column 2</div>
  </Flex>
  <Flex flex justify='space-between' align='center' gap={8} style={{ border: '1px dashed #999', padding: 12 }}>
    <div>flex: 1</div>
    <div>space-between</div>
  </Flex>
</Flex>`}
        >
          <Flex gap={12} wrap style={{ width: '100%' }}>
            <Flex vertical gap={8} padding={12} style={{ border: '1px dashed #999' }}>
              <div>column 1</div>
              <div>column 2</div>
            </Flex>
            <Flex flex justify='space-between' align='center' gap={8} style={{ border: '1px dashed #999', padding: 12, minWidth: '200px' }}>
              <div>flex: 1</div>
              <div>space-between</div>
            </Flex>
          </Flex>
        </Example>
        <Example
          title='Nested layout'
          description='`element` changes the rendered tag while keeping the same props.'
          code={`<Flex element='nav' align='center' gap={8}>
  <Box size='s'>nav</Box>
  <Box size='s'>items</Box>
  <Box size='s'>here</Box>
</Flex>`}
        >
          <Flex element='nav' align='center' gap={8}>
            <Box size='s'>nav</Box>
            <Box size='s'>items</Box>
            <Box size='s'>here</Box>
          </Flex>
        </Example>

        <Title h={2} title='Box' link />
        <p>
          <Code>Box</Code> extends <Code>Flex</Code> with color, view, size, square and circle
          modifiers. Every combination maps to a CSS class from the theme.
        </p>
        <Example
          title='Views and colors'
          description='Views: `filled`, `bordered`, `dashed`, `ghost`. Colors use the shared token palette.'
          code={`{colors.map(color => (
  <Box color={color} view='filled' interact='clickable'>{color}</Box>
))}`}
        >
          <Flex vertical gap={8} style={{ width: '100%' }}>
            {views.map(view => (
              <Flex key={view} gap={8} wrap align='center'>
                <Code style={{ width: '72px' }}>{view}</Code>
                {colors.map(color => (
                  <Box key={color} color={color} view={view} interact='clickable'>
                    {color}
                  </Box>
                ))}
              </Flex>
            ))}
          </Flex>
        </Example>
        <Example
          title='Sizes, square and circle'
          description='Size tokens are shared by most components.'
          code={`<Box square size='m'>1</Box>
<Box circle square size='m'>2</Box>`}
        >
          <Flex gap={12} wrap align='center'>
            {sizes.map(size => (
              <Box key={size} square size={size}>{size.length}</Box>
            ))}
            <Box circle square size='m'>c</Box>
            <Box circle square size='l' color='accent'>c</Box>
          </Flex>
        </Example>

        <Title h={2} title='Card' link />
        <p>
          <Code>Card</Code> is a surface with theme padding. Pass <Code>onClick</Code> to get a
          clickable state automatically, or set <Code>clickable</Code> manually.
        </p>
        <Example
          title='Card'
          description='Cards accept width and height as numbers (pixels) or strings.'
          code={`<Card vertical size='l' width={320} gap={8} onClick={handleClick}>
  <strong>Clickable card</strong>
  <span>Clicked {clicks} times</span>
</Card>`}
        >
          <Flex gap={16} wrap>
            <Card vertical size='l' width={280} gap={8} onClick={handleCardClick}>
              <strong>Clickable card</strong>
              <span>Clicked {clicks} times</span>
            </Card>
            <Card vertical size='l' width={280} gap={8}>
              <strong>Static card</strong>
              <span>No click handler</span>
            </Card>
          </Flex>
        </Example>

        <Title h={2} title='Scrollbar' link />
        <p>
          <Code>Scrollbar</Code> is a thin wrapper around <Code>Flex</Code> with themed scrollbars,
          optional stable gutter and a size.
        </p>
        <Example
          title='Scrollbar'
          description='Use `overflow` to override the scroll direction or disable scrolling.'
          code={`<Scrollbar vertical gap={8} padding={12} className={styles.scrollDemo}>
  {Array.from({ length: 12 }, (_, index) => (
    <div key={index}>Row {index + 1}</div>
  ))}
</Scrollbar>`}
        >
          <Scrollbar vertical gap={8} padding={12} className={styles.scrollDemo}>
            {Array.from({ length: 12 }, (_, index) => (
              <div className={styles.scrollLine} key={index}>Row {index + 1}</div>
            ))}
          </Scrollbar>
        </Example>
      </Typography>
    </Page>
  )
}
