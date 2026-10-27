import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS } from '../../../utils'
import type { FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_WINDOW_CONTENT) {
  addUiCSS(import.meta.env.RD_THEME_WINDOW_CONTENT, 'window-content')
}

export const windowContentStyles = {
  root: import.meta.env?.RD_THEME_WINDOW_CONTENT__ROOT,
}

export type WindowContentStyles = typeof windowContentStyles

export type WindowContentProps = Merge<FlexProps<'div'>, {}>

export function WindowContent ({
  class: classProp,
  className,
  ...props
}: WindowContentProps) {
  const styles = useStyles(windowContentStyles, [classProp, className])

  return <Flex {...props} className={styles.root} />
}
