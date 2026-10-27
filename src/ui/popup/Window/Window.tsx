import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { CardProps } from '../../layout'
import { Card } from '../../layout'

if (import.meta.env?.RD_THEME_WINDOW) {
  addUiCSS(import.meta.env.RD_THEME_WINDOW, 'window')
}

export const windowStyles = {
  root: import.meta.env?.RD_THEME_WINDOW__ROOT,
  clickable: import.meta.env?.RD_THEME_WINDOW__CLICKABLE,
  m: import.meta.env?.RD_THEME_WINDOW__M,
  s: import.meta.env?.RD_THEME_WINDOW__S,
  l: import.meta.env?.RD_THEME_WINDOW__L,
}

export type WindowStyles = typeof windowStyles

export type WindowProps = CardProps

export function Window ({ class: classProp, className, ...props }: WindowProps) {
  const styles = useStyles(windowStyles, [classProp, className])

  return <Card vertical {...props} className={styles.root} />
}
