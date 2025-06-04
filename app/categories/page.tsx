import { Suspense } from "react"
import { getGenres, getMoviesByCategory, getTopRatedMovies } from "@/lib/api"
import CategoryFilter from "@/components/category-filter"
import MovieGrid from "@/components/movie-grid"
import Pagination from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoriesPageProps {
  searchParams: { genre?: string; page?: string }
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const genreId = searchParams.genre ? Number.parseInt(searchParams.genre) : undefined
  const currentPage = Number(searchParams.page) || 1

  // Fetch genres to get the name of the selected genre
  const genresData = await getGenres()

  // Fetch movies based on selected genre or default to top rated if no genre selected
  const moviesData = genreId ? await getMoviesByCategory(genreId, currentPage) : await getTopRatedMovies(currentPage)

  // Get the name of the selected genre
  const selectedGenre = genreId ? genresData.genres.find((genre) => genre.id === genreId) : undefined

  const title = selectedGenre ? `Filmes de ${selectedGenre.name}` : "Todos os Filmes"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-orbitron text-3xl font-bold gradient-text">Categorias</h1>

      <Suspense fallback={<CategoryFilterSkeleton />}>
        <CategoryFilter selectedGenreId={genreId} />
      </Suspense>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid movies={moviesData.results} title={title} />
      </Suspense>

      <Pagination currentPage={currentPage} totalPages={moviesData.total_pages} />
    </div>
  )
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex overflow-x-auto py-4">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="mr-2 h-8 w-24 rounded-full" />
      ))}
    </div>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="py-4">
      <Skeleton className="mb-6 h-8 w-64" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
