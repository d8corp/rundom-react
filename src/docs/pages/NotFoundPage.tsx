import { Page, Title } from '../ui'

import { Button, Flex, Typography } from '../../ui'
import styles from './DocPage.module.scss'

export default function NotFoundPage () {
  return (
    <Page padding={[80, 24]} className={styles.root}>
      <Typography className={styles.article}>
        <Title
          title='Page not found'
          subtitle='The page you are looking for does not exist.'
          link
        />
        <p className={styles.lead}>
          Check the address or start from the home page.
        </p>
        <Flex gap={12} wrap>
          <Button color='accent' element='a' href='/'>Home</Button>
          <Button view='bordered' element='a' href='/ui/layout'>Components</Button>
        </Flex>
      </Typography>
    </Page>
  )
}
