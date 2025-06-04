"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { type Genre, getGenres } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selectedGenreId?: number
}

const CategoryFilter = ({ selectedGenreId }: CategoryFilterProps) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres()
        setGenres(data.genres)
      } catch (error) {
        console.error("Failed to fetch genres:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGenres()
  }, [])

  const handleGenreClick = (genreId: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("genre", genreId.toString())
    params.set("page", "1")
    router.push(`/categories?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto py-4 scrollbar-hide">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="mr-2 h-10 w-24 animate-pulse rounded-full bg-gray-800" />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex overflow-x-auto py-4 scrollbar-hide"
    >
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant="outline"
          size="sm"
          className={cn(
            "mr-2 whitespace-nowrap rounded-full border-purple-700 bg-black/50 text-sm hover:bg-purple-950/50 hover:text-purple-300",
            genre.id === selectedGenreId ? "bg-purple-700 text-white hover:bg-purple-800" : "text-purple-400",
          )}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </Button>
      ))}
    </motion.div>
  )
}

export default CategoryFilter
