import { classes } from 'html-classes'
import type { ChangeEvent, Ref } from 'react'
import { useEffect, useRef } from 'react'

import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS } from '../../../utils'
import type { BoxProps } from '../../primitive'
import { Box } from '../../primitive'

export type CheckBoxChecked = boolean | null

if (import.meta.env?.RD_THEME_CHECK_BOX) {
  addUiCSS(import.meta.env.RD_THEME_CHECK_BOX, 'check-box')
}

export const checkBoxStyles = {
  root: import.meta.env?.RD_THEME_CHECK_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_CHECK_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_CHECK_BOX__ACCENT,
  secondary: import.meta.env?.RD_THEME_CHECK_BOX__SECONDARY,
  success: import.meta.env?.RD_THEME_CHECK_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_CHECK_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_CHECK_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_CHECK_BOX__DISABLED,
  input: import.meta.env?.RD_THEME_CHECK_BOX__INPUT,
  indeterminate: import.meta.env?.RD_THEME_CHECK_BOX__INDETERMINATE,
}

export type CheckBoxStyles = typeof checkBoxStyles

export type CheckBoxProps = Omit<Merge<Omit<BoxProps<'label'>, 'element'>, {
  checked?: CheckBoxChecked
  defaultChecked?: boolean
  inputRef?: Ref<HTMLInputElement>
  name?: string
  disabled?: boolean
  value?: string
  onChange?: (checked: boolean) => void
}>, 'children'>

export function CheckBox ({
  checked,
  defaultChecked,
  inputRef,
  disabled,
  name,
  value,
  color,
  onChange,
  class: classProp,
  className,
  ...props
}: CheckBoxProps) {
  const styles = useStyles(checkBoxStyles, [classProp, className])
  const fallbackRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? fallbackRef

  useEffect(() => {
    const element = (ref as { current?: HTMLInputElement | null }).current

    if (element) {
      element.indeterminate = checked === null
    }
  }, [checked, ref])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked)
  }

  return (
    <Box<'label'>
      element='label'
      view='bordered'
      size='s'
      interact={disabled ? undefined : 'clickable'}
      {...props}
      color={disabled ? 'disabled' : color ?? 'primary'}
      className={{ ...styles, root: classes([styles.root, checked === null && styles.indeterminate]) }}
    >
      <input
        type='checkbox'
        className={styles.input}
        ref={ref}
        disabled={disabled}
        name={name}
        value={value}
        checked={checked === undefined ? undefined : checked === true}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={handleChange}
      />
    </Box>
  )
}
