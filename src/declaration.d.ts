declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

interface ImportMeta {
  readonly env?: Record<string, string | undefined>
  readonly require?: (src?: string) => any
}

interface Document {
  startViewTransition?: (update: () => void | Promise<void>) => unknown
}
