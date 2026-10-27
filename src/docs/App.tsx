import type { ComponentType } from 'react'
import { useEffect } from 'react'

import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { menu } from './menu'
import ContentPage from './pages/ContentPage'
import FeedbackPage from './pages/FeedbackPage'
import FormsPage from './pages/FormsPage'
import HomePage from './pages/HomePage'
import LayoutPage from './pages/LayoutPage'
import NotFoundPage from './pages/NotFoundPage'
import QuickStartPage from './pages/QuickStartPage'
import ThemePage from './pages/ThemePage'
import TypographyPage from './pages/TypographyPage'
import { usePath } from './router'

const pages: Record<string, ComponentType> = {
  '/quick-start': QuickStartPage,
  '/theme': ThemePage,
  '/ui/layout': LayoutPage,
  '/ui/typography': TypographyPage,
  '/ui/content': ContentPage,
  '/ui/forms': FormsPage,
  '/ui/feedback': FeedbackPage,
}

export function App () {
  const path = usePath()
  const Route = pages[path]

  useEffect(() => {
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1))

      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })

      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo(0, 0)
  }, [path])

  if (path === '/') {
    return (
      <MainLayout>
        <HomePage />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <MenuLayout menu={menu}>
        {Route ? <Route /> : <NotFoundPage />}
      </MenuLayout>
    </MainLayout>
  )
}
