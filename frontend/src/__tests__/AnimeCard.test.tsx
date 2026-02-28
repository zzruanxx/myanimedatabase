import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AnimeCard from '../components/AnimeCard'
import type { Anime } from '../types/anime'

const mockAnime: Anime = {
  mal_id: 21,
  title: 'One Piece',
  images: { jpg: { image_url: 'http://example.com/op.jpg' } },
  score: 8.7,
  type: 'TV',
  year: 1999,
}

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

describe('AnimeCard', () => {
  it('renders anime title', () => {
    render(<MemoryRouter><AnimeCard anime={mockAnime} /></MemoryRouter>)
    expect(screen.getByText('One Piece')).toBeInTheDocument()
  })

  it('renders score', () => {
    render(<MemoryRouter><AnimeCard anime={mockAnime} /></MemoryRouter>)
    expect(screen.getByText(/8.7/)).toBeInTheDocument()
  })

  it('renders type badge', () => {
    render(<MemoryRouter><AnimeCard anime={mockAnime} /></MemoryRouter>)
    expect(screen.getByText('TV')).toBeInTheDocument()
  })

  it('clicking navigates to detail page', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AnimeCard anime={mockAnime} />
        <LocationDisplay />
      </MemoryRouter>
    )
    await user.click(screen.getByText('One Piece'))
    expect(screen.getByTestId('location').textContent).toBe('/anime/21')
  })
})
