import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS } from '../../../utils'
import { CloseIcon } from '../../icons'
import type { FlexProps } from '../../primitive'
import { Box, Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_WINDOW_HEADER) {
  addUiCSS(import.meta.env.RD_THEME_WINDOW_HEADER, 'window-header')
}

export const windowHeaderStyles = {
  root: import.meta.env?.RD_THEME_WINDOW_HEADER__ROOT,
  close: import.meta.env?.RD_THEME_WINDOW_HEADER__CLOSE,
}

export type WindowHeaderStyles = typeof windowHeaderStyles

export type WindowHeaderProps = Merge<Omit<FlexProps<'header'>, 'element'>, {
  onClose?: () => void
}>

export function WindowHeader ({
  onClose,
  children,
  class: classProp,
  className,
  ...props
}: WindowHeaderProps) {
  const styles = useStyles(windowHeaderStyles, [classProp, className])

  return (
    <Flex<'header'>
      element='header'
      {...props}
      className={styles.root}
    >
      {onClose && (
        <Box interact='clickable' color='danger' size='xs' square circle className={styles.close} onClick={onClose}>
          <CloseIcon />
        </Box>
      )}
      {children}
    </Flex>
  )
}
