import type { MenuGroup } from './types'

export const menu: MenuGroup[] = [
  {
    title: 'Rundom React',
    children: [
      { href: '/', children: 'Home' },
      { href: '/quick-start', children: 'Quick Start' },
      { href: '/theme', children: 'Theme CLI' },
    ],
  },
  {
    title: 'Components',
    children: [
      { href: '/ui/layout', children: 'Layout' },
      { href: '/ui/typography', children: 'Typography' },
      { href: '/ui/content', children: 'Content' },
      { href: '/ui/forms', children: 'Forms' },
      { href: '/ui/feedback', children: 'Feedback' },
    ],
  },
]
