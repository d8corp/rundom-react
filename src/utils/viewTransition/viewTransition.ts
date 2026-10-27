export function viewTransition (update: () => void): void {
  if (typeof document === 'undefined' || !document.startViewTransition) {
    update()

    return
  }

  document.startViewTransition(update)
}
