import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Descubre el mundo de las{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Finanzas Descentralizadas
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Análisis experto, guías detalladas y las últimas tendencias en DeFi, blockchain y criptomonedas para
            inversores y entusiastas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/blog">
                Explorar Artículos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/categorias">Ver Categorías</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-500/20 z-10"></div>
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="Finanzas Descentralizadas"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">100+</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Artículos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">10k+</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Lectores</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">5+</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Categorías</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Actualizado</div>
        </div>
      </div>
    </section>
  )
}
