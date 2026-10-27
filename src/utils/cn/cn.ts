import type { ClassValue } from '../../types'

function collect (value: ClassValue, result: string[]): void {
  if (!value) return

  if (typeof value === 'string') {
    result.push(value)

    return
  }

  if (Array.isArray(value)) {
    for (const item of value) collect(item, result)

    return
  }

  for (const [name, enabled] of Object.entries(value)) {
    if (typeof enabled === 'string') result.push(enabled)
    else if (enabled) result.push(name)
  }
}

export function cn (...values: ClassValue[]): string {
  const result: string[] = []

  for (const value of values) collect(value, result)

  return [...new Set(result)].join(' ')
}
