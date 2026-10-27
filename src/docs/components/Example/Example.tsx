import type { FlexProps } from '../../../ui'
import { Flex, Markdown, Typography } from '../../../ui'
import { cn } from '../../../utils'
import { useMediaQuery } from '../../hooks'
import { Highlight } from '../../ui'
import { View } from '../../ui/View'
import styles from './Example.module.scss'

export interface ExampleProps extends Omit<FlexProps<'div'>, 'children' | 'title'> {
  description?: string
  code?: string
  lang?: string
  title?: string
  children?: React.ReactNode
}

export function Example ({ description, code, lang = 'tsx', title = 'Example', children, class: classProp, className, ...props }: ExampleProps) {
  const isLaptop = useMediaQuery('(max-width: 1023px)')

  return (
    <Flex padding={[32, 24]} {...props} className={cn(styles.wrapper, classProp, className)}>
      <Flex gap={32} align='flex-start' vertical={isLaptop} className={styles.content}>
        <Typography className={styles.description}>
          <Markdown text={description} />
        </Typography>
        <Flex vertical gap={16} className={styles.demo}>
          <View title={title}>
            {children}
          </View>
          {code && <Highlight code={code} lang={lang} />}
        </Flex>
      </Flex>
    </Flex>
  )
}
