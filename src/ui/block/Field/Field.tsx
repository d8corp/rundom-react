import type { ReactNode } from 'react'

import { useStyles } from '../../../hooks'
import type { Merge, SMLSize } from '../../../types'
import { addUiCSS, cn } from '../../../utils'
import type { BoxProps, BoxSize } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_FIELD) {
  addUiCSS(import.meta.env.RD_THEME_FIELD, 'field')
}

export const fieldStyles = {
  root: import.meta.env?.RD_THEME_FIELD__ROOT,
  primary: import.meta.env?.RD_THEME_FIELD__PRIMARY,
  accent: import.meta.env?.RD_THEME_FIELD__ACCENT,
  secondary: import.meta.env?.RD_THEME_FIELD__SECONDARY,
  success: import.meta.env?.RD_THEME_FIELD__SUCCESS,
  warning: import.meta.env?.RD_THEME_FIELD__WARNING,
  danger: import.meta.env?.RD_THEME_FIELD__DANGER,
  disabled: import.meta.env?.RD_THEME_FIELD__DISABLED,
  square: import.meta.env?.RD_THEME_FIELD__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_FIELD__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_FIELD__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_FIELD__CIRCLE,
  label: import.meta.env?.RD_THEME_FIELD__LABEL,
  content: import.meta.env?.RD_THEME_FIELD__CONTENT,
  m: import.meta.env?.RD_THEME_FIELD__M,
  s: import.meta.env?.RD_THEME_FIELD__S,
  l: import.meta.env?.RD_THEME_FIELD__L,
}

export const fieldSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type FieldStyles = typeof fieldStyles

export type FieldProps = Merge<Omit<BoxProps<'label'>, 'element'>, {
  size?: SMLSize
  label?: string
  before?: ReactNode
  after?: ReactNode
}>

export function Field ({
  size = 'm',
  children,
  label,
  before,
  after,
  class: classProp,
  className,
  ...props
}: FieldProps) {
  const styles = useStyles(fieldStyles, [classProp, className])

  return (
    <Box<'label'>
      element='label'
      {...props}
      size={fieldSizeMap[size]}
      className={{ ...styles, root: cn(styles.root) }}
    >
      {before}
      <span className={styles.content}>
        {children}
        {label ? <span className={styles.label}>{label}</span> : null}
      </span>
      {after}
    </Box>
  )
}
