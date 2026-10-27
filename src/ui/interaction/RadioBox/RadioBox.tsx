import type { ChangeEvent, Ref } from 'react'
import { useRef } from 'react'

import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS, cn } from '../../../utils'
import type { BoxProps } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_RADIO_BOX) {
  addUiCSS(import.meta.env.RD_THEME_RADIO_BOX, 'radio-box')
}

export const radioBoxStyles = {
  root: import.meta.env?.RD_THEME_RADIO_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_RADIO_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_RADIO_BOX__ACCENT,
  secondary: import.meta.env?.RD_THEME_RADIO_BOX__SECONDARY,
  success: import.meta.env?.RD_THEME_RADIO_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_RADIO_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_RADIO_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_RADIO_BOX__DISABLED,
  input: import.meta.env?.RD_THEME_RADIO_BOX__INPUT,
}

export type RadioBoxStyles = typeof radioBoxStyles

export type RadioBoxProps = Omit<Merge<Omit<BoxProps<'label'>, 'element'>, {
  checked?: boolean
  defaultChecked?: boolean
  inputRef?: Ref<HTMLInputElement>
  name?: string
  disabled?: boolean
  value?: string
  onChange?: (checked: boolean) => void
}>, 'children'>

export function RadioBox ({
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
}: RadioBoxProps) {
  const styles = useStyles(radioBoxStyles, [classProp, className])
  const fallbackRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? fallbackRef

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
      className={{ ...styles, root: cn(styles.root) }}
    >
      <input
        type='radio'
        className={styles.input}
        ref={ref}
        disabled={disabled}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={handleChange}
      />
    </Box>
  )
}
