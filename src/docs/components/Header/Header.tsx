import { Button, Flex, Link, MonitorIcon, MoonIcon, SunIcon } from '../../../ui'
import { cn } from '../../../utils'
import { useTheme } from '../../hooks'
import { usePath } from '../../router'
import styles from './Header.module.scss'

const nav = [
  { href: '/quick-start', label: 'Docs' },
  { href: '/ui/layout', label: 'UI' },
  { href: '/theme', label: 'Theme' },
]

export function Header () {
  const path = usePath()
  const { theme, toggleTheme } = useTheme()

  return (
    <Flex data-glow element='header' className={styles.root}>
      <Flex flex padding={[0, 24]} align='center' justify='space-between' className={styles.content}>
        <Link href='/' className={styles.logo}>
          Rundom&nbsp;React
        </Link>
        <Flex element='nav' align='center' gap={28} className={styles.nav}>
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(styles.link, path.startsWith(item.href) && item.href !== '/quick-start' && styles.active)}
            >
              {item.label}
            </Link>
          ))}
          <Link href='https://www.npmjs.com/package/rundom-react' className={styles.link}>NPM</Link>
          <Link href='https://github.com/d8corp/rundom-react' className={styles.link}>GitHub</Link>
          <Button
            data-glow
            square
            view='bordered'
            className={styles.themeButton}
            aria-label='Toggle theme'
            onClick={toggleTheme}
          >
            {theme === 'light dark' ? <MonitorIcon /> : theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
