import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { BoxProps } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_CODE) {
  addUiCSS(import.meta.env.RD_THEME_CODE, 'code')
}

export const codeStyles = {
  root: import.meta.env?.RD_THEME_CODE__ROOT,
}

export type CodeStyles = typeof codeStyles

export type CodeProps = Omit<BoxProps<'code'>, 'element'>

export function Code ({ class: classProp, className, ...props }: CodeProps) {
  const styles = useStyles(codeStyles, [classProp, className])

  return <Box element='code' square view='bordered' {...props} className={styles.root} />
}
