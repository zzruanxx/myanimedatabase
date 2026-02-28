import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  initialQuery?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ initialQuery = '', onSearch }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim())
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl" role="search">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for anime..."
        className="flex-1 bg-white/10 border border-anime-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-anime-purple text-lg"
        aria-label="Search anime"
      />
      <button type="submit" className="btn-primary text-lg px-8">
        Search
      </button>
    </form>
  )
}
