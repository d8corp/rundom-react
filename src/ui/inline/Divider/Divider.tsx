import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { HTMLStyleProps, Merge, SMLSize } from '../../../types'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_DIVIDER) {
  addUiCSS(import.meta.env.RD_THEME_DIVIDER, 'divider')
}

export const dividerStyles = {
  root: import.meta.env?.RD_THEME_DIVIDER__ROOT,
  vertical: import.meta.env?.RD_THEME_DIVIDER__VERTICAL,
  flush: import.meta.env?.RD_THEME_DIVIDER__FLUSH,
  s: import.meta.env?.RD_THEME_DIVIDER__S,
  m: import.meta.env?.RD_THEME_DIVIDER__M,
  l: import.meta.env?.RD_THEME_DIVIDER__L,
}

export type DividerStyles = typeof dividerStyles

export type DividerProps = Merge<HTMLStyleProps<'hr'>, {
  size?: SMLSize
  vertical?: boolean
  flush?: boolean
}>

export function Divider ({
  vertical,
  size = 'm',
  flush,
  class: classProp,
  className,
  ...props
}: DividerProps) {
  const styles = useStyles(dividerStyles, [classProp, className])

  return (
    <hr
      {...props}
      className={classes([styles.root, styles[size], vertical && styles.vertical, flush && styles.flush])}
    />
  )
}
