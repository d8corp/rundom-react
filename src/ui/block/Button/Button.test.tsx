import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('renders children and calls onClick', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Save</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn()

    render(<Button disabled onClick={onClick}>Save</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders an anchor when element is a', () => {
    render(<Button element='a' href='/quick-start'>Get started</Button>)

    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/quick-start')
  })

  it('shows a spinner while an async onClick is pending', async () => {
    let resolve!: () => void
    const promise = new Promise<void>((done) => { resolve = done })
    const { container } = render(<Button onClick={() => promise}>Save</Button>)

    expect(container.querySelector('svg')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()

    await act(async () => {
      resolve()
      await promise
    })

    await waitFor(() => expect(container.querySelector('svg')).toBeNull())
    expect(screen.getByRole('button', { name: 'Save' })).not.toBeDisabled()
  })

  it('shows a spinner when loading is controlled', () => {
    const { container } = render(<Button loading>Save</Button>)

    expect(container.querySelector('svg')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('prevents navigation for a disabled anchor', () => {
    const onClick = jest.fn()

    render(<Button element='a' href='/x' disabled onClick={onClick}>Link</Button>)
    fireEvent.click(screen.getByRole('link', { name: 'Link' }))

    expect(onClick).not.toHaveBeenCalled()
  })
})
