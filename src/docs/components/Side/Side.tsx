import { useState } from 'react'

import { Flex, Input, Link, Scrollbar, SearchIcon } from '../../../ui'
import { cn } from '../../../utils'
import { usePath } from '../../router'
import type { MenuGroup } from '../../types'
import styles from './Side.module.scss'

export interface SideProps {
  menu: MenuGroup[]
  onClose?: () => void
}

export function Side ({ menu, onClose }: SideProps) {
  const path = usePath()
  const [query, setQuery] = useState('')
  const search = query.trim().toLowerCase()

  const filteredMenu = search
    ? menu
        .map(group => ({
          ...group,
          children: group.children.filter(item => item.children.toLowerCase().includes(search)),
        }))
        .filter(group => group.children.length)
    : menu

  return (
    <Flex element='aside' vertical gap={16} className={styles.root}>
      <div className={styles.background} onClick={onClose} />
      <Input
        circle
        clearable
        square='left'
        view='ghost'
        value={query}
        placeholder='Search'
        onChange={setQuery}
        before={<SearchIcon />}
      />
      <Scrollbar vertical flex gap={24} className={styles.scrollbar}>
        {filteredMenu.map(group => (
          <Flex vertical gap={10} key={group.title}>
            <div className={styles.group}>{group.title}</div>
            <Flex vertical gap={4}>
              {group.children.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(styles.item, path === item.href && styles.itemSelected)}
                >
                  {item.children}
                </Link>
              ))}
            </Flex>
          </Flex>
        ))}
        {!filteredMenu.length && <div className={styles.empty}>Nothing found</div>}
      </Scrollbar>
    </Flex>
  )
}
