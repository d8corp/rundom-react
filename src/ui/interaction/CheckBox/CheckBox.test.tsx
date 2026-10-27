import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { CheckBox } from './CheckBox'

describe('CheckBox', () => {
  it('renders a native checkbox with a default state', () => {
    render(<CheckBox defaultChecked />)
    const input = screen.getByRole('checkbox')

    expect(input).toBeChecked()

    fireEvent.click(input)

    expect(input).not.toBeChecked()
  })

  it('reports changes', () => {
    const onChange = jest.fn()

    render(<CheckBox onChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('supports a controlled state', () => {
    function Form () {
      const [checked, setChecked] = useState(false)

      return <CheckBox checked={checked} onChange={setChecked} />
    }

    render(<Form />)
    const input = screen.getByRole('checkbox')

    expect(input).not.toBeChecked()
    fireEvent.click(input)
    expect(input).toBeChecked()
  })

  it('supports the indeterminate state', () => {
    render(<CheckBox checked={null} />)
    const input = screen.getByRole('checkbox') as HTMLInputElement

    expect(input.indeterminate).toBe(true)
    expect(input).not.toBeChecked()
  })

  it('does not change when disabled', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(<CheckBox disabled onChange={onChange} />)
    const input = screen.getByRole('checkbox')

    await user.click(input)

    expect(input).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
    expect(input).not.toBeChecked()
  })
})
