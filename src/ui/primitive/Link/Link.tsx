import { classes } from 'html-classes'
import type { MouseEvent } from 'react'

import { useStyles } from '../../../hooks'
import type { HTMLStyleProps, Merge } from '../../../types'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_LINK) {
  addUiCSS(import.meta.env.RD_THEME_LINK, 'link')
}

export const linkStyles = {
  root: import.meta.env?.RD_THEME_LINK__ROOT,
  active: import.meta.env?.RD_THEME_LINK__ACTIVE,
}

export type LinkStyles = typeof linkStyles

export interface BaseLinkProps {
  active?: boolean
  disabled?: boolean
}

export type LinkProps = Merge<HTMLStyleProps<'a'>, BaseLinkProps>

export function Link ({
  active,
  disabled,
  class: classProp,
  className,
  onClick,
  rel,
  target,
  ...props
}: LinkProps) {
  const styles = useStyles(linkStyles, [classProp, className, active && linkStyles.active])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault()

      return
    }

    onClick?.(event)
  }

  return (
    <a
      {...props}
      aria-disabled={disabled || undefined}
      className={classes(styles.root)}
      href={disabled ? undefined : props.href}
      rel={rel ?? (props.href?.startsWith('http') ? 'noopener noreferrer' : undefined)}
      target={target ?? (props.href?.startsWith('http') ? '_blank' : undefined)}
      tabIndex={disabled ? -1 : props.tabIndex}
      onClick={handleClick}
    />
  )
}
