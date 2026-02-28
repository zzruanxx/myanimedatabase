import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import HomePage from '../pages/HomePage'

vi.mock('../api/animeApi', () => ({
  getTopAnime: vi.fn().mockResolvedValue({
    data: [
      {
        mal_id: 1,
        title: 'Test Anime',
        images: { jpg: { image_url: 'http://example.com/img.jpg' } },
        score: 9.0,
        type: 'TV',
      },
    ],
  }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders hero title', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByText('MyAnimeDatabase')).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('navigates on Browse Action click', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    await user.click(screen.getByText('Browse Action'))
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=action')
  })

  it('navigates on Start Exploring click', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    await user.click(screen.getByText('Start Exploring'))
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=fantasy')
  })
})
