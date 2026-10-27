import { Flex, Link } from '../../../ui'
import styles from './Aside.module.scss'

export interface TocItem {
  id: string
  title: string
}

export interface AsideProps {
  items: TocItem[]
  onClose?: () => void
}

export function Aside ({ items, onClose }: AsideProps) {
  return (
    <Flex element='aside' vertical className={styles.root}>
      <div className={styles.background} onClick={onClose} />
      <Flex flex vertical gap={12} className={styles.scrollbar}>
        <div className={styles.title}>On this page</div>
        <Flex vertical gap={8} className={styles.content}>
          {items.map(item => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={onClose}
              className={styles.item}
            >
              {item.title}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
