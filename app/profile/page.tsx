"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { User, Mail, LogOut, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser, removeUser, getFavorites } from "@/lib/utils"
import { getTopRatedMovies } from "@/lib/api"
import MovieCard from "@/components/movie-card"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = getUser()

    if (!userData) {
      router.push("/login")
      return
    }

    setUser(userData)

    // Fetch favorite movies
    const fetchFavorites = async () => {
      try {
        const favorites = getFavorites()
        if (favorites.length > 0) {
          // In a real app, we would fetch each movie by ID
          // For demo purposes, we'll just get top rated and filter
          const response = await getTopRatedMovies()
          const movies = response.results.filter((movie) => favorites.includes(movie.id))
          setFavoriteMovies(movies)
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [router])

  const handleLogout = () => {
    removeUser()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 font-orbitron text-3xl font-bold gradient-text"
      >
        Meu Perfil
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          <Card className="border-purple-900/30 bg-black/60 backdrop-blur-sm">
            <CardHeader className="flex flex-col items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full neon-card">
                <Image
                  src={user.avatar || "/placeholder.svg?height=200&width=200"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                {user.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Membro desde</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Filmes favoritos</span>
                  <span>{favoriteMovies.length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2"
        >
          <Tabs defaultValue="favorites">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="favorites">
                <Film className="mr-2 h-4 w-4" />
                Favoritos
              </TabsTrigger>
              <TabsTrigger value="settings">
                <User className="mr-2 h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="mt-4">
              <Card className="border-purple-900/30 bg-black/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Filmes Favoritos</CardTitle>
                  <CardDescription>Filmes que você marcou como favorito</CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteMovies.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {favoriteMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-400">Você ainda não tem filmes favoritos.</p>
                      <Button asChild className="mt-4">
                        <a href="/">Explorar filmes</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card className="border-purple-900/30 bg-black/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>Gerencie suas preferências e informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Configurações não disponíveis nesta versão de demonstração.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
