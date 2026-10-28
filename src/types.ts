import type { ClassesArgument } from 'html-classes'
import type { ComponentPropsWithRef, CSSProperties, JSX, ReactNode } from 'react'

export type RDColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'disabled'

export type SMLSize = 's' | 'm' | 'l'

export type Merge<A, B> = Omit<A, keyof B> & B

export type HTMLElementTagName = keyof JSX.IntrinsicElements

export type GlobalCSSValue = string & {}

export type HTMLStyleProp = CSSProperties & Record<`--${string}`, string | number | undefined>

export type FlexPadding = number | [number, number] | [number, number, number] | [number, number, number, number]

export type FlexGap = number | [number, number]

export type FlexBaseAlign = 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'safe center' | 'unsafe center' | GlobalCSSValue

export type FlexJustify = 'space-between' | 'space-around' | 'space-evenly' | FlexBaseAlign

export type FlexAlign = 'self-start' | 'self-end' | 'anchor-center' | 'baseline' | 'first baseline' | 'last baseline' | FlexBaseAlign

export type ElementProps<T extends HTMLElementTagName> = Omit<ComponentPropsWithRef<T>, 'className' | 'style'> & {
  className?: ClassesArgument
  style?: HTMLStyleProp
}

export type StyledProps = {
  class?: ClassesArgument
  className?: ClassesArgument
}

export type HTMLStyleProps<T extends HTMLElementTagName> = Merge<ElementProps<T>, StyledProps>

export type JSXElement = ReactNode

export type ChildrenProps = {
  children?: ReactNode
}
