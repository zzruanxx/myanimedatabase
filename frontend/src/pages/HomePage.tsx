import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimeCard from '../components/AnimeCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import { getTopAnime } from '../api/animeApi'
import type { Anime } from '../types/anime'

export default function HomePage() {
  const [featured, setFeatured] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getTopAnime()
      .then(res => setFeatured(res.data.slice(0, 12)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-anime-dark via-purple-950/30 to-anime-dark py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-anime-purple/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-anime-purple via-anime-pink to-anime-green bg-clip-text text-transparent">
            MyAnimeDatabase
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate anime consultation portal. Discover, explore, and dive deep into the world of anime.
          </p>
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/search?q=action')}
              className="btn-primary"
            >
              Browse Action
            </button>
            <button
              onClick={() => navigate('/search?q=romance')}
              className="btn-secondary"
            >
              Explore Romance
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white">
          🏆 Top Anime
        </h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featured.map(anime => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-anime-purple/20 to-anime-pink/20 border-y border-white/5 py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
        <p className="text-gray-400 mb-6">Search thousands of anime titles, read synopses, check scores and more.</p>
        <button
          onClick={() => navigate('/search?q=fantasy')}
          className="btn-primary text-lg px-12 py-3"
        >
          Start Exploring
        </button>
      </section>
    </div>
  )
}
