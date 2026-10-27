import type { CSSProperties } from 'react'

import { useStyles } from '../../../hooks'
import type { HTMLStyleProps, Merge } from '../../../types'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_TYPOGRAPHY) {
  addUiCSS(import.meta.env.RD_THEME_TYPOGRAPHY, 'typography')
}

export const typographyStyles = {
  root: import.meta.env?.RD_THEME_TYPOGRAPHY__ROOT,
}

export type TypographyStyles = typeof typographyStyles

export type TypographyProps = Merge<HTMLStyleProps<'article'>, {
  flex?: number | boolean
}>

export function Typography ({
  flex,
  class: classProp,
  className,
  style,
  ...props
}: TypographyProps) {
  const styles = useStyles(typographyStyles, [classProp, className])

  return (
    <article
      {...props}
      className={styles.root}
      style={{
        flex: flex === true ? 1 : flex || undefined,
        ...style as CSSProperties,
      }}
    />
  )
}
