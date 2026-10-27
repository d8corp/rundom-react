import { useState } from 'react'

import { Example } from '../components/Example'
import { Page, Title } from '../ui'

import { message } from '../../helpers'
import {
  Box,
  Button,
  CloseIcon,
  Code,
  Flex,
  Message,
  Spin,
  Typography,
  Window,
  WindowContent,
  WindowHeader,
} from '../../ui'
import styles from './DocPage.module.scss'

export default function FeedbackPage () {
  const [open, setOpen] = useState(true)

  const showMessage = (type: 'success' | 'error' | 'warning' | 'info') => {
    const text = {
      success: 'Saved successfully',
      error: 'Something went wrong',
      warning: 'Connection is unstable',
      info: 'Copied to clipboard',
    }[type]

    message(text, { type })
  }

  return (
    <Page padding={[40, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Feedback'
          subtitle='Spinners, toasts and windows for status and overlays.'
          link
        />
        <p className={styles.lead}>
          Feedback components are built from the same primitives as the rest of the library.
          Toasts are rendered imperatively and cleaned up automatically.
        </p>

        <Title h={2} title='Spin' link />
        <p>
          <Code>Spin</Code> is an animated SVG built from theme dots. The dot count can be a
          prop or a theme variable.
        </p>
        <Example
          title='Spin'
          description='Size accepts a number (pixels) or a CSS length. Count changes the number of dots.'
          code={`<Spin />
<Spin count={3} />
<Spin count={8} size={32} />
<Button loading>Loading</Button>`}
        >
          <Flex gap={24} wrap align='center'>
            <Spin />
            <Spin count={3} size={24} />
            <Spin count={8} size={32} />
            <Spin count={12} size={40} />
            <Button loading>Loading</Button>
          </Flex>
        </Example>

        <Title h={2} title='Message' link />
        <p>
          <Code>Message</Code> renders a toast surface. Prefer the imperative{' '}
          <Code>message()</Code> helper, which mounts toasts into a shared container and removes
          it when the last toast disappears.
        </p>
        <Example
          title='Toasts'
          description='A toast disappears after `timeout` seconds; hovering pauses the timer.'
          code={`import { message } from 'rundom-react'

message('Saved successfully', { type: 'success' })
message('Something went wrong', { type: 'error', timeout: 5 })
message('Copied', { type: 'info' })`}
        >
          <Flex gap={8} wrap>
            <Button color='success' onClick={() => showMessage('success')}>Success</Button>
            <Button color='danger' onClick={() => showMessage('error')}>Error</Button>
            <Button color='warning' onClick={() => showMessage('warning')}>Warning</Button>
            <Button color='secondary' onClick={() => showMessage('info')}>Info</Button>
          </Flex>
        </Example>
        <Example
          title='Message component'
          description='The component itself can be rendered anywhere, for example in a notification list.'
          code={`<Message type='success'>Saved</Message>
<Message type='info'>Heads up</Message>
<Message type='warning'>Check your input</Message>
<Message type='error'>Request failed</Message>`}
        >
          <Flex vertical gap={8} style={{ width: '100%', maxWidth: '420px' }}>
            <Message type='success'>Saved</Message>
            <Message type='info'>Heads up</Message>
            <Message type='warning'>Check your input</Message>
            <Message type='error'>Request failed</Message>
          </Flex>
        </Example>

        <Title h={2} title='Window' link />
        <p>
          <Code>Window</Code>, <Code>WindowHeader</Code> and <Code>WindowContent</Code> compose a
          bordered surface with a header. Use <Code>onClose</Code> on the header to add a close
          button.
        </p>
        <Example
          title='Window'
          description='The header can contain any nodes: traffic lights, titles and actions.'
          code={`<Window className={styles.windowDemo}>
  <WindowHeader onClose={() => setOpen(false)}>
    <Box color='danger' circle size='xs' />
    <Box color='warning' circle size='xs' />
    <Box color='success' circle size='xs' />
    <span>Preview</span>
  </WindowHeader>
  <WindowContent>Window content</WindowContent>
</Window>`}
        >
          <Flex vertical gap={12} style={{ width: '100%' }}>
            {open ? (
              <Window className={styles.windowDemo}>
                <WindowHeader onClose={() => setOpen(false)}>
                  <Box color='danger' circle size='xs' />
                  <Box color='warning' circle size='xs' />
                  <Box color='success' circle size='xs' />
                  <span>Preview</span>
                </WindowHeader>
                <WindowContent className={styles.windowBody}>
                  Window content can hold forms, previews or any other components.
                </WindowContent>
              </Window>
            ) : (
              <Button view='bordered' onClick={() => setOpen(true)}>
                Open window
              </Button>
            )}
            <Flex gap={16} align='center'>
              <Code>Window</Code>
              <Code>WindowHeader</Code>
              <Code>WindowContent</Code>
              <CloseIcon />
            </Flex>
          </Flex>
        </Example>

        <p>
          The imperative helper returns a destroy function, which is useful when a toast must be
          closed programmatically:
        </p>
        <Example
          title='Manual dismiss'
          code={`const destroy = message('Uploading…', { type: 'info', timeout: 0 })

// later
destroy()`}
        >
          <Button
            view='bordered'
            onClick={() => {
              const destroy = message('Uploading…', { type: 'info', timeout: 0 })

              setTimeout(destroy, 1500)
            }}
          >
            Show for 1.5s
          </Button>
        </Example>
      </Typography>
    </Page>
  )
}
