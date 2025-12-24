import PostCard from "@/components/post-card"
import type { Post } from "@/lib/types"

interface ArticleGridProps {
  posts: Post[]
  title: string
}

export default function ArticleGrid({ posts, title }: ArticleGridProps) {
  if (posts.length === 0) return null

  return (
    <section className="my-16">
      <h2 className="text-3xl font-heading font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  )
}
