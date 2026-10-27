import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { HTMLElementTagName, Merge, RDColor, SMLSize } from '../../../types'
import { addUiCSS, cn } from '../../../utils'

export type BoxSize = SMLSize | 'xs' | 'xxs' | 'xl' | 'xxl'
export type BoxView = 'filled' | 'bordered' | 'ghost' | 'dashed'
export type BoxInteract = 'hoverable' | 'clickable'

if (import.meta.env?.RD_THEME_BOX) {
  addUiCSS(import.meta.env.RD_THEME_BOX, 'box')
}

export const boxStyles = {
  root: import.meta.env?.RD_THEME_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_BOX__ACCENT,
  secondary: import.meta.env?.RD_THEME_BOX__SECONDARY,
  success: import.meta.env?.RD_THEME_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_BOX__DISABLED,
  square: import.meta.env?.RD_THEME_BOX__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BOX__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BOX__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BOX__CIRCLE,
  clickable: import.meta.env?.RD_THEME_BOX__CLICKABLE,
  hoverable: import.meta.env?.RD_THEME_BOX__HOVERABLE,
  xxs: import.meta.env?.RD_THEME_BOX__XXS,
  xs: import.meta.env?.RD_THEME_BOX__XS,
  s: import.meta.env?.RD_THEME_BOX__S,
  m: import.meta.env?.RD_THEME_BOX__M,
  l: import.meta.env?.RD_THEME_BOX__L,
  xl: import.meta.env?.RD_THEME_BOX__XL,
  xxl: import.meta.env?.RD_THEME_BOX__XXL,
  filled: import.meta.env?.RD_THEME_BOX__FILLED,
  bordered: import.meta.env?.RD_THEME_BOX__BORDERED,
  ghost: import.meta.env?.RD_THEME_BOX__GHOST,
  dashed: import.meta.env?.RD_THEME_BOX__DASHED,
}

export type BoxStyles = typeof boxStyles

export type BoxProps<T extends HTMLElementTagName = 'div'> = Merge<FlexProps<T>, {
  color?: RDColor
  size?: BoxSize
  view?: BoxView
  square?: boolean | 'left' | 'right'
  circle?: boolean
  interact?: BoxInteract
}>

export function Box<T extends FlexElement = 'div'> ({
  size = 'm',
  color = 'primary',
  view = 'filled',
  square = false,
  circle = false,
  interact,
  class: classProp,
  className,
  ...props
}: BoxProps<T>) {
  const styles = useStyles(boxStyles, classProp ?? className)

  const root = cn(
    styles.root,
    styles[color],
    styles[view],
    styles[size],
    interact && styles[interact],
    square === 'left'
      ? styles.squareLeft
      : square === 'right' ? styles.squareRight : square && styles.square,
    circle && styles.circle,
  )

  return <Flex {...props as FlexProps<T>} className={root} />
}
