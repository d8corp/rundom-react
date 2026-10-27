import { useStyles } from '../../../hooks'
import type { FlexProps } from '../../../ui'
import { Box, Markdown, Typography, Window, WindowContent, WindowHeader } from '../../../ui'
import styles from './View.module.scss'

export interface ViewProps extends FlexProps<'div'> {
  title?: string
}

export function View ({ title, children, class: classProp, className, ...props }: ViewProps) {
  const viewStyles = useStyles(styles, [classProp, className])

  return (
    <Window {...props} className={viewStyles.root}>
      <WindowHeader>
        <Box color='danger' circle size='xs' />
        <Box color='warning' circle size='xs' />
        <Box color='success' circle size='xs' />
        <Typography flex>
          <Markdown text={title ?? 'Example'} />
        </Typography>
      </WindowHeader>
      <WindowContent className={viewStyles.content}>
        <div>
          {children}
        </div>
      </WindowContent>
    </Window>
  )
}
