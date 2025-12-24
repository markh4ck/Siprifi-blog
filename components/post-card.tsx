"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/types"

interface PostCardProps {
  post: Post
  featured?: boolean
  compact?: boolean
  className?: string
}

export default function PostCard({ post, featured = false, compact = false, className }: PostCardProps) {
  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy")

  // Create a preview of the markdown content
  const contentPreview =
    post.content
      .replace(/[#*`_[\]]/g, "") // Remove markdown symbols
      .slice(0, compact ? 100 : 150) + "..."

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg border-0 shadow-md",
        featured ? "lg:col-span-2 lg:flex" : "",
        compact ? "h-full" : "",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full" scroll={true} onClick={() => window.scrollTo(0, 0)}>
        <div className={cn("relative", featured ? "lg:w-1/2" : "")}>
          <div className={cn("relative overflow-hidden", compact ? "aspect-[4/3]" : "aspect-video")}>
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">{post.category}</span>
          </div>
        </div>

        <div className={cn("flex flex-col h-full", featured ? "lg:w-1/2" : "")}>
          <CardContent className={cn("flex-1", compact ? "p-4" : "p-6", featured ? "lg:p-8" : "")}>
            {/* Author Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium">{post.author.name}</span>
                {post.author.twitter && (
                  <>
                    <span>•</span>
                    <a
                      href={post.author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      @{post.author.twitter.split("/").pop()}
                    </a>
                  </>
                )}
              </div>
            </div>

            <h3
              className={cn(
                "font-heading font-bold mb-2 line-clamp-2",
                compact ? "text-lg" : featured ? "text-2xl" : "text-xl",
              )}
            >
              {post.title}
            </h3>
            <p className={cn("text-gray-600 dark:text-gray-400 mb-3 line-clamp-2", compact ? "text-sm" : "")}>
              {post.excerpt}
            </p>
            {!compact && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{contentPreview}</div>
            )}
          </CardContent>

          <CardFooter className={cn("pt-0 flex items-center justify-between", compact ? "px-4 pb-4" : "px-6 pb-6")}>
            <div className={cn("flex items-center text-gray-600 dark:text-gray-400", compact ? "text-xs" : "text-xs")}>
              <span className="flex items-center mr-3">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(post.date), compact ? "MMM dd" : "MMM dd, yyyy")}
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readingTime} min
              </span>
            </div>

            {!compact && (
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 group">
                Read more
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </CardFooter>
        </div>
      </Link>
    </Card>
  )
}
