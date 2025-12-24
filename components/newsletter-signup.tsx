"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Por favor, introduce tu dirección de email.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulación de envío
    setTimeout(() => {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro newsletter.",
      })
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-8 md:p-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Mantente Informado</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Suscríbete a nuestro newsletter y recibe las últimas noticias, análisis y guías sobre DeFi y finanzas
          descentralizadas.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Tu dirección de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Suscribiendo..." : "Suscribirse"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
          Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  )
}
