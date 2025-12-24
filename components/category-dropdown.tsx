"use client"
import Link from "next/link"
import { ChevronDown, Coins, LineChart, BarChart3, Wallet, ImageIcon, Grid3X3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    name: "Finance",
    slug: "finance",
    description: "Traditional finance, banking, and financial markets",
    icon: <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    name: "DeFi",
    slug: "defi",
    description: "Protocols, applications, and decentralized financial services",
    icon: <Coins className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    description: "Technology, innovations, and blockchain use cases",
    icon: <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    name: "Cryptocurrencies",
    slug: "cryptocurrencies",
    description: "Bitcoin, Ethereum, and other major cryptocurrencies",
    icon: <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    name: "Trading",
    slug: "trading",
    description: "Strategies, technical analysis, and risk management",
    icon: <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    name: "NFTs",
    slug: "nft",
    description: "Digital art, collectibles, and non-fungible tokens",
    icon: <ImageIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
]

export default function CategoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300"
        >
          <Grid3X3 className="h-4 w-4" />
          Categories
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuItem asChild>
          <Link href="/blog" className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">All Articles</div>
              <div className="text-sm text-gray-500">Browse all our content</div>
            </div>
          </Link>
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild>
            <Link
              href={`/blog?category=${category.slug}`}
              className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded">
                {category.icon}
              </div>
              <div>
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-gray-500">{category.description}</div>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
