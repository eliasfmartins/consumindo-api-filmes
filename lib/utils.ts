import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to Brazilian format (DD/MM/YYYY)
export function formatDate(dateString: string): string {
  if (!dateString) return "Data desconhecida"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

// Format runtime to hours and minutes
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return "Duração desconhecida"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}min`
  }

  return `${hours}h ${remainingMinutes}min`
}

// Format vote average to display with one decimal place
export function formatVoteAverage(vote: number): string {
  return vote.toFixed(1)
}

// Local storage functions for user favorites
export function getFavorites(): number[] {
  if (typeof window === "undefined") return []

  const favorites = localStorage.getItem("favorites")
  return favorites ? JSON.parse(favorites) : []
}

export function addFavorite(movieId: number): void {
  if (typeof window === "undefined") return

  const favorites = getFavorites()
  if (!favorites.includes(movieId)) {
    favorites.push(movieId)
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
}

export function removeFavorite(movieId: number): void {
  if (typeof window === "undefined") return

  const favorites = getFavorites()
  const updatedFavorites = favorites.filter((id) => id !== movieId)
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}

export function isFavorite(movieId: number): boolean {
  if (typeof window === "undefined") return false

  const favorites = getFavorites()
  return favorites.includes(movieId)
}

// Get user from local storage
export function getUser() {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// Set user in local storage
export function setUser(user: any) {
  if (typeof window === "undefined") return

  localStorage.setItem("user", JSON.stringify(user))
}

// Remove user from local storage
export function removeUser() {
  if (typeof window === "undefined") return

  localStorage.removeItem("user")
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false

  return !!getUser()
}
