import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, LineChart, BarChart3, Wallet, ImageIcon, TrendingUp } from "lucide-react"

const categories = [
  {
    name: "Finance",
    slug: "finance",
    description: "Traditional finance, banking, and financial markets",
    icon: <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "DeFi",
    slug: "defi",
    description: "Protocols, applications, and decentralized financial services",
    icon: <Coins className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    description: "Technology, innovations, and blockchain use cases",
    icon: <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Cryptocurrencies",
    slug: "cryptocurrencies",
    description: "Bitcoin, Ethereum, and other major cryptocurrencies",
    icon: <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Trading",
    slug: "trading",
    description: "Strategies, technical analysis, and risk management",
    icon: <LineChart className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "NFTs",
    slug: "nft",
    description: "Digital art, collectibles, and non-fungible tokens",
    icon: <ImageIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
]

export default function CategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {categories.map((category) => (
        <Link key={category.slug} href={`/blog?category=${category.slug}`}>
          <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent
              className={`p-6 text-center ${category.color} h-full flex flex-col items-center justify-center`}
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="font-heading font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
