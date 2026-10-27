import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { RadioBox } from './RadioBox'

describe('RadioBox', () => {
  it('renders a native radio input', () => {
    render(<RadioBox name='plan' defaultChecked aria-label='Pro' />)

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked()
  })

  it('works as a controlled group', () => {
    function Group () {
      const [value, setValue] = useState('free')

      return (
        <>
          <RadioBox name='plan' value='free' checked={value === 'free'} onChange={() => setValue('free')} aria-label='Free' />
          <RadioBox name='plan' value='pro' checked={value === 'pro'} onChange={() => setValue('pro')} aria-label='Pro' />
        </>
      )
    }

    render(<Group />)
    const free = screen.getByRole('radio', { name: 'Free' })
    const pro = screen.getByRole('radio', { name: 'Pro' })

    expect(free).toBeChecked()
    expect(pro).not.toBeChecked()

    fireEvent.click(pro)

    expect(pro).toBeChecked()
    expect(free).not.toBeChecked()
  })

  it('does not change when disabled', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(<RadioBox name='plan' disabled onChange={onChange} aria-label='Disabled' />)
    const input = screen.getByRole('radio', { name: 'Disabled' })

    await user.click(input)

    expect(input).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
    expect(input).not.toBeChecked()
  })
})
