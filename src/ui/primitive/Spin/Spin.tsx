import type { ElementType } from 'react'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { BaseIconProps } from '../../icons'
import { BaseIcon } from '../../icons'

if (import.meta.env?.RD_THEME_SPIN) {
  addUiCSS(import.meta.env.RD_THEME_SPIN, 'spin')
}

export const spinStyles = {
  root: import.meta.env?.RD_THEME_SPIN__ROOT,
  dot: import.meta.env?.RD_THEME_SPIN__DOT,
}

export type SpinStyles = typeof spinStyles

export type SpinProps = BaseIconProps & {
  count?: number
}

const DEFAULT_DOT_COUNT = 6

export function Spin ({ count, className, ...props }: SpinProps) {
  const styles = useStyles(spinStyles, className)
  const Dot = (import.meta.env?.RD_THEME__SPIN_DOT || 'circle') as ElementType
  const dotCount = count ?? Number(import.meta.env?.RD_THEME__SPIN_DOT_COUNT ?? DEFAULT_DOT_COUNT)

  return (
    <BaseIcon viewBox={import.meta.env?.RD_THEME__SPIN_DOT_VIEW_BOX} {...props} className={styles.root}>
      {Array.from({ length: dotCount }, (_, index) => (
        <Dot key={index} className={styles.dot} />
      ))}
    </BaseIcon>
  )
}
