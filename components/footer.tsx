import Link from "next/link"
import { Github, Twitter, Instagram, Mail, Heart, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-900/95 to-black border-t border-purple-500/20 backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg blur-md opacity-50" />
                <div className="relative bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg">
                  <Film className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  CineVerse
                </h3>
                <span className="text-xs text-cyan-400/70 font-mono tracking-wider">v2.0</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Explore o universo do cinema com as melhores informações sobre filmes, avaliações e recomendações
              personalizadas para cinéfilos apaixonados.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-purple-600/20 hover:text-purple-400 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-cyan-600/20 hover:text-cyan-400 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-pink-600/20 hover:text-pink-400 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-gray-800/50 hover:bg-blue-600/20 hover:text-blue-400 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white font-orbitron">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Em Alta
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white font-orbitron">Conta</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Entrar
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Registrar
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Perfil
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="mb-4 font-semibold text-white font-orbitron">Informações</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gradient-to-r from-purple-500/20 via-gray-700/30 to-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                Este produto usa a API TMDB mas não é endossado ou certificado pelo TMDB.
              </p>
              <p className="mt-1 text-sm text-gray-400 flex items-center justify-center md:justify-start">
                Feito com <Heart className="mx-1 h-3 w-3 text-red-500 animate-pulse" /> por CineVerse &copy;{" "}
                {new Date().getFullYear()}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">Versão 2.0.0</span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30">
                Beta
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
