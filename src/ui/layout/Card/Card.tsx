import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { Merge, SMLSize } from '../../../types'
import { addUiCSS } from '../../../utils'
import type { FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD) {
  addUiCSS(import.meta.env.RD_THEME_CARD, 'card')
}

export const cardStyles = {
  root: import.meta.env?.RD_THEME_CARD__ROOT,
  clickable: import.meta.env?.RD_THEME_CARD__CLICKABLE,
  m: import.meta.env?.RD_THEME_CARD__M,
  s: import.meta.env?.RD_THEME_CARD__S,
  l: import.meta.env?.RD_THEME_CARD__L,
}

export type CardStyles = typeof cardStyles

export type CardProps = Merge<FlexProps<'div'>, {
  size?: SMLSize
  clickable?: boolean
  width?: string | number
  height?: string | number
}>

export function Card ({
  size = 'm',
  onClick,
  clickable = Boolean(onClick),
  width,
  height,
  class: classProp,
  className,
  style,
  ...props
}: CardProps) {
  const styles = useStyles(cardStyles, [classProp, className])

  return (
    <Flex
      {...props}
      className={classes([styles.root, styles[size], clickable && styles.clickable])}
      onClick={onClick}
      style={{
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}
