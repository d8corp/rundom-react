import { useSyncExternalStore } from 'react'

const NAV_EVENT = 'rundom-react:navigate'
const BASE_URL = import.meta.env?.RD_BASE_URL || ''

export function getPath (): string {
  if (typeof window === 'undefined') return '/'

  let path = window.location.pathname

  if (BASE_URL && path.startsWith(BASE_URL)) {
    path = path.slice(BASE_URL.length)
  }

  if (!path) return '/'
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)

  return path
}

function subscribe (callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener(NAV_EVENT, callback)

  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener(NAV_EVENT, callback)
  }
}

export function usePath (): string {
  return useSyncExternalStore(subscribe, getPath, () => '/')
}

export function navigate (href: string) {
  if (typeof window === 'undefined') return

  if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
    window.location.href = href

    return
  }

  const nextUrl = `${BASE_URL}${href}`

  if (`${window.location.pathname}${window.location.search}` === nextUrl) return

  window.history.pushState(null, '', nextUrl)
  window.dispatchEvent(new Event(NAV_EVENT))
}

export function initLinkInterceptor () {
  if (typeof document === 'undefined') return

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const target = event.target as Element | null
    const anchor = target?.closest('a')

    if (!anchor) return

    const href = anchor.getAttribute('href')

    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
      return
    }

    if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

    event.preventDefault()
    navigate(href)
  })
}
