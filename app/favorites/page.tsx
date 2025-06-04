"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUser, getFavorites } from "@/lib/utils"
import { getTopRatedMovies } from "@/lib/api"
import MovieGrid from "@/components/movie-grid"

export default function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = getUser()

    if (!userData) {
      router.push("/login")
      return
    }

    // Fetch favorite movies
    const fetchFavorites = async () => {
      try {
        const favorites = getFavorites()
        if (favorites.length > 0) {
          // In a real app, we would fetch each movie by ID
          // For demo purposes, we'll just get top rated and filter
          const response = await getTopRatedMovies()
          const movies = response.results.filter((movie) => favorites.includes(movie.id))
          setFavoriteMovies(movies)
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center"
      >
        <Heart className="mr-3 h-6 w-6 text-red-500" />
        <h1 className="font-orbitron text-3xl font-bold gradient-text">Meus Favoritos</h1>
      </motion.div>

      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <Heart className="h-16 w-16 text-gray-600" />
          <h2 className="mt-6 text-2xl font-semibold text-gray-400">Você ainda não tem filmes favoritos</h2>
          <p className="mt-2 max-w-md text-gray-500">
            Explore filmes e clique no ícone de coração para adicioná-los aos seus favoritos.
          </p>
          <Button
            className="mt-6 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            onClick={() => router.push("/")}
          >
            Explorar Filmes
          </Button>
        </motion.div>
      )}
    </div>
  )
}
