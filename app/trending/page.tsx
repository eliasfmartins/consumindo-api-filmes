import { Suspense } from "react"
import { getTrendingMovies } from "@/lib/api"
import MovieGrid from "@/components/movie-grid"
import Pagination from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface TrendingPageProps {
  searchParams: { page?: string }
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const moviesData = await getTrendingMovies()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-orbitron text-3xl font-bold gradient-text">Filmes em Alta</h1>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid movies={moviesData.results} />
      </Suspense>

      <Pagination currentPage={currentPage} totalPages={moviesData.total_pages} />
    </div>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
