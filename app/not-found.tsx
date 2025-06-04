"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, Film, ArrowLeft, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              y: [null, Math.random() * -200 - 100],
              rotate: [null, Math.random() * 360 + 180],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Film className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* 404 Number with enhanced styling */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="relative">
              <h1 className="font-orbitron text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                404
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 blur-3xl scale-110" />

              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 font-orbitron text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-bold text-red-500 opacity-20 leading-none"
                animate={{
                  x: [0, -2, 2, 0],
                  opacity: [0, 0.3, 0, 0.2, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                404
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-orbitron">
              Página não encontrada
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Ops! Parece que você se perdeu no universo cinematográfico. A página que você está procurando não existe
              ou foi movida para outra dimensão.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/">
                <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Voltar ao Início
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-lg px-8 py-6 rounded-xl text-white hover:text-white hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <Link href="/search">
                <Search className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Buscar Filmes
              </Link>
            </Button>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6 font-orbitron">Ou explore essas seções populares:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/trending"
                className="group p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/30 rounded-lg group-hover:bg-purple-600/50 transition-colors duration-300">
                    <Compass className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      Em Alta
                    </h4>
                    <p className="text-sm text-gray-400">Filmes populares</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/categories"
                className="group p-4 bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-600/30 rounded-lg group-hover:bg-cyan-600/50 transition-colors duration-300">
                    <Film className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      Categorias
                    </h4>
                    <p className="text-sm text-gray-400">Por gênero</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/about"
                className="group p-4 bg-gradient-to-br from-pink-600/20 to-pink-800/20 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-600/30 rounded-lg group-hover:bg-pink-600/50 transition-colors duration-300">
                    <ArrowLeft className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-pink-300 transition-colors duration-300">
                      Sobre Nós
                    </h4>
                    <p className="text-sm text-gray-400">Nossa história</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group p-4 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600/30 rounded-lg group-hover:bg-emerald-600/50 transition-colors duration-300">
                    <Home className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      Entrar
                    </h4>
                    <p className="text-sm text-gray-400">Sua conta</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 italic">"Nem todos os que vagam estão perdidos" - J.R.R. Tolkien</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
