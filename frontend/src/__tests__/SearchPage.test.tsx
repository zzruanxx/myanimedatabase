import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import SearchPage from '../pages/SearchPage'

const mockSearchAnime = vi.fn()
vi.mock('../api/animeApi', () => ({
  searchAnime: (...args: unknown[]) => mockSearchAnime(...args),
}))

const renderWithRouter = (query = 'naruto') => {
  return render(
    <MemoryRouter initialEntries={[`/search?q=${query}`]}>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('SearchPage', () => {
  it('shows loading state initially', () => {
    mockSearchAnime.mockReturnValue(new Promise(() => {}))
    renderWithRouter()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders search results', async () => {
    mockSearchAnime.mockResolvedValue({
      data: [
        {
          mal_id: 20,
          title: 'Naruto',
          images: { jpg: { image_url: 'http://example.com/naruto.jpg' } },
          type: 'TV',
          score: 8.0,
        },
      ],
      pagination: { has_next_page: false, current_page: 1, last_visible_page: 1 },
    })
    renderWithRouter()
    await waitFor(() => expect(screen.getByText('Naruto')).toBeInTheDocument())
  })

  it('shows error state on failure', async () => {
    mockSearchAnime.mockRejectedValue(new Error('Network error'))
    renderWithRouter()
    await waitFor(() => expect(screen.getByText(/Failed to load/i)).toBeInTheDocument())
  })
})
