const injected = new Set<string>()

export function addUiCSS (css: string | undefined, component: string): void {
  if (!css || injected.has(component) || typeof document === 'undefined') return

  injected.add(component)

  const style = document.createElement('style')
  style.dataset.rundomReact = component
  style.textContent = css
  document.head.appendChild(style)
}
