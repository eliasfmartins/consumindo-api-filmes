"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Movie } from "@/lib/api"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })

      setTimeout(checkScrollButtons, 500)
    }
  }

  return (
    <div className="relative w-full py-4">
      <div className="flex items-center justify-between mb-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-orbitron text-xl font-bold md:text-2xl gradient-text"
        >
          {title}
        </motion.h2>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-purple-700 bg-black/50 text-purple-400 hover:bg-purple-950/50 hover:text-purple-300 disabled:opacity-50"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-purple-700 bg-black/50 text-purple-400 hover:bg-purple-950/50 hover:text-purple-300 disabled:opacity-50"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="carousel-container flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          onScroll={checkScrollButtons}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[180px] flex-shrink-0 sm:w-[200px] md:w-[220px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCarousel
