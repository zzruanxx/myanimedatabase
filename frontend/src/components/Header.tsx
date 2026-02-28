import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="bg-anime-card border-b border-anime-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-anime-purple whitespace-nowrap">
          🌸 MAD
        </Link>
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full bg-anime-dark border border-anime-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-anime-purple"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-anime-purple hover:text-white transition-colors"
            >
              🔍
            </button>
          </div>
        </form>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-anime-pink transition-colors">Home</Link>
          <Link to="/search?q=action" className="text-gray-300 hover:text-anime-pink transition-colors">Browse</Link>
        </nav>
      </div>
    </header>
  )
}
