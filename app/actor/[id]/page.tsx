"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowLeft, Film, Star } from "lucide-react"
import {
  getActorDetails,
  getActorMovieCredits,
  getImageUrl,
  IMAGE_SIZES,
  type ActorDetails,
  type ActorMovieCredits,
} from "@/lib/api"
import { formatDate, formatVoteAverage } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import MovieCard from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ActorPageProps {
  params: { id: string }
}

function ActorPageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 xl:col-span-3">
                <Skeleton className="w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4] rounded-xl" />
              </div>
              <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ActorPage({ params }: ActorPageProps) {
  const [actorDetails, setActorDetails] = useState<ActorDetails | null>(null)
  const [movieCredits, setMovieCredits] = useState<ActorMovieCredits | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    const fetchData = async () => {
      const actorId = Number.parseInt(params.id)

      if (isNaN(actorId)) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const [actorData, creditsData] = await Promise.all([getActorDetails(actorId), getActorMovieCredits(actorId)])

        setActorDetails(actorData)
        setMovieCredits(creditsData)
      } catch (error) {
        console.error("Error fetching actor details:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return <ActorPageSkeleton />
  }

  if (error || !actorDetails || !movieCredits) {
    notFound()
    return null
  }

  // Sort movies by popularity and release date
  const sortedMovies = movieCredits.cast
    .filter((movie) => movie.poster_path && movie.release_date)
    .sort((a, b) => {
      if (b.vote_average !== a.vote_average) {
        return b.vote_average - a.vote_average
      }
      return b.popularity - a.popularity
    })

  const topMovies = sortedMovies.slice(0, 12)
  const recentMovies = sortedMovies.filter((movie) => new Date(movie.release_date) > new Date("2015-01-01")).slice(0, 8)

  // Construir URL da imagem do ator diretamente
  const actorImageUrl = actorDetails.profile_path
    ? `https://image.tmdb.org/t/p/w300${actorDetails.profile_path}`
    : "/placeholder.svg?height=400&width=300"

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full screen with centered content */}
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Actor Photo - Retangular */}
              <div className="lg:col-span-4 xl:col-span-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-400/30 rounded-xl blur-2xl" />
                  <div className="relative bg-gray-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                    <img
                      src={actorImageUrl || "/placeholder.svg"}
                      alt={actorDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Actor Info */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    {actorDetails.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6 text-sm sm:text-base">
                    {actorDetails.birthday && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        <span>{formatDate(actorDetails.birthday)}</span>
                      </div>
                    )}

                    {actorDetails.place_of_birth && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        <span className="line-clamp-1">{actorDetails.place_of_birth}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Film className="h-4 w-4 text-cyan-400" />
                      <span>{movieCredits.cast.length} filmes</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-cyan-400 mb-2">Conhecido por</h3>
                    <p className="text-sm sm:text-base text-gray-300">{actorDetails.known_for_department}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Biography */}
        {actorDetails.biography && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-gray-900/40 backdrop-blur-sm border-white/10 rounded-2xl">
              <CardContent className="p-6 sm:p-8">
                <h2 className="font-orbitron text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                  Biografia
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                  {actorDetails.biography}
                </p>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Top Movies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            Melhores Filmes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {topMovies.map((movie) => (
              <div key={movie.id} className="space-y-3">
                <Link
                  href={`/movie/${movie.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="block group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-900/20 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Image
                      src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium) || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 180px, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white">{formatVoteAverage(movie.vote_average)}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-2">{movie.title}</h3>
                      <p className="text-cyan-400 text-xs mt-1 line-clamp-1">{movie.character}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recent Movies */}
        {recentMovies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="font-orbitron text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Trabalhos Recentes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {recentMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} variant="compact" />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
