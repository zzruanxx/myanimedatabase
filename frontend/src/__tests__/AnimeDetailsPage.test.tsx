import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import AnimeDetailsPage from '../pages/AnimeDetailsPage'

vi.mock('../api/animeApi', () => ({
  getAnimeById: vi.fn().mockResolvedValue({
    data: {
      mal_id: 1,
      title: 'Attack on Titan',
      synopsis: 'Humanity fights titans.',
      score: 9.0,
      type: 'TV',
      episodes: 25,
      images: { jpg: { image_url: 'http://example.com/aot.jpg', large_image_url: 'http://example.com/aot-large.jpg' } },
      genres: [{ mal_id: 1, name: 'Action' }],
      studios: [{ mal_id: 1, name: 'MAPPA' }],
    },
  }),
  getAnimeCharacters: vi.fn().mockResolvedValue({ data: [] }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('AnimeDetailsPage', () => {
  it('renders anime details', async () => {
    render(
      <MemoryRouter initialEntries={['/anime/1']}>
        <Routes>
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText('Attack on Titan')).toBeInTheDocument())
    expect(screen.getByText(/Humanity fights titans/i)).toBeInTheDocument()
  })

  it('back button navigates away', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/anime/1']}>
        <Routes>
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => screen.getByText('Attack on Titan'))
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
