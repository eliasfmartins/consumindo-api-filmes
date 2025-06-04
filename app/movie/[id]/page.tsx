import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react"
import { getMovieDetails, getMovieCredits, getSimilarMovies, getImageUrl, IMAGE_SIZES } from "@/lib/api"
import { formatDate, formatRuntime, formatVoteAverage } from "@/lib/utils"
import MovieCarousel from "@/components/movie-carousel"
import { Skeleton } from "@/components/ui/skeleton"

interface MoviePageProps {
  params: { id: string }
}

async function MovieContent({ movieId }: { movieId: number }) {
  try {
    const [movieDetails, movieCredits, similarMovies] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getSimilarMovies(movieId),
    ])

    // Get top cast members
    const topCast = movieCredits.cast.slice(0, 8)

    // Get director
    const director = movieCredits.crew.find((person) => person.job === "Director")

    return (
      <>
        {/* Hero Section with Backdrop */}
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src={getImageUrl(movieDetails.backdrop_path, IMAGE_SIZES.backdrop.original) || "/placeholder.svg"}
            alt={movieDetails.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Movie Poster */}
                <div className="lg:col-span-4 xl:col-span-3">
                  <div className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-xl premium-card">
                    <Image
                      src={getImageUrl(movieDetails.poster_path, IMAGE_SIZES.poster.large) || "/placeholder.svg"}
                      alt={movieDetails.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
                    />
                  </div>
                </div>

                {/* Movie Details */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                  <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white gradient-text">
                    {movieDetails.title}
                  </h1>

                  {movieDetails.tagline && (
                    <p className="text-base sm:text-lg italic text-gray-400">"{movieDetails.tagline}"</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                      <span className="font-medium">
                        {formatVoteAverage(movieDetails.vote_average)} ({movieDetails.vote_count} votos)
                      </span>
                    </div>

                    {movieDetails.runtime && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <span>{formatRuntime(movieDetails.runtime)}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <span>{formatDate(movieDetails.release_date)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {movieDetails.genres.map((genre) => (
                      <Link
                        key={genre.id}
                        href={`/categories?genre=${genre.id}`}
                        className="rounded-full bg-purple-900/30 px-3 py-1 text-sm text-purple-200 hover:bg-purple-800/40 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Sinopse</h2>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {movieDetails.overview || "Sinopse não disponível."}
                    </p>
                  </div>

                  {director && (
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Diretor</h2>
                      <p className="text-sm sm:text-base text-gray-300">{director.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="mb-6 font-orbitron text-xl sm:text-2xl font-bold gradient-text">Elenco Principal</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {topCast.map((person) => (
              <Link key={person.id} href={`/actor/${person.id}`} className="flex flex-col items-center group">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full premium-card group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "/placeholder.svg?height=200&width=200"
                    }
                    alt={person.name}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 640px) 96px, 128px"
                  />
                </div>
                <h3 className="mt-2 text-center text-xs sm:text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {person.name}
                </h3>
                <p className="text-center text-xs text-gray-400 line-clamp-1">{person.character}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.results.length > 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Suspense fallback={<MovieCarouselSkeleton />}>
              <MovieCarousel title="Filmes Similares" movies={similarMovies.results} />
            </Suspense>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }
}

function MovieCarouselSkeleton() {
  return (
    <div className="w-full py-4">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-[180px] aspect-[2/3] rounded-lg flex-shrink-0" />
        ))}
      </div>
    </div>
  )
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = Number.parseInt(params.id)

  if (isNaN(movieId)) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          </div>
        }
      >
        <MovieContent movieId={movieId} />
      </Suspense>
    </div>
  )
}
