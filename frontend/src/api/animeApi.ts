import axios from 'axios'
import type { Anime, Character, ApiResponse } from '../types/anime'

const api = axios.create({
  baseURL: '/api',
})

export const searchAnime = async (
  query: string,
  page = 1,
  genre?: string,
  type?: string
): Promise<ApiResponse<Anime[]>> => {
  const params: Record<string, string | number> = { q: query, page }
  if (genre) params.genre = genre
  if (type) params.type = type
  const res = await api.get('/anime/search', { params })
  return res.data
}

export const getTopAnime = async (): Promise<ApiResponse<Anime[]>> => {
  const res = await api.get('/anime/top')
  return res.data
}

export const getAnimeById = async (id: number): Promise<ApiResponse<Anime>> => {
  const res = await api.get(`/anime/${id}`)
  return res.data
}

export const getAnimeCharacters = async (id: number): Promise<ApiResponse<Character[]>> => {
  const res = await api.get(`/anime/${id}/characters`)
  return res.data
}
