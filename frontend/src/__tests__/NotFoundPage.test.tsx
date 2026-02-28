import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import NotFoundPage from '../pages/NotFoundPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('NotFoundPage', () => {
  it('renders 404 content', () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
  })

  it('Go Home button navigates to /', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
    await user.click(screen.getByText(/Go Home/i))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('Go Back button navigates back', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
    await user.click(screen.getByText(/Go Back/i))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
