import { Suspense } from "react"
import { searchMovies } from "@/lib/api"
import MovieGrid from "@/components/movie-grid"
import Pagination from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: { q?: string; page?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const currentPage = Number(searchParams.page) || 1

  let moviesData = { results: [], total_pages: 0, total_results: 0, page: 1 }

  if (query) {
    moviesData = await searchMovies(query, currentPage)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-orbitron text-3xl font-bold gradient-text">
        {query ? `Resultados para "${query}"` : "Buscar Filmes"}
      </h1>

      {query ? (
        <>
          <p className="mb-6 text-gray-400">{moviesData.total_results} resultados encontrados</p>

          <Suspense fallback={<MovieGridSkeleton />}>
            <MovieGrid movies={moviesData.results} />
          </Suspense>

          {moviesData.total_pages > 1 && <Pagination currentPage={currentPage} totalPages={moviesData.total_pages} />}
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-xl text-gray-400">Digite algo na barra de pesquisa para buscar filmes.</p>
        </div>
      )}
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
