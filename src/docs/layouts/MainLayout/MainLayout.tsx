import type { ReactNode } from 'react'

import { Flex } from '../../../ui'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import styles from './MainLayout.module.scss'

export interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout ({ children }: MainLayoutProps) {
  return (
    <Flex vertical flex>
      <Flex vertical flex className={styles.wrapper}>
        <Header />
        <Flex flex vertical className={styles.content}>
          {children}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  )
}
