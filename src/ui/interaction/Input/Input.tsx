import { classes } from 'html-classes'
import type { ChangeEvent, Ref } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS } from '../../../utils'
import type { FieldProps } from '../../block'
import { Field } from '../../block'
import { CloseIcon } from '../../icons'

if (import.meta.env?.RD_THEME_INPUT) {
  addUiCSS(import.meta.env.RD_THEME_INPUT, 'input')
}

export const inputStyles = {
  root: import.meta.env?.RD_THEME_INPUT__ROOT,
  primary: import.meta.env?.RD_THEME_INPUT__PRIMARY,
  accent: import.meta.env?.RD_THEME_INPUT__ACCENT,
  secondary: import.meta.env?.RD_THEME_INPUT__SECONDARY,
  success: import.meta.env?.RD_THEME_INPUT__SUCCESS,
  warning: import.meta.env?.RD_THEME_INPUT__WARNING,
  danger: import.meta.env?.RD_THEME_INPUT__DANGER,
  disabled: import.meta.env?.RD_THEME_INPUT__DISABLED,
  square: import.meta.env?.RD_THEME_INPUT__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_INPUT__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_INPUT__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_INPUT__CIRCLE,
  label: import.meta.env?.RD_THEME_INPUT__LABEL,
  m: import.meta.env?.RD_THEME_INPUT__M,
  s: import.meta.env?.RD_THEME_INPUT__S,
  l: import.meta.env?.RD_THEME_INPUT__L,
  clear: import.meta.env?.RD_THEME_INPUT__CLEAR,
  input: import.meta.env?.RD_THEME_INPUT__INPUT,
}

export type InputStyles = typeof inputStyles

export interface InputFocusOptions extends FocusOptions {
  timeout?: number
}

export type InputProps = Merge<Omit<FieldProps, 'children'>, {
  value?: string
  defaultValue?: string
  inputRef?: Ref<HTMLInputElement>
  name?: string
  placeholder?: string
  clearable?: boolean
  autofocus?: boolean | number | InputFocusOptions
  debounce?: boolean | number
  onChange?: (value: string) => void
}>

const DEBOUNCE_DELAY = 300

export function Input ({
  value,
  defaultValue = '',
  inputRef,
  name,
  placeholder,
  autofocus,
  clearable,
  debounce,
  onChange,
  after,
  class: classProp,
  className,
  ...props
}: InputProps) {
  const styles = useStyles(inputStyles, [classProp, className])
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value ?? internalValue
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const fallbackRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? fallbackRef
  const debounceDelay = debounce === true ? DEBOUNCE_DELAY : typeof debounce === 'number' ? debounce : 0

  useEffect(() => {
    if (!autofocus) return

    const element = (ref as { current?: HTMLInputElement | null }).current
    const options = typeof autofocus === 'object' ? autofocus : undefined
    const timeout = typeof autofocus === 'number' ? autofocus : options?.timeout ?? 0
    const timer = setTimeout(() => element?.focus(options), timeout)

    return () => clearTimeout(timer)
  }, [autofocus, ref])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    if (!debounceDelay) {
      onChange?.(nextValue)

      return
    }

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onChange?.(nextValue), debounceDelay)
  }

  const clear = () => {
    clearTimeout(timerRef.current)

    if (value === undefined) {
      setInternalValue('')
    }

    onChange?.('')
  }

  return (
    <Field
      view='bordered'
      interact='hoverable'
      {...props}
      className={{ ...styles, root: classes(styles.root) }}
      after={(
        <>
          {clearable && Boolean(currentValue) && (
            <CloseIcon
              className={styles.clear}
              role='button'
              aria-label='Clear'
              onMouseDown={(event) => event.preventDefault()}
              onClick={clear}
            />
          )}
          {after}
        </>
      )}
    >
      <input
        className={styles.input}
        placeholder={placeholder}
        name={name}
        ref={ref}
        value={currentValue}
        onChange={handleChange}
      />
    </Field>
  )
}
