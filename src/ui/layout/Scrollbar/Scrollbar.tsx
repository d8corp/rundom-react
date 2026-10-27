import type { CSSProperties } from 'react'

import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, Merge, SMLSize } from '../../../types'
import { addUiCSS, cn } from '../../../utils'
import type { FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_SCROLLBAR) {
  addUiCSS(import.meta.env.RD_THEME_SCROLLBAR, 'scrollbar')
}

export const scrollbarStyles = {
  root: import.meta.env?.RD_THEME_SCROLLBAR__ROOT,
  stable: import.meta.env?.RD_THEME_SCROLLBAR__STABLE,
  m: import.meta.env?.RD_THEME_SCROLLBAR__M,
  s: import.meta.env?.RD_THEME_SCROLLBAR__S,
  l: import.meta.env?.RD_THEME_SCROLLBAR__L,
}

export type ScrollbarStyles = typeof scrollbarStyles

export type ScrollbarOverflowBase = 'auto' | 'hidden' | 'scroll' | 'visible' | 'clip' | GlobalCSSValue
export type ScrollbarOverflow = ScrollbarOverflowBase | `${ScrollbarOverflowBase} ${ScrollbarOverflowBase}`

export type ScrollbarProps = Merge<FlexProps<'div'>, {
  stable?: boolean
  overflow?: ScrollbarOverflow
  size?: SMLSize
}>

export function Scrollbar ({
  stable,
  size = 'm',
  overflow = 'auto',
  class: classProp,
  className,
  style,
  ...props
}: ScrollbarProps) {
  const styles = useStyles(scrollbarStyles, [classProp, className])

  return (
    <Flex
      {...props}
      style={{
        ...style,
        overflow: overflow as CSSProperties['overflow'],
      }}
      className={cn(styles.root, styles[size], stable && styles.stable)}
    />
  )
}
