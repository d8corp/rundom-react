import type { ElementType } from 'react'
import { useEffect } from 'react'

import { useStyles } from '../../../hooks'
import type { HTMLStyleProps } from '../../../types'
import { Link, LinkIcon } from '../../../ui'
import { cn } from '../../../utils'
import { slugify } from '../../slugify'
import $styles from './Title.module.scss'

const linkSize: Record<1 | 2 | 3 | 4 | 5 | 6, number> = {
  1: 32,
  2: 24,
  3: 14,
  4: 12,
  5: 12,
  6: 12,
}

export interface TitleProps extends HTMLStyleProps<'h1'> {
  h?: 1 | 2 | 3 | 4 | 5 | 6
  title?: string
  subtitle?: string
  link?: boolean
}

export function Title ({
  h = 1,
  title,
  subtitle,
  children = title,
  link,
  id = title && link ? slugify(title) : undefined,
  class: classProp,
  className,
  style,
  ...props
}: TitleProps) {
  const styles = useStyles($styles, [classProp, className])

  useEffect(() => {
    if (h === 1 && title) {
      document.title = `${title} — Rundom React`
    }
  }, [h, title])

  const H = `h${h}` as ElementType

  return (
    <H
      {...props}
      id={id}
      className={cn(styles.root, title && link && styles.withLink)}
      style={style}
    >
      {children}
      {title && link && (
        <Link className={styles.link} href={`#${slugify(title)}`}>
          <LinkIcon size={linkSize[h]} />
        </Link>
      )}
      {subtitle && <div className={styles.subTitle}>{subtitle}</div>}
    </H>
  )
}
