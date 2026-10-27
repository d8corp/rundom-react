import { act, fireEvent, render, screen } from '@testing-library/react'

import { Input } from './Input'

describe('Input', () => {
  it('works as an uncontrolled input', () => {
    render(<Input placeholder='Name' defaultValue='Ann' />)
    const input = screen.getByPlaceholderText('Name')

    expect(input).toHaveValue('Ann')

    fireEvent.change(input, { target: { value: 'Bob' } })

    expect(input).toHaveValue('Bob')
  })

  it('works as a controlled input', () => {
    const onChange = jest.fn()

    render(<Input value='Ann' onChange={onChange} aria-label='Name' />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Bob' } })

    expect(onChange).toHaveBeenCalledWith('Bob')
    expect(input).toHaveValue('Ann')
  })

  it('clears the value with the clear button', () => {
    const onChange = jest.fn()

    render(<Input defaultValue='Hello' clearable onChange={onChange} aria-label='Message' />)
    const input = screen.getByRole('textbox')

    fireEvent.click(screen.getByLabelText('Clear'))

    expect(onChange).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })

  it('does not show the clear button for an empty value', () => {
    render(<Input clearable aria-label='Message' />)

    expect(screen.queryByLabelText('Clear')).toBeNull()
  })

  it('debounces onChange', () => {
    jest.useFakeTimers()

    const onChange = jest.fn()

    render(<Input debounce onChange={onChange} aria-label='Search' />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })

    expect(onChange).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('ab')

    jest.useRealTimers()
  })

  it('renders prefix and suffix nodes', () => {
    render(
      <Input aria-label='Price' before={<span>from</span>} after={<span>USD</span>} />,
    )

    expect(screen.getByText('from')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })
})
