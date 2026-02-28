export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-anime-purple border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading" />
    </div>
  )
}
