"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All", slug: "" },
  { name: "Finance", slug: "finance" },
  { name: "DeFi", slug: "defi" },
  { name: "Blockchain", slug: "blockchain" },
  { name: "Cryptocurrencies", slug: "cryptocurrencies" },
  { name: "Trading", slug: "trading" },
  { name: "NFTs", slug: "nft" },
]

interface CategoryFilterProps {
  activeCategory?: string
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const isActive = (category.slug === "" && !activeCategory) || category.slug === activeCategory

        return (
          <Link
            key={category.slug}
            href={category.slug ? `${pathname}?category=${category.slug}` : pathname}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}
