import { classes } from 'html-classes'

import type { HTMLStyleProps, Merge } from '../../types'

export type BaseIconProps = Merge<HTMLStyleProps<'svg'>, {
  size?: number | string
}>

export function BaseIcon ({ size = '1em', class: classProp, className, style, ...props }: BaseIconProps) {
  const minSize = typeof size === 'number' ? `${size}px` : size

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={classes([classProp, className]) || undefined}
      style={{
        minWidth: minSize,
        minHeight: minSize,
        ...style,
      }}
    />
  )
}
