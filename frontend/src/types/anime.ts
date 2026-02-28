export interface Anime {
  mal_id: number
  title: string
  title_english?: string
  synopsis?: string
  score?: number
  episodes?: number
  status?: string
  type?: string
  year?: number
  images: {
    jpg: {
      image_url: string
      large_image_url?: string
    }
  }
  genres?: Array<{ mal_id: number; name: string }>
  studios?: Array<{ mal_id: number; name: string }>
  rating?: string
  duration?: string
  aired?: {
    string?: string
  }
}

export interface Character {
  character: {
    mal_id: number
    name: string
    images: {
      jpg: {
        image_url: string
      }
    }
  }
  role: string
}

export interface ApiResponse<T> {
  data: T
  pagination?: {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
  }
}
