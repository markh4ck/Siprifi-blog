import PostCard from "@/components/post-card"
import type { Post } from "@/lib/types"

interface FeaturedPostsProps {
  posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PostCard post={posts[0]} featured />

      <div className="grid grid-cols-1 gap-8">
        {posts.slice(1).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
