import type { MouseEvent } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import type { MessageProps } from '../../ui'
import { Message } from '../../ui'
import { addUiCSS, viewTransition } from '../../utils'

if (import.meta.env?.RD_THEME_MESSAGES) {
  addUiCSS(import.meta.env.RD_THEME_MESSAGES, 'messages')
}

interface MessageItem {
  id: number
  text: string
  props: MessageProps
  timeout: number
  remaining: number
  startedAt?: number
  timer?: ReturnType<typeof setTimeout>
}

let container: HTMLDivElement | null = null
let root: Root | null = null
let lastId = 0

const items = new Map<number, MessageItem>()

function render () {
  root?.render(
    <>
      {[...items.values()].map(item => (
        <Message
          {...item.props}
          key={item.id}
          type={item.props.type ?? 'info'}
          timeout={item.timeout}
          style={{
            ...item.props.style,
            ['--rd-message-timeout' as string]: `${item.timeout}s`,
          }}
          onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
            pause(item)
            item.props.onMouseEnter?.(event)
          }}
          onMouseLeave={(event: MouseEvent<HTMLDivElement>) => {
            resume(item)
            item.props.onMouseLeave?.(event)
          }}
          onClick={(event: MouseEvent<HTMLDivElement>) => {
            destroy(item.id)
            item.props.onClick?.(event)
          }}
        >
          {item.text}
        </Message>
      ))}
    </>,
  )
}

function ensureRoot () {
  if (root && container) return

  container = document.createElement('div')
  container.className = import.meta.env?.RD_THEME_MESSAGES__ROOT || 'rd_messages'
  document.body.appendChild(container)
  root = createRoot(container)
}

function schedule (item: MessageItem) {
  if (!item.timeout) return

  item.startedAt = Date.now()
  item.timer = setTimeout(() => destroy(item.id), item.remaining)
}

function pause (item: MessageItem) {
  if (!item.timer) return

  clearTimeout(item.timer)
  item.timer = undefined

  if (item.startedAt) {
    item.remaining -= Date.now() - item.startedAt
    item.startedAt = undefined
  }
}

function resume (item: MessageItem) {
  if (item.timer || !item.remaining || !items.has(item.id)) return

  schedule(item)
}

function destroy (id: number) {
  const item = items.get(id)

  if (!item) return

  clearTimeout(item.timer)
  items.delete(id)

  viewTransition(render)

  if (!items.size) {
    root?.unmount()
    container?.remove()
    root = null
    container = null
  }
}

export function message (text: string, props: MessageProps = {}) {
  ensureRoot()

  const timeout = props.timeout ?? text.length / 13 + 1

  const item: MessageItem = {
    id: ++lastId,
    text,
    props,
    timeout,
    remaining: timeout * 1000,
  }

  items.set(item.id, item)

  if (timeout) {
    schedule(item)
  }

  viewTransition(render)

  return () => destroy(item.id)
}
