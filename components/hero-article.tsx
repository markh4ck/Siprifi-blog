"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/types"

interface HeroArticleProps {
  post: Post
}

export default function HeroArticle({ post }: HeroArticleProps) {
  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy")

  // Create a preview of the markdown content
  const contentPreview =
    post.content
      .replace(/[#*`_[\]]/g, "") // Remove markdown symbols
      .slice(0, 200) + "..."

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block" onClick={() => window.scrollTo(0, 0)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-96 overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium">{post.category}</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">LATEST</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{post.author.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{post.author.role}</span>
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
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4 leading-tight">{post.title}</h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>

            <p className="text-gray-500 dark:text-gray-500 mb-6 leading-relaxed">{contentPreview}</p>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-fit group">
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}
