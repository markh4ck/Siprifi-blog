import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import HeroArticle from "@/components/hero-article"
import ArticleGrid from "@/components/article-grid"

export const metadata: Metadata = {
  title: "Siprifi Finance Blog | DeFi OTC Derivatives & On-Chain Markets",
  description:
    "Official blog of Siprifi.com. Research, analysis and education on decentralized finance (DeFi), on-chain OTC derivatives and Web3 financial markets accessible to retail users.",
}

export default async function Home() {
  const posts = await getAllPosts()

  const latestPost = posts[0]
  const recentPosts = posts.slice(1, 9)
  const featuredPosts = posts.slice(9, 13)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero / Header */}
      <section className="py-12 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
            Siprifi Finance Blog
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          The official research and insights blog of{" "}
          <a
            href="https://siprifi.com"
            className="text-blue-600 hover:underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Siprifi
          </a>
          , a decentralized finance (DeFi) platform offering on-chain OTC
          derivatives designed for retail accessibility.
        </p>
      </section>

      {/* Latest Article */}
      {latestPost && (
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
              Latest Research
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Most recent publication from Siprifi DeFi Research
            </p>
          </div>

          <HeroArticle post={latestPost} />
        </section>
      )}

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <ArticleGrid posts={recentPosts} title="Recent Articles" />
      )}

      {/* More Articles */}
      {featuredPosts.length > 0 && (
        <ArticleGrid posts={featuredPosts} title="More Insights" />
      )}

      {/* View All Articles */}
      <section className="text-center my-16">
        <Link href="/blog">
          <Button size="lg" variant="outline" className="group">
            View All Research Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>

      {/* CTA Siprifi */}
      <section className="my-16 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-10 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-heading font-bold mb-6">
          Trade DeFi OTC Derivatives On-Chain
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Explore{" "}
          <a
            href="https://siprifi.com"
            className="text-blue-600 hover:underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Siprifi.com
          </a>{" "}
          to access a decentralized, permissionless OTC derivatives platform
          built on blockchain technology and tailored for retail users.
        </p>

        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <a href="https://siprifi.com" target="_blank" rel="noopener noreferrer">
            Explore the Siprifi DeFi Platform
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  )
}
