"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RefreshCw, Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
              <AlertCircle className="h-20 w-20 sm:h-24 sm:w-24 text-orange-500 mx-auto" />
              <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron">
              Oops! Algo deu errado
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto">
              Ocorreu um erro ao carregar esta página. Tente novamente ou volte à página inicial.
            </p>
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
        </motion.div>
      </div>
    </div>
  )
}
