import { classes, type ClassesArgument } from 'html-classes'

export type Styles = Record<string, string | undefined>
export type HTMLClassProp<S extends Styles = Styles> =
  | ClassesArgument<keyof S>
  | Record<keyof S, ClassesArgument<keyof S>>

export function useStyles<S extends Styles> (
  styles: S,
  className?: HTMLClassProp<S>,
): S {
  const keyed = typeof className === 'object' && className !== null && !Array.isArray(className)
  const classNames = (keyed ? className : { root: className }) as Record<string, ClassesArgument>
  const result: Record<string, string> = {}

  for (const key in classNames) {
    result[key] = classes(classNames[key])
  }

  for (const key in styles) {
    result[key] = classes([styles[key], classNames[key]])
  }

  return result as S
}
