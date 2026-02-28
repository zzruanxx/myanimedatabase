import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-9xl mb-4">🌸</div>
      <h1 className="text-6xl font-black text-anime-purple mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The anime you're looking for doesn't exist in our database... yet. Try searching for something else!
      </p>
      <div className="flex gap-4">
        <button onClick={() => navigate('/')} className="btn-primary">
          🏠 Go Home
        </button>
        <button onClick={() => navigate(-1)} className="btn-secondary">
          ← Go Back
        </button>
      </div>
    </div>
  )
}
