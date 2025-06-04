import { Suspense } from "react"
import { getTopRatedMovies, getTrendingMovies } from "@/lib/api"
import HeroCarousel from "@/components/hero-carousel"
import MovieCarousel from "@/components/movie-carousel"
import { Skeleton } from "@/components/ui/skeleton"

export default async function Home() {
  const [trendingData, topRatedData] = await Promise.all([getTrendingMovies(), getTopRatedMovies()])

  const heroMovies = trendingData.results.slice(0, 5)
  const trendingMovies = trendingData.results
  const topRatedMovies = topRatedData.results

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-screen w-full bg-gray-900 animate-pulse" />}>
        <HeroCarousel movies={heroMovies} />
      </Suspense>

      <div className="max-content-width mx-auto px-4 py-12 w-full">
        <Suspense fallback={<CarouselSkeleton />}>
          <MovieCarousel title="Em Alta" movies={trendingMovies} />
        </Suspense>

        <Suspense fallback={<CarouselSkeleton />}>
          <MovieCarousel title="Mais Bem Avaliados" movies={topRatedMovies} />
        </Suspense>
      </div>
    </div>
  )
}

function CarouselSkeleton() {
  return (
    <div className="w-full py-4">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="flex space-x-4 overflow-hidden pb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[180px] flex-shrink-0 sm:w-[200px] md:w-[220px]">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
