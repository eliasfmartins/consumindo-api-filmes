"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Film, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setUser } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        setError("Todos os campos são obrigatórios")
        setIsLoading(false)
        return
      }

      // Mock login - in a real app, this would be an API call
      if (email === "user@example.com" && password === "password") {
        // Save user to localStorage
        setUser({
          id: "1",
          name: "Usuário Demo",
          email: "user@example.com",
          avatar: "/placeholder.svg?height=200&width=200",
        })

        router.push("/")
      } else {
        setError("Email ou senha inválidos")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-purple-900/30 bg-black/60 p-8 shadow-lg backdrop-blur-sm"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-purple-900/30 p-3">
              <Film className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <h1 className="mb-2 text-center font-orbitron text-2xl font-bold gradient-text">Bem-vindo de volta</h1>

          <p className="mb-6 text-center text-gray-400">Entre com suas credenciais para acessar sua conta</p>

          {error && <div className="mb-4 rounded-md bg-red-900/30 p-3 text-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                Registre-se
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              Para fins de demonstração, use:
              <br />
              Email: user@example.com
              <br />
              Senha: password
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
