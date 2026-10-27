import Prism from 'prismjs'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { message } from '../../../helpers'
import { useStyles } from '../../../hooks'
import type { FlexProps } from '../../../ui'
import {
  Button,
  CopyIcon,
  Flex,
  HtmlIcon,
  JsonIcon,
  Markdown,
  SuccessIcon,
  TerminalIcon,
  TypeScriptIcon,
  Typography,
} from '../../../ui'
import { cn } from '../../../utils'
import $styles from './Highlight.module.scss'

const icons: Record<string, ReactNode> = {
  ts: <TypeScriptIcon />,
  tsx: <TypeScriptIcon />,
  js: <TypeScriptIcon />,
  jsx: <TypeScriptIcon />,
  shell: <TerminalIcon />,
  bash: <TerminalIcon />,
  html: <HtmlIcon />,
  json: <JsonIcon />,
}

export interface HighlightProps extends Omit<FlexProps<'div'>, 'children'> {
  code: string
  lang: string
  title?: string
}

export function Highlight ({
  code,
  lang,
  title,
  class: classProp,
  className,
  ...props
}: HighlightProps) {
  const styles = useStyles($styles, [classProp, className])
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const source = code.trim()

  useEffect(() => {
    const element = preRef.current

    if (!element) return

    const grammar = Prism.languages[lang]

    if (grammar) {
      element.innerHTML = Prism.highlight(source, grammar, lang)
    } else {
      element.textContent = source
    }
  }, [lang, source])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copy = () => {
    void navigator.clipboard?.writeText(source)
    setCopied(true)
    message('Copied to clipboard')

    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Flex vertical {...props} className={styles.root}>
      <Flex vertical className={styles.header}>
        <Flex padding={[12, 16]} className={styles.title} gap={8} align='center'>
          {icons[lang] ?? <TerminalIcon />}
          <Typography flex className={styles.titleText}>
            <Markdown text={title ?? lang} />
          </Typography>
          <Button size='s' square view='bordered' onClick={copy}>
            {copied ? <SuccessIcon /> : <CopyIcon />}
          </Button>
        </Flex>
      </Flex>
      <div className={cn(styles.code)}>
        <pre className={`language-${lang}`} ref={preRef} />
      </div>
    </Flex>
  )
}
