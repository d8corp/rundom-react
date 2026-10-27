import { useState } from 'react'

import { Example } from '../components/Example'
import { Page, Title } from '../ui'

import {
  Box,
  Button,
  CheckBox,
  CloseIcon,
  Code,
  Field,
  Flex,
  Input,
  RadioBox,
  SearchIcon,
  Typography,
} from '../../ui'
import styles from './DocPage.module.scss'

export default function FormsPage () {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [checked, setChecked] = useState<boolean | null>(null)
  const [plan, setPlan] = useState('pro')
  const [saved, setSaved] = useState('')

  const save = async () => {
    setSaved('')

    await new Promise(resolve => setTimeout(resolve, 1200))
    setSaved('Saved')
  }

  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Forms'
          subtitle='Buttons, inputs, fields, check boxes and radio buttons.'
          link
        />
        <p className={styles.lead}>
          Form components support controlled and uncontrolled usage. Value callbacks receive
          plain values instead of events, so they compose easily with React state.
        </p>

        <Title h={2} title='Button' link />
        <p>
          <Code>Button</Code> supports colors, views and three sizes. If <Code>onClick</Code>{' '}
          returns a promise, the button shows a spinner until the promise settles. Pass{' '}
          <Code>element=&quot;a&quot;</Code> and <Code>href</Code> to render a link.
        </p>
        <Example
          title='Button'
          description='Views: `filled`, `bordered`, `dashed`, `ghost`. Sizes: `s`, `m`, `l`.'
          code={`<Button color='accent'>Accent</Button>
<Button view='bordered' color='success'>Success</Button>
<Button view='dashed'>Dashed</Button>
<Button view='ghost'>Ghost</Button>
<Button disabled>Disabled</Button>`}
        >
          <Flex gap={8} wrap align='center'>
            <Button>Default</Button>
            <Button color='accent'>Accent</Button>
            <Button view='bordered' color='success'>Success</Button>
            <Button view='dashed'>Dashed</Button>
            <Button view='ghost'>Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button square circle aria-label='Search'><SearchIcon /></Button>
          </Flex>
        </Example>
        <Example
          title='Async loading'
          description='Return a promise from `onClick`; the button manages its own loading state.'
          code={`<Button color='accent' onClick={async () => {
  await new Promise(resolve => setTimeout(resolve, 1200))
}}>
  Save
</Button>`}
        >
          <Flex gap={12} align='center'>
            <Button color='accent' onClick={save}>Save</Button>
            <Button onClick={save}>Save (default)</Button>
            <Button loading>Loading</Button>
            {saved && <span>{saved}</span>}
          </Flex>
        </Example>
        <Example
          title='Link button'
          description='The same visual style for navigation.'
          code={`<Button element='a' href='/quick-start' color='accent'>Quick Start</Button>`}
        >
          <Button element='a' href='/quick-start' color='accent'>Quick Start</Button>
        </Example>

        <Title h={2} title='Input' link />
        <p>
          <Code>Input</Code> keeps its own state when <Code>value</Code> is omitted. Use{' '}
          <Code>clearable</Code> for a clear button and <Code>debounce</Code> to delay{' '}
          <Code>onChange</Code>.
        </p>
        <Example
          title='Input'
          description='`before` and `after` accept any nodes, including icons and buttons.'
          code={`<Input placeholder='Search' before={<SearchIcon />} clearable />
<Input value={query} onChange={setQuery} placeholder='Controlled' />
<Input size='s' placeholder='Small' />
<Input size='l' placeholder='Large' clearable />`}
        >
          <Flex vertical gap={12} style={{ width: '100%', maxWidth: '360px' }}>
            <Input placeholder='Search' before={<SearchIcon />} clearable />
            <Input value={query} onChange={setQuery} placeholder='Controlled' />
            <Flex gap={8} align='center'>
              <Input size='s' placeholder='Small' />
              <Input size='l' placeholder='Large' clearable />
            </Flex>
            <span>Value: {query || '—'}</span>
          </Flex>
        </Example>
        <Example
          title='Debounce'
          description='With `debounce`, onChange fires after the user stops typing.'
          code={`<Input debounce placeholder='Type…' onChange={setDebounced} />
<span>Debounced: {debounced}</span>`}
        >
          <Flex vertical gap={8} style={{ width: '100%', maxWidth: '360px' }}>
            <Input debounce placeholder='Type…' onChange={setDebounced} />
            <span>Debounced: {debounced || '—'}</span>
          </Flex>
        </Example>

        <Title h={2} title='Field' link />
        <p>
          <Code>Field</Code> is the visual shell shared by inputs. It accepts a label, prefix and
          suffix nodes. Inputs inherit these props.
        </p>
        <Example
          title='Field'
          description='Use the field classes with any custom control.'
          code={`<Input label='Search docs' before={<SearchIcon />} after={<CheckIcon />} />
<Input label='Price' after={<span>USD</span>} />`}
        >
          <Flex gap={16} wrap>
            <div className={styles.fieldDemo}>
              <Input label='Search docs' before={<SearchIcon />} clearable />
            </div>
            <div className={styles.fieldDemo}>
              <Input label='Price' after={<span>USD</span>} defaultValue='100' />
            </div>
            <div className={styles.fieldDemo}>
              <Field label='Custom' before={<Box circle size='xxs' color='success' />} after={<CloseIcon />}>
                <span>Plain control</span>
              </Field>
            </div>
          </Flex>
        </Example>

        <Title h={2} title='CheckBox' link />
        <p>
          <Code>CheckBox</Code> supports checked, unchecked and indeterminate states. Pass{' '}
          <Code>checked={'{null}'}</Code> for the indeterminate state.
        </p>
        <Example
          title='CheckBox'
          description='The label is the clickable area.'
          code={`<CheckBox defaultChecked />
<CheckBox checked={checked} onChange={setChecked} />
<CheckBox checked={null} />
<CheckBox disabled />`}
        >
          <Flex gap={16} wrap align='center'>
            <CheckBox defaultChecked />
            <CheckBox checked={checked} onChange={setChecked} />
            <CheckBox checked={null} />
            <CheckBox disabled defaultChecked />
            <CheckBox color='success' defaultChecked />
            <CheckBox color='accent' defaultChecked />
          </Flex>
        </Example>

        <Title h={2} title='RadioBox' link />
        <p>
          Group radio boxes with a shared <Code>name</Code>. Each box reports its own checked
          state, so a group can be controlled with a single value.
        </p>
        <Example
          title='RadioBox'
          description='One selected value for the whole group.'
          code={`<RadioBox name='plan' checked={plan === 'free'} onChange={() => setPlan('free')} />
<RadioBox name='plan' checked={plan === 'pro'} onChange={() => setPlan('pro')} />
<RadioBox name='plan' checked={plan === 'team'} onChange={() => setPlan('team')} />`}
        >
          <Flex gap={16} wrap align='center'>
            <RadioBox name='plan' checked={plan === 'free'} onChange={() => setPlan('free')} />
            <RadioBox name='plan' checked={plan === 'pro'} onChange={() => setPlan('pro')} />
            <RadioBox name='plan' checked={plan === 'team'} onChange={() => setPlan('team')} />
            <RadioBox name='plan-disabled' disabled />
            <span>Selected: <Code>{plan}</Code></span>
          </Flex>
        </Example>
      </Typography>
    </Page>
  )
}
