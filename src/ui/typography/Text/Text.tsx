import type { CSSProperties } from 'react'

import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, HTMLStyleProps, Merge } from '../../../types'
import { addUiCSS } from '../../../utils'

export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'match-parent' | '-moz-center' | '-webkit-center' | GlobalCSSValue
export type TextDecoration = 'auto' | 'unset' | 'line-through' | 'overline' | 'underline' | GlobalCSSValue
export type TextBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'auto-phrase' | GlobalCSSValue
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable' | GlobalCSSValue
export type TextWeight = 'bold' | 'normal' | 'lighter' | 'bolder' | GlobalCSSValue | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type TextBoxTrim = 'none' | 'trim-start' | 'trim-end' | 'trim-both' | GlobalCSSValue
export type TextBoxEdgeStart = 'text' | 'cap' | 'ex'
export type TextBoxEdgeEnd = 'text' | 'alphabetic'
export type TextBoxEdge = 'auto' | 'text' | `${TextBoxEdgeStart} ${TextBoxEdgeEnd}` | GlobalCSSValue
export type TextBox = `${TextBoxTrim} ${TextBoxEdge}` | TextBoxEdge | TextBoxTrim

if (import.meta.env?.RD_THEME_TEXT) {
  addUiCSS(import.meta.env.RD_THEME_TEXT, 'text')
}

export const textStyles = {
  root: import.meta.env?.RD_THEME_TEXT__ROOT,
}

export type TextStyles = typeof textStyles

export type TextProps = Merge<HTMLStyleProps<'span'>, {
  align?: TextAlign
  break?: TextBreak
  color?: string
  cursor?: string
  decoration?: TextDecoration
  italic?: boolean
  nowrap?: boolean | number
  size?: number | string
  lineHeight?: number | string
  weight?: TextWeight
  wrap?: TextWrap
  box?: TextBox
}>

export function Text ({
  color,
  cursor,
  weight,
  size,
  break: propsBreak,
  align,
  decoration,
  lineHeight,
  italic,
  nowrap,
  wrap,
  box,
  class: classProp,
  className,
  style,
  ...props
}: TextProps) {
  const styles = useStyles(textStyles, [classProp, className])

  return (
    <span
      {...props}
      className={styles.root}
      style={{
        color,
        cursor,
        fontWeight: weight as CSSProperties['fontWeight'],
        wordBreak: propsBreak as CSSProperties['wordBreak'],
        textAlign: align as CSSProperties['textAlign'],
        textDecoration: decoration as CSSProperties['textDecoration'],
        textWrap: wrap as CSSProperties['textWrap'],
        textBox: box,
        fontSize: typeof size === 'number' ? `${size}px` : size,
        lineHeight: typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight,
        fontStyle: italic ? 'italic' : undefined,
        WebkitLineClamp: typeof nowrap === 'number' ? String(nowrap) : nowrap ? '1' : undefined,
        display: nowrap ? '-webkit-box' : undefined,
        WebkitBoxOrient: nowrap ? 'vertical' : undefined,
        overflow: nowrap || wrap === 'nowrap' ? 'hidden' : undefined,
        textOverflow: wrap === 'nowrap' ? 'ellipsis' : undefined,
        whiteSpace: nowrap ? 'normal' : undefined,
        height: nowrap ? 'fit-content' : undefined,
        ...style,
      }}
    />
  )
}
