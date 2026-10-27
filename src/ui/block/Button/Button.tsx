import type { MouseEvent } from 'react'
import { useState } from 'react'

import { useStyles } from '../../../hooks'
import type { Merge, SMLSize } from '../../../types'
import { addUiCSS, cn } from '../../../utils'
import type { BoxProps, BoxSize } from '../../primitive'
import { Box, Spin } from '../../primitive'

if (import.meta.env?.RD_THEME_BUTTON) {
  addUiCSS(import.meta.env.RD_THEME_BUTTON, 'button')
}

export const buttonStyles = {
  root: import.meta.env?.RD_THEME_BUTTON__ROOT,
  primary: import.meta.env?.RD_THEME_BUTTON__PRIMARY,
  accent: import.meta.env?.RD_THEME_BUTTON__ACCENT,
  secondary: import.meta.env?.RD_THEME_BUTTON__SECONDARY,
  success: import.meta.env?.RD_THEME_BUTTON__SUCCESS,
  warning: import.meta.env?.RD_THEME_BUTTON__WARNING,
  danger: import.meta.env?.RD_THEME_BUTTON__DANGER,
  disabled: import.meta.env?.RD_THEME_BUTTON__DISABLED,
  square: import.meta.env?.RD_THEME_BUTTON__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BUTTON__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BUTTON__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BUTTON__CIRCLE,
  loading: import.meta.env?.RD_THEME_BUTTON__LOADING,
  spin: import.meta.env?.RD_THEME_BUTTON__SPIN,
  clickable: import.meta.env?.RD_THEME_BUTTON__CLICKABLE,
  s: import.meta.env?.RD_THEME_BUTTON__S,
  m: import.meta.env?.RD_THEME_BUTTON__M,
  l: import.meta.env?.RD_THEME_BUTTON__L,
  filled: import.meta.env?.RD_THEME_BUTTON__FILLED,
  bordered: import.meta.env?.RD_THEME_BUTTON__BORDERED,
  ghost: import.meta.env?.RD_THEME_BUTTON__GHOST,
  dashed: import.meta.env?.RD_THEME_BUTTON__DASHED,
}

export const buttonSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type ButtonStyles = typeof buttonStyles

export type ButtonProps = Merge<Omit<BoxProps<'button'>, 'element' | 'size' | 'onClick'>, {
  element?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  size?: SMLSize
  loading?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<void>
}>

export function Button ({
  loading,
  onClick,
  children,
  color,
  size = 'm',
  disabled,
  interact = 'clickable',
  element = 'button',
  class: classProp,
  className,
  ...props
}: ButtonProps) {
  const styles = useStyles(buttonStyles, [classProp, className])
  const [internalLoading, setInternalLoading] = useState(false)
  const isLoading = loading ?? internalLoading
  const isDisabled = disabled || isLoading

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      event.preventDefault()

      return
    }

    const result = onClick?.(event)

    if (result instanceof Promise) {
      setInternalLoading(true)

      result.finally(() => {
        setInternalLoading(false)
      })
    }
  }

  return (
    <Box<'button'>
      element={element as 'button'}
      view='bordered'
      {...props}
      interact={isDisabled ? undefined : interact}
      color={disabled ? 'disabled' : color}
      size={buttonSizeMap[size]}
      className={{ ...styles, root: cn(styles.root, isLoading && styles.loading) }}
      disabled={element === 'button' ? isDisabled : undefined}
      aria-disabled={element === 'a' && isDisabled ? true : undefined}
      onClick={handleClick}
    >
      {children}
      {isLoading && <Spin className={styles.spin} />}
    </Box>
  )
}
