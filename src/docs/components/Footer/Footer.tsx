import { Flex, Link } from '../../../ui'
import styles from './Footer.module.scss'

export function Footer () {
  return (
    <Flex element='footer' className={styles.root}>
      <Flex align='center' flex justify='space-between' className={styles.content}>
        © 2026 Mike&nbsp;Lysikov. MIT&nbsp;License.
        <Flex wrap gap={20}>
          <Link href='https://github.com/d8corp/rundom-react/pulls' className={styles.link}>Pulls</Link>
          <Link href='https://github.com/d8corp/rundom-react/issues' className={styles.link}>Issues</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
