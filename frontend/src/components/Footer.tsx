import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-anime-card border-t border-anime-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <Link to="/" className="text-2xl font-bold text-anime-purple">🌸 MyAnimeDatabase</Link>
        <p className="text-gray-500 mt-2 text-sm">Powered by Jikan API • Data from MyAnimeList</p>
        <p className="text-gray-600 text-xs mt-1">© 2024 MyAnimeDatabase. For educational purposes.</p>
      </div>
    </footer>
  )
}
