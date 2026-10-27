import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { AsideIcon, Flex, SideIcon } from '../../../ui'
import type { TocItem } from '../../components/Aside'
import { Aside } from '../../components/Aside'
import { Side } from '../../components/Side'
import { useMediaQuery } from '../../hooks'
import { usePath } from '../../router'
import type { MenuGroup } from '../../types'
import { Page } from '../../ui'
import styles from './MenuLayout.module.scss'

export interface MenuLayoutProps {
  menu: MenuGroup[]
  children?: ReactNode
}

export function MenuLayout ({ children, menu }: MenuLayoutProps) {
  const path = usePath()
  const isMobile = useMediaQuery('(max-width: 801px)')
  const isLaptop = useMediaQuery('(max-width: 1023px)')
  const [showSide, setShowSide] = useState(false)
  const [showAside, setShowAside] = useState(false)
  const [toc, setToc] = useState<TocItem[]>([])
  const mainRef = useRef<HTMLElement>(null)
  const canShowAside = toc.length > 1
  const hasSide = !isMobile || showSide
  const hasAside = canShowAside && (!isLaptop || showAside)

  useEffect(() => {
    setShowSide(false)
    setShowAside(false)
  }, [path])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const elements = mainRef.current?.querySelectorAll('h2[id]') ?? []

      setToc(Array.from(elements).map(element => ({
        id: element.id,
        title: element.textContent?.replace(/#$/, '').trim() ?? element.id,
      })))
    })

    return () => cancelAnimationFrame(frame)
  }, [path])

  return (
    <Page className={styles.root} padding={[40, 24]}>
      <Flex flex gap={24}>
        <Flex<'main'>
          element='main'
          flex
          ref={mainRef}
          className={styles.main}
        >
          {children}
        </Flex>

        {hasSide && (
          <Side menu={menu} onClose={() => setShowSide(false)} />
        )}

        {hasAside && (
          <Aside items={toc} onClose={() => setShowAside(false)} />
        )}
      </Flex>

      {isLaptop && (
        <Flex gap={24} className={styles.buttons}>
          {isMobile && (
            <button
              className={styles.button}
              aria-label='Show navigation'
              onClick={() => {
                setShowAside(false)
                setShowSide(current => !current)
              }}
            >
              <SideIcon />
            </button>
          )}
          {canShowAside && (
            <button
              className={styles.button}
              aria-label='Show table of contents'
              onClick={() => {
                setShowSide(false)
                setShowAside(current => !current)
              }}
            >
              <AsideIcon />
            </button>
          )}
        </Flex>
      )}
    </Page>
  )
}
