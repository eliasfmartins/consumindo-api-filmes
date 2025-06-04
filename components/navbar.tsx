"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Film, TrendingUp, Grid3X3, User, Star, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { isLoggedIn, getUser, removeUser } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setUserLoggedIn(isLoggedIn())
    setUserData(getUser())

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    removeUser()
    setUserLoggedIn(false)
    setUserData(null)
    router.push("/")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Início", href: "/", icon: <Film className="mr-2 h-4 w-4" /> },
    { name: "Em Alta", href: "/trending", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
    { name: "Categorias", href: "/categories", icon: <Grid3X3 className="mr-2 h-4 w-4" /> },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-black/20 backdrop-blur-md border-b border-white/10" : "bg-black/10 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg">
                <Film className="h-5 w-5 text-white" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CineVerse
              </span>
              <span className="text-xs text-cyan-400/70 font-mono tracking-wider">v2.0</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative group",
                    pathname === item.href
                      ? "text-cyan-400 bg-white/10"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-white/5",
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    {item.icon}
                    {item.name}
                  </span>

                  {/* Active Indicator */}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Search and User Section */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearch}
              className="relative group"
            >
              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="Buscar filmes..."
                  className="w-[240px] bg-white/10 border-white/20 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 backdrop-blur-sm pl-9 rounded-lg text-white placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 h-7 w-7 hover:bg-cyan-500/20 rounded-md"
                >
                  <Search className="h-3 w-3" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </motion.form>

            {userLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full group">
                      <Avatar className="border border-white/20 group-hover:border-cyan-400 transition-colors duration-300">
                        <AvatarImage src={userData?.avatar || ""} alt={userData?.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white text-sm">
                          {userData?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/10">
                    <DropdownMenuLabel className="text-cyan-400">Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => handleNavigation("/profile")}
                      className="hover:bg-white/10 cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNavigation("/favorites")}
                      className="hover:bg-white/10 cursor-pointer"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Favoritos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-red-600/20 text-red-400 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={() => handleNavigation("/login")}
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 group rounded-lg px-4 py-2 text-sm"
                >
                  <span className="relative z-10">Entrar</span>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group rounded-lg h-8 w-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-3 pb-3 space-y-3 bg-black/80 backdrop-blur-xl rounded-lg p-4 border border-white/10"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center">
                  <Input
                    type="search"
                    placeholder="Buscar filmes..."
                    className="w-full bg-white/10 border-white/20 pl-9 rounded-lg text-white placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                  <Button type="submit" size="icon" variant="ghost" className="absolute right-1 h-7 w-7 rounded-md">
                    <Search className="h-3 w-3" />
                    <span className="sr-only">Buscar</span>
                  </Button>
                </div>
              </form>

              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors w-full p-2 rounded-lg text-left",
                        pathname === item.href
                          ? "text-cyan-400 bg-white/10"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-white/5",
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  </motion.div>
                ))}

                {userLoggedIn ? (
                  <>
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="flex items-center text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 p-2 rounded-lg hover:bg-white/5 w-full text-left"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </button>
                    <button
                      onClick={() => handleNavigation("/favorites")}
                      className="flex items-center text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 p-2 rounded-lg hover:bg-white/5 w-full text-left"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Favoritos
                    </button>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleNavigation("/login")}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-sm"
                  >
                    Entrar
                  </Button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar
