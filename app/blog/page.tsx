import type { Metadata } from "next"
import { getAllPosts } from "@/lib/api"
import PostCard from "@/components/post-card"
import CategoryFilter from "@/components/category-filter"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Blog | Articles on DeFi and Decentralized Finance",
  description:
    "Explore our collection of articles on DeFi, blockchain, cryptocurrencies, and decentralized finance written by industry experts.",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const posts = await getAllPosts()

  const filteredPosts = category ? posts.filter((post) => post.category === category) : posts

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold mb-8 text-center">Finance and DeFi Blog</h1>

      <div className="mb-12">
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryFilter activeCategory={category} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium">No articles found in this category</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Try selecting another category or check back later.</p>
        </div>
      )}
    </div>
  )
}
