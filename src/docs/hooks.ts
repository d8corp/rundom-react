import { useEffect, useState } from 'react'

export type Theme = 'light dark' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme (): Theme {
  if (typeof localStorage === 'undefined') return 'light dark'

  const saved = localStorage.getItem(STORAGE_KEY)

  return saved === 'light' || saved === 'dark' ? saved : 'light dark'
}

export function useTheme () {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.body.style.colorScheme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === 'light dark') return 'light'
      if (current === 'light') return 'dark'

      return 'light dark'
    })
  }

  return { theme, toggleTheme }
}

export function useMediaQuery (query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    setMatches(mediaQuery.matches)

    const handleChange = () => setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
