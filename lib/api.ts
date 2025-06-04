// API constants
const API_KEY = "17cee563809b303918f439483a696deb"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Image sizes
export const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w300",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
}

// Types
export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  popularity: number
  vote_count: number
  adult: boolean
  original_language: string
  original_title: string
  video: boolean
}

export interface MovieDetails extends Movie {
  budget: number
  genres: { id: number; name: string }[]
  homepage: string | null
  imdb_id: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  revenue: number
  runtime: number | null
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
}

export interface Actor {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id?: number
  character?: string
  credit_id: string
  order?: number
}

export interface ActorDetails {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string | null
  known_for_department: string
  name: string
  place_of_birth: string | null
  popularity: number
  profile_path: string | null
}

export interface ActorMovieCredits {
  cast: {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    character: string
    credit_id: string
    order: number
  }[]
  crew: {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    credit_id: string
    department: string
    job: string
  }[]
  id: number
}

export interface MovieCredits {
  id: number
  cast: Actor[]
  crew: {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string
  }[]
}

export interface Genre {
  id: number
  name: string
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// Helper function to build image URLs
export const getImageUrl = (path: string | null, size: string): string => {
  if (!path) return "/placeholder.svg?height=300&width=200"
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// API functions
export async function getTopRatedMovies(page = 1): Promise<MoviesResponse> {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=${page}`)

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies")
  }

  return response.json()
}

export async function getTrendingMovies(): Promise<MoviesResponse> {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  return response.json()
}

export async function getMoviesByCategory(genreId: number, page = 1): Promise<MoviesResponse> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movies by category")
  }

  return response.json()
}

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  return response.json()
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch genres")
  }

  return response.json()
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  return response.json()
}

export async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits")
  }

  return response.json()
}

export async function getSimilarMovies(movieId: number): Promise<MoviesResponse> {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=pt-BR&page=1`)

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies")
  }

  return response.json()
}

export async function getActorDetails(actorId: number): Promise<ActorDetails> {
  const response = await fetch(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch actor details")
  }

  return response.json()
}

export async function getActorMovieCredits(actorId: number): Promise<ActorMovieCredits> {
  const response = await fetch(`${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=pt-BR`)

  if (!response.ok) {
    throw new Error("Failed to fetch actor movie credits")
  }

  return response.json()
}
