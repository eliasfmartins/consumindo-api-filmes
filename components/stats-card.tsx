"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description?: string
}

export default function StatsCard({ title, value, icon, description }: StatsCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1000 // ms
    const steps = 20
    const stepValue = value / steps
    const stepTime = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      setCount(Math.min(Math.round(stepValue * currentStep), value))

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-purple-900/30 bg-black/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          <div className="rounded-full bg-purple-900/30 p-2 text-purple-400">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
          {description && <p className="mt-1 text-xs text-gray-400">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
