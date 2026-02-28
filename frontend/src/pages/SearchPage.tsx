import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import AnimeCard from '../components/AnimeCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import { searchAnime } from '../api/animeApi'
import type { Anime } from '../types/anime'

const TYPES = ['', 'tv', 'movie', 'ova', 'special', 'ona', 'music']
const GENRES = [
  { id: '', name: 'All Genres' },
  { id: '1', name: 'Action' },
  { id: '2', name: 'Adventure' },
  { id: '4', name: 'Comedy' },
  { id: '8', name: 'Drama' },
  { id: '10', name: 'Fantasy' },
  { id: '22', name: 'Romance' },
  { id: '24', name: 'Sci-Fi' },
  { id: '37', name: 'Supernatural' },
]

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const genre = searchParams.get('genre') || ''
  const type = searchParams.get('type') || ''

  const [results, setResults] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)

  const doSearch = useCallback(() => {
    if (!query) return
    setLoading(true)
    setError(null)
    searchAnime(query, page, genre || undefined, type || undefined)
      .then(res => {
        setResults(res.data)
        setHasNextPage(res.pagination?.has_next_page ?? false)
      })
      .catch(() => setError('Failed to load search results. Please try again.'))
      .finally(() => setLoading(false))
  }, [query, page, genre, type])

  useEffect(() => {
    doSearch()
  }, [doSearch])

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.set('page', '1')
    setSearchParams(next)
  }

  const handleSearch = (q: string) => {
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar initialQuery={query} onSearch={handleSearch} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={type}
          onChange={e => updateFilter('type', e.target.value)}
          className="bg-anime-card border border-anime-border text-white rounded-lg px-3 py-2 focus:outline-none focus:border-anime-purple"
          aria-label="Filter by type"
        >
          {TYPES.map(t => (
            <option key={t} value={t}>{t ? t.toUpperCase() : 'All Types'}</option>
          ))}
        </select>
        <select
          value={genre}
          onChange={e => updateFilter('genre', e.target.value)}
          className="bg-anime-card border border-anime-border text-white rounded-lg px-3 py-2 focus:outline-none focus:border-anime-purple"
          aria-label="Filter by genre"
        >
          {GENRES.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      {query && (
        <h1 className="text-2xl font-bold mb-6">
          Results for <span className="text-anime-pink">"{query}"</span>
        </h1>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorState message={error} onRetry={doSearch} />}
      {!loading && !error && results.length === 0 && query && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p>No results found for "{query}"</p>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map(anime => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && results.length > 0 && (
        <div className="flex justify-center gap-4 mt-8">
          {page > 1 && (
            <button
              onClick={() => updateFilter('page', String(page - 1))}
              className="btn-primary"
            >
              ← Previous
            </button>
          )}
          <span className="text-gray-400 self-center">Page {page}</span>
          {hasNextPage && (
            <button
              onClick={() => updateFilter('page', String(page + 1))}
              className="btn-primary"
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
