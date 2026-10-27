import { useStyles } from '../../../hooks'
import type { FlexProps } from '../../../ui'
import { Flex } from '../../../ui'
import $styles from './Page.module.scss'

export type PageProps = FlexProps<'div'>

export function Page ({ class: classProp, className, ...props }: PageProps) {
  const styles = useStyles($styles, [classProp, className])

  return (
    <Flex
      vertical
      align='stretch'
      flex
      {...props}
      className={styles.root}
    />
  )
}
