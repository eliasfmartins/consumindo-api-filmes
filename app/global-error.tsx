"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative mb-8"
              >
                <div className="relative">
                  <AlertTriangle className="h-24 w-24 sm:h-32 sm:w-32 text-red-500 mx-auto" />
                  <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron">
                  Algo deu errado!
                </h1>
                <p className="text-lg text-gray-400 max-w-md mx-auto">
                  Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
                </p>
                {error.digest && (
                  <p className="text-sm text-gray-500 font-mono bg-gray-800/50 rounded-lg px-4 py-2 inline-block">
                    ID do erro: {error.digest}
                  </p>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={reset}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  <RefreshCw className="mr-3 h-5 w-5" />
                  Tentar Novamente
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-lg px-8 py-6 rounded-xl text-white hover:text-white transition-all duration-300"
                >
                  <Link href="/">
                    <Home className="mr-3 h-5 w-5" />
                    Voltar ao Início
                  </Link>
                </Button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-sm text-gray-500">
                  Se o problema persistir, entre em contato conosco através do{" "}
                  <Link href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    suporte
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}
