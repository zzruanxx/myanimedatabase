import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import { getAnimeById, getAnimeCharacters } from '../api/animeApi'
import type { Anime, Character } from '../types/anime'

export default function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const animeId = parseInt(id)
    setLoading(true)
    setError(null)
    Promise.all([
      getAnimeById(animeId),
      getAnimeCharacters(animeId).catch(() => ({ data: [] })),
    ])
      .then(([animeRes, charRes]) => {
        setAnime(animeRes.data)
        setCharacters((charRes.data as Character[]).slice(0, 12))
      })
      .catch(() => setError('Failed to load anime details.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} onRetry={() => navigate(0)} />
  if (!anime) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-anime-purple hover:text-white transition-colors mb-6 flex items-center gap-2"
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full rounded-xl shadow-2xl"
          />
          {/* Meta */}
          <div className="glass-card p-4 mt-4 space-y-2 text-sm">
            {anime.score && (
              <div className="flex justify-between">
                <span className="text-gray-400">Score</span>
                <span className="text-anime-green font-bold">⭐ {anime.score}</span>
              </div>
            )}
            {anime.type && (
              <div className="flex justify-between">
                <span className="text-gray-400">Type</span>
                <span className="text-white">{anime.type}</span>
              </div>
            )}
            {anime.episodes && (
              <div className="flex justify-between">
                <span className="text-gray-400">Episodes</span>
                <span className="text-white">{anime.episodes}</span>
              </div>
            )}
            {anime.status && (
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-white">{anime.status}</span>
              </div>
            )}
            {anime.year && (
              <div className="flex justify-between">
                <span className="text-gray-400">Year</span>
                <span className="text-white">{anime.year}</span>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{anime.title}</h1>
          {anime.title_english && anime.title_english !== anime.title && (
            <p className="text-anime-pink text-lg mb-4">{anime.title_english}</p>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map(g => (
                <button
                  key={g.mal_id}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(g.name)}`)}
                  className="bg-anime-purple/30 text-anime-purple hover:bg-anime-purple hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}

          {/* Synopsis */}
          {anime.synopsis && (
            <div className="glass-card p-4 mb-6">
              <h2 className="text-xl font-bold mb-2 text-anime-pink">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
            </div>
          )}

          {/* Studios */}
          {anime.studios && anime.studios.length > 0 && (
            <p className="text-gray-400 text-sm mb-6">
              Studio: <span className="text-white">{anime.studios.map(s => s.name).join(', ')}</span>
            </p>
          )}

          {/* Characters */}
          {characters.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-anime-pink">Characters</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {characters.map(c => (
                  <div key={c.character.mal_id} className="glass-card overflow-hidden text-center">
                    <img
                      src={c.character.images.jpg.image_url}
                      alt={c.character.name}
                      className="w-full aspect-square object-cover"
                    />
                    <p className="text-xs p-1 text-gray-300 line-clamp-2">{c.character.name}</p>
                    <p className="text-xs pb-1 text-anime-purple">{c.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
