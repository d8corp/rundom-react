import { render } from '@testing-library/react'
import { createRef } from 'react'

import { Flex } from './Flex'

describe('Flex', () => {
  it('renders a div with flex styles', () => {
    const { container } = render(
      <Flex gap={[8, 16]} padding={[8, 16, 24]} justify='center' align='flex-start' vertical wrap />,
    )

    const element = container.firstElementChild as HTMLElement

    expect(element.tagName).toBe('DIV')
    expect(element.style.gap).toBe('8px 16px')
    expect(element.style.padding).toBe('8px 16px 24px')
    expect(element.style.justifyContent).toBe('center')
    expect(element.style.alignItems).toBe('flex-start')
    expect(element.style.flexDirection).toBe('column')
    expect(element.style.flexWrap).toBe('wrap')
  })

  it('supports reverse, inline and flex props', () => {
    const { container } = render(
      <Flex reverse inline flex={2} vertical />,
    )

    const element = container.firstElementChild as HTMLElement

    expect(element.style.flexDirection).toBe('column-reverse')
    expect(element.style.display).toBe('inline-flex')
    expect(element.style.flex).toMatch(/^2/)
  })

  it('renders a custom element and forwards props', () => {
    const ref = createRef<HTMLElement>()

    const { getByRole } = render(
      <Flex element='nav' ref={ref} aria-label='Main navigation'>
        <a href='#'>link</a>
      </Flex>,
    )

    expect(getByRole('navigation')).toBeInTheDocument()
    expect(ref.current?.tagName).toBe('NAV')
  })

  it('accepts a style override', () => {
    const { container } = render(<Flex gap={8} style={{ gap: '32px' }} />)
    const element = container.firstElementChild as HTMLElement

    expect(element.style.gap).toBe('32px')
  })
})
