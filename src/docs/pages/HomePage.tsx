import { Example } from '../components/Example'
import { Page, Title } from '../ui'
import { Highlight } from '../ui/Highlight'

import {
  Box,
  Button,
  Card,
  CheckBox,
  Code,
  Flex,
  Input,
  RadioBox,
  Text,
  Typography,
} from '../../ui'
import styles from './HomePage.module.scss'

const version = '0.0.1'

export default function HomePage () {
  return (
    <Page>
      <Flex padding={[40, 24]} align='center' justify='center' vertical className={styles.banner}>
        <div className={styles.content}>
          <div data-glow className={styles.version}>
            <Box circle size='xxs' color='success' />
            v{version} is now available
          </div>
          <Typography>
            <Title title='Rundom React' link>
              Welcome to Rundom&nbsp;React
            </Title>
            <p className={styles.description}>
              A theme-aware React UI library that brings Rundom&nbsp;UI components,
              tokens, and documentation experience to React.
            </p>
          </Typography>
          <div className={styles.buttons}>
            <Button color='accent' view='filled' size='l' element='a' href='/quick-start' style={{ width: '182px' }}>
              Get Started
            </Button>
            <Button data-glow view='bordered' size='l' element='a' href='/ui/layout'>
              Explore Components
            </Button>
          </div>
        </div>
      </Flex>

      <Flex vertical gap={64} padding={[80, 24]} align='center'>
        <Flex wrap gap={24} justify='center' className={styles.features}>
          <Card vertical size='l' width={320} gap={8}>
            <h3 className={styles.featureTitle}>React-first API</h3>
            <p className={styles.featureText}>
              Plain function components with standard React props, controlled inputs,
              and no custom runtime.
            </p>
          </Card>
          <Card vertical size='l' width={320} gap={8}>
            <h3 className={styles.featureTitle}>Theme-aware</h3>
            <p className={styles.featureText}>
              One SCSS theme compiles into tiny CSS chunks that components inject on demand.
            </p>
          </Card>
          <Card vertical size='l' width={320} gap={8}>
            <h3 className={styles.featureTitle}>Familiar layout</h3>
            <p className={styles.featureText}>
              Flex, Box, fields, dialogs, messages and icons — the same vocabulary as Rundom UI.
            </p>
          </Card>
        </Flex>

        <Flex vertical gap={32} className={styles.section}>
          <Title h={2} title='Install and use' link />
          <Highlight
            lang='shell'
            title='Terminal'
            code={'npm install rundom-react react react-dom'}
          />
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
        </Flex>

        <Example
          description={'A small live sample: buttons, a controlled-free input, check boxes and radios all use the same theme tokens.'}
          title='Live components'
          code={`<Flex vertical gap={12}>
  <Flex gap={8} wrap>
    <Button>Default</Button>
    <Button color='accent'>Accent</Button>
    <Button view='bordered' color='success'>Success</Button>
  </Flex>
  <Input placeholder='Type something…' clearable />
  <Flex gap={16}>
    <CheckBox defaultChecked />
    <RadioBox name='home-demo' defaultChecked />
    <RadioBox name='home-demo' />
  </Flex>
</Flex>`}
        >
          <Flex vertical gap={12}>
            <Flex gap={8} wrap>
              <Button>Default</Button>
              <Button color='accent'>Accent</Button>
              <Button view='bordered' color='success'>Success</Button>
            </Flex>
            <Input placeholder='Type something…' clearable />
            <Flex gap={16}>
              <CheckBox defaultChecked />
              <RadioBox name='home-demo' defaultChecked />
              <RadioBox name='home-demo' />
            </Flex>
          </Flex>
        </Example>

        <Flex vertical gap={24} align='center' className={styles.cta}>
          <Title h={2} title='Ready to build?' link />
          <Text color='var(--rd__root_color-muted)'>
            Read the quick start, generate your own theme, or browse the components.
          </Text>
          <Flex gap={12} wrap justify='center'>
            <Button color='accent' element='a' href='/quick-start'>Quick Start</Button>
            <Button view='bordered' element='a' href='/theme'>
              <Code>rundom-react-theme</Code>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  )
}
