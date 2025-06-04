"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Heart, Play, Calendar, TrendingUp } from "lucide-react"
import { type Movie, getImageUrl, IMAGE_SIZES } from "@/lib/api"
import { formatDate, formatVoteAverage, isFavorite, addFavorite, removeFavorite } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  movie: Movie
  priority?: boolean
  variant?: "default" | "featured" | "compact"
}

const MovieCard = ({ movie, priority = false, variant = "default" }: MovieCardProps) => {
  const [isFav, setIsFav] = useState(isFavorite(movie.id))
  const [isHovered, setIsHovered] = useState(false)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFav) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }

    setIsFav(!isFav)
  }

  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`} onClick={handleNavigation} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-purple-500/20 transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
          {/* Movie Poster */}
          <Image
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium) || "/placeholder.svg"}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={priority}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 z-10"
          >
            <div className="flex items-center space-x-1 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 border border-purple-500/30">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-white">{formatVoteAverage(movie.vote_average)}</span>
            </div>
          </motion.div>

          {/* Trending Badge */}
          {movie.popularity > 100 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3 z-10"
            >
              <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full px-3 py-1 border border-cyan-400/30">
                <TrendingUp className="h-3 w-3 text-white" />
                <span className="text-xs font-bold text-white">HOT</span>
              </div>
            </motion.div>
          )}

          {/* Content Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 space-y-3"
          >
            <div className="space-y-2">
              <h3 className="font-orbitron text-lg font-bold text-white line-clamp-2 leading-tight">{movie.title}</h3>

              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Calendar className="h-3 w-3 text-cyan-400" />
                <span>{formatDate(movie.release_date)}</span>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-xs px-4 py-2 h-8 rounded-lg"
              >
                <Play className="mr-2 h-3 w-3" />
                Assistir
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full backdrop-blur-sm border",
                  isFav
                    ? "text-red-500 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                    : "text-white bg-black/40 hover:bg-white/20 hover:text-red-500 border-white/20",
                )}
                onClick={handleFavoriteToggle}
              >
                <Heart className={cn("h-4 w-4", isFav ? "fill-current" : "")} />
                <span className="sr-only">{isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
              </Button>
            </div>
          </motion.div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard
