import type { CSSProperties, ElementType } from 'react'

import { useStyles } from '../../../hooks'
import type { ElementProps, FlexAlign, FlexGap, FlexJustify, FlexPadding, HTMLElementTagName, Merge, StyledProps } from '../../../types'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_FLEX) {
  addUiCSS(import.meta.env.RD_THEME_FLEX, 'flex')
}

export const flexStyles = {
  root: import.meta.env?.RD_THEME_FLEX__ROOT,
}

export type FlexStyles = typeof flexStyles
export type FlexElement = HTMLElementTagName

export interface BaseFlexProps {
  align?: FlexAlign
  flex?: number | boolean
  gap?: FlexGap
  inline?: boolean
  justify?: FlexJustify
  padding?: FlexPadding
  reverse?: boolean
  vertical?: boolean
  wrap?: boolean
}

export type FlexProps<T extends FlexElement = 'div'> = Merge<
  ElementProps<T>,
  StyledProps & { element?: T } & BaseFlexProps
>

function paddingToCss (padding: FlexPadding | undefined): string | undefined {
  if (padding === undefined) return undefined

  return Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`
}

function gapToCss (gap: FlexGap | undefined): string | undefined {
  if (gap === undefined) return undefined

  return Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`
}

export function Flex<T extends FlexElement = 'div'> ({
  align,
  flex,
  gap,
  inline,
  justify,
  padding,
  reverse,
  vertical,
  wrap,
  style,
  element = 'div' as T,
  class: classProp,
  className,
  ...props
}: FlexProps<T>) {
  const styles = useStyles(flexStyles, classProp ?? className)
  const Component = element as ElementType

  return (
    <Component
      {...props as ElementProps<'div'>}
      className={styles.root}
      style={{
        justifyContent: justify as CSSProperties['justifyContent'],
        alignItems: align as CSSProperties['alignItems'],
        flexWrap: wrap ? 'wrap' : undefined,
        flex: flex === true ? 1 : flex || undefined,
        display: inline ? 'inline-flex' : undefined,
        flexDirection: vertical
          ? reverse ? 'column-reverse' : 'column'
          : reverse ? 'row-reverse' : undefined,
        padding: paddingToCss(padding),
        gap: gapToCss(gap),
        ...style,
      }}
    />
  )
}
