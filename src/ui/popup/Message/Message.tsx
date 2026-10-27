import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS, cn } from '../../../utils'
import type { FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

if (import.meta.env?.RD_THEME_MESSAGE) {
  addUiCSS(import.meta.env.RD_THEME_MESSAGE, 'message')
}

export const messageStyles = {
  root: import.meta.env?.RD_THEME_MESSAGE__ROOT,
  success: import.meta.env?.RD_THEME_MESSAGE__SUCCESS,
  error: import.meta.env?.RD_THEME_MESSAGE__ERROR,
  warning: import.meta.env?.RD_THEME_MESSAGE__WARNING,
  info: import.meta.env?.RD_THEME_MESSAGE__INFO,
  timeout: import.meta.env?.RD_THEME_MESSAGE__TIMEOUT,
}

export type MessageStyles = typeof messageStyles

export type MessageProps = Merge<FlexProps<'div'>, {
  type?: MessageType
  timeout?: number
}>

export function Message ({
  type = 'info',
  timeout,
  class: classProp,
  className,
  ...props
}: MessageProps) {
  const styles = useStyles(messageStyles, [classProp, className])

  return (
    <Flex
      {...props}
      className={cn(styles.root, styles[type], timeout ? styles.timeout : undefined)}
    />
  )
}
