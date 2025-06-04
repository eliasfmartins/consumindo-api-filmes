"use client"

import { motion } from "framer-motion"
import type { Movie } from "@/lib/api"
import MovieCard from "@/components/movie-card"

interface MovieGridProps {
  movies: Movie[]
  title?: string
}

const MovieGrid = ({ movies, title }: MovieGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (movies.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-400">Nenhum filme encontrado</h2>
        <p className="mt-2 text-gray-500">Tente ajustar seus filtros ou buscar por outro termo.</p>
      </div>
    )
  }

  return (
    <div className="py-4">
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-orbitron text-2xl font-bold gradient-text"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default MovieGrid
