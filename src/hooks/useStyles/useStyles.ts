import type { ClassValue } from '../../types'
import { cn } from '../../utils'

export function useStyles<S extends Record<string, string | undefined>> (
  styles: S,
  className?: ClassValue,
): S {
  return {
    ...styles,
    root: cn(styles.root, className),
  }
}
