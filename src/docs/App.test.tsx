import { act, render, screen } from '@testing-library/react'

import { App } from './App'
import { navigate } from './router'

describe('docs App', () => {
  it('renders the home page', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Rundom React')
    expect(screen.getByRole('link', { name: /Rundom\s+React/i })).toBeInTheDocument()
  })

  it('navigates between documentation pages', () => {
    render(<App />)

    act(() => navigate('/quick-start'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Quick Start')

    act(() => navigate('/ui/forms'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Forms')

    act(() => navigate('/missing-page'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })
})
