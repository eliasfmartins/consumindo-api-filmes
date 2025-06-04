"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Info } from "lucide-react"
import { type Movie, getImageUrl, IMAGE_SIZES } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { formatVoteAverage, formatDate } from "@/lib/utils"

interface HeroCarouselProps {
  movies: Movie[]
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentMovie = movies[currentIndex]

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }, [movies.length])

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }, [movies.length])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, movies.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrevious])

  if (!currentMovie) return null

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="relative h-full w-full">
            <Image
              src={getImageUrl(currentMovie.backdrop_path, IMAGE_SIZES.backdrop.original) || "/placeholder.svg"}
              alt={currentMovie.title}
              fill
              priority
              className="object-cover"
            />

            {/* Responsive Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 md:via-black/60 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
                {/* Movie Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-8 xl:col-span-7 space-y-4 sm:space-y-6 z-10"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm font-medium text-white">
                          {formatVoteAverage(currentMovie.vote_average)}
                        </span>
                      </div>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white"
                    >
                      {currentMovie.title}
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center space-x-4 sm:space-x-6 text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      <span className="text-sm sm:text-base lg:text-lg">{formatDate(currentMovie.release_date)}</span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-2xl"
                  >
                    {currentMovie.overview}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg transition-all duration-300"
                    >
                      <Link href={`/movie/${currentMovie.id}`}>
                        <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Assistir Agora
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white/30 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl text-white hover:text-white transition-all duration-300"
                    >
                      <Link href={`/movie/${currentMovie.id}`}>
                        <Info className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Mais Detalhes
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Movie Poster - Responsive scaling */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hidden lg:block lg:col-span-4 xl:col-span-5"
                >
                  <div className="relative w-full max-w-xs xl:max-w-md mx-auto">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={getImageUrl(currentMovie.poster_path, IMAGE_SIZES.poster.large) || "/placeholder.svg"}
                        alt={currentMovie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 0px, (max-width: 1280px) 300px, 400px"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Enhanced visibility */}
      {movies.length > 1 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/70 backdrop-blur-md hover:bg-black/90 border-2 border-white/20 hover:border-white/40 group transition-all duration-300 shadow-xl hover:shadow-2xl"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="sr-only">Anterior</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/70 backdrop-blur-md hover:bg-black/90 border-2 border-white/20 hover:border-white/40 group transition-all duration-300 shadow-xl hover:shadow-2xl"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="sr-only">Próximo</span>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default HeroCarousel
