import type { ComponentType } from 'react'

import { Example } from '../components/Example'
import { Page, Title } from '../ui'

import type { BaseIconProps } from '../../ui'
import {
  AsideIcon,
  Box,
  BurgerIcon,
  CheckIcon,
  CloseIcon,
  Code,
  CopyIcon,
  Divider,
  Flex,
  HtmlIcon,
  JsonIcon,
  LinkIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SideIcon,
  SuccessIcon,
  SunIcon,
  TerminalIcon,
  TypeScriptIcon,
  Typography,
} from '../../ui'
import styles from './DocPage.module.scss'

const icons: [string, ComponentType<BaseIconProps>][] = [
  ['AsideIcon', AsideIcon],
  ['BurgerIcon', BurgerIcon],
  ['CheckIcon', CheckIcon],
  ['CloseIcon', CloseIcon],
  ['CopyIcon', CopyIcon],
  ['HtmlIcon', HtmlIcon],
  ['JsonIcon', JsonIcon],
  ['LinkIcon', LinkIcon],
  ['MonitorIcon', MonitorIcon],
  ['MoonIcon', MoonIcon],
  ['SearchIcon', SearchIcon],
  ['SideIcon', SideIcon],
  ['SuccessIcon', SuccessIcon],
  ['SunIcon', SunIcon],
  ['TerminalIcon', TerminalIcon],
  ['TypeScriptIcon', TypeScriptIcon],
]

export default function ContentPage () {
  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Content'
          subtitle='Inline code, dividers and the built-in icon set.'
          link
        />
        <p className={styles.lead}>
          Content components are intentionally small. They only read theme tokens and do not
          introduce their own state.
        </p>

        <Title h={2} title='Code' link />
        <p>
          <Code>Code</Code> renders a bordered <Code>code</Code> element. Use it for inline
          commands, identifiers and short snippets.
        </p>
        <Example
          title='Code'
          description='The component accepts every `Box` prop, including color and size.'
          code={`<Code>npm install rundom-react</Code>
<Code color='accent'>RD_THEME_BUTTON</Code>
<Code color='success'>addUiCSS</Code>`}
        >
          <Flex gap={8} wrap align='center'>
            <Code>npm install rundom-react</Code>
            <Code color='accent'>RD_THEME_BUTTON</Code>
            <Code color='success'>addUiCSS</Code>
          </Flex>
        </Example>

        <Title h={2} title='Divider' link />
        <p>
          <Code>Divider</Code> renders an <Code>hr</Code> with size, vertical and flush modifiers.
        </p>
        <Example
          title='Divider'
          description='Use `vertical` inside a flex row and `flush` to remove spacing.'
          code={`<Divider />
<Divider size='s' />
<Divider flush />
<Flex gap={16} align='center'>
  <span>left</span>
  <Divider vertical />
  <span>right</span>
</Flex>`}
        >
          <Flex vertical gap={16} style={{ width: '100%' }}>
            <Divider />
            <Divider size='s' />
            <Divider flush />
            <div className={styles.dividerDemo}>
              <span>left</span>
              <Divider vertical />
              <span>right</span>
            </div>
          </Flex>
        </Example>

        <Title h={2} title='Icons' link />
        <p>
          Icons are plain SVG components. They inherit <Code>currentColor</Code>, accept{' '}
          <Code>size</Code> as a number or CSS length and support all SVG attributes.
        </p>
        <Example
          title='Icon set'
          description='Import only the icons you need; each one is a tree-shakeable component.'
          code={`import { SearchIcon, CheckIcon } from 'rundom-react'

<Flex gap={12} align='center'>
  <SearchIcon size={24} />
  <CheckIcon size={24} />
  <CloseIcon size={24} />
</Flex>`}
        >
          <div className={styles.grid}>
            {icons.map(([name, Icon]) => (
              <div className={styles.iconCell} key={name}>
                <Icon className={styles.icon} size={24} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </Example>
        <p>
          Wrap an icon in <Code>Box</Code> to build an icon button:
        </p>
        <Example
          title='Icon button'
          code={`<Box circle interact='clickable' color='accent' size='l'>
  <SearchIcon />
</Box>`}
        >
          <Flex gap={12} align='center'>
            <Box circle interact='clickable' color='accent' size='l'><SearchIcon /></Box>
            <Box circle interact='clickable' view='bordered' size='l'><CopyIcon /></Box>
            <Box square interact='clickable' view='ghost' size='l'><CloseIcon /></Box>
          </Flex>
        </Example>
      </Typography>
    </Page>
  )
}
