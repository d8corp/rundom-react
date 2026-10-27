import { Example } from '../components/Example'
import { Highlight, Page, Title } from '../ui'

import { Button, Code, Flex, Input, Typography } from '../../ui'
import styles from './DocPage.module.scss'

export default function QuickStartPage () {
  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Quick Start'
          subtitle='Install Rundom React, render your first component and connect the theme.'
          link
        />
        <p className={styles.lead}>
          Rundom React is a set of theme-aware React components. It does not ship a runtime:
          every component is a regular function component with standard React props.
        </p>

        <Title h={2} title='Installation' link />
        <p>
          Install the package together with React. React 18 and newer are supported.
        </p>
        <Highlight lang='shell' title='Terminal' code='npm install rundom-react react react-dom' />

        <Title h={2} title='First component' link />
        <p>
          Import components from the package root. The <Code>class</Code> prop is supported
          in addition to <Code>className</Code> and accepts strings, arrays and objects.
        </p>
        <Highlight
          lang='tsx'
          title='src/App.tsx'
          code={`import { Button, Flex, Input } from 'rundom-react'

export function App () {
  return (
    <Flex vertical gap={12} padding={24}>
      <Input placeholder='What are we building?' clearable />
      <Button color='accent'>Create</Button>
    </Flex>
  )
}`}
        />
        <Example
          title='The same components, live'
          description='Components pick up the CSS variables from the generated theme. No provider is required.'
          code={`<Flex vertical gap={12}>
  <Input placeholder='What are we building?' clearable />
  <Flex gap={8}>
    <Button>Default</Button>
    <Button color='accent'>Accent</Button>
  </Flex>
</Flex>`}
        >
          <Flex vertical gap={12} style={{ width: '100%', maxWidth: '360px' }}>
            <Input placeholder='What are we building?' clearable />
            <Flex gap={8}>
              <Button>Default</Button>
              <Button color='accent'>Accent</Button>
            </Flex>
          </Flex>
        </Example>

        <Title h={2} title='Connect the theme' link />
        <p>
          The library reads styles from environment variables. Generate them from the SCSS theme
          with the bundled CLI, then let your bundler expose the generated file as{' '}
          <Code>import.meta.env</Code>.
        </p>
        <Highlight
          lang='shell'
          title='Terminal'
          code={`npx rundom-react-theme -i theme.scss -o .env.theme`}
        />
        <p>
          The command compiles the SCSS, splits it into one CSS chunk per component and writes
          a <Code>.env.theme</Code> file. Extend your environment with it:
        </p>
        <Highlight
          lang='shell'
          title='.env'
          code={`INNETJS_ENV_PREFIX=RD_
RD_THEME__PREFIX=rd_
__ENV_EXTENDS=.env.theme`}
        />
        <p>
          With innetjs and Vite the variables are available as <Code>import.meta.env.RD_THEME_*</Code>.
          Each component injects its own chunk into the document the first time it renders, so unused
          component styles never reach the page.
        </p>

        <Title h={2} title='Theme documentation' link />
        <p>
          Read the <a href='/theme'>Theme CLI</a> page for every command-line option, the generated
          variable format and the mapping rules between SCSS selectors and environment keys.
        </p>
        <Flex gap={12} wrap>
          <Button color='accent' element='a' href='/theme'>Theme CLI</Button>
          <Button view='bordered' element='a' href='/ui/layout'>Browse components</Button>
        </Flex>
      </Typography>
    </Page>
  )
}
