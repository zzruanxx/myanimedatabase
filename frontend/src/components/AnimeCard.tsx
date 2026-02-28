import { Link } from 'react-router-dom'
import type { Anime } from '../types/anime'

interface Props {
  anime: Anime
}

export default function AnimeCard({ anime }: Props) {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="glass-card overflow-hidden hover:border-anime-purple transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 block"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {anime.score && (
          <div className="absolute top-2 right-2 bg-black/70 text-anime-green text-xs font-bold px-2 py-1 rounded-full">
            ⭐ {anime.score}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm line-clamp-2 leading-tight">{anime.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          {anime.type && <span className="bg-anime-purple/30 text-anime-purple px-2 py-0.5 rounded">{anime.type}</span>}
          {anime.year && <span>{anime.year}</span>}
        </div>
      </div>
    </Link>
  )
}
