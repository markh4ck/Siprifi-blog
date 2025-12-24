import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "./types"

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Directory ${postsDirectory} does not exist.`)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Parse the markdown file with gray-matter
        const { data, content } = matter(fileContents)

        // Ensure the content is properly formatted for MDX
        const processedContent = content
          .replace(/^#\s+/gm, "# ") // Ensure proper spacing after heading markers
          .replace(/^##\s+/gm, "## ")
          .replace(/^###\s+/gm, "### ")
          .replace(/^####\s+/gm, "#### ")

        return {
          slug,
          title: data.title || "",
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          content: processedContent,
          coverImage: data.coverImage || "/placeholder.svg",
          author: {
            name: data.author?.name || "Digital Finance Today",
            avatar: data.author?.avatar || "/placeholder.svg",
            role: data.author?.role || "Editor",
            bio: data.author?.bio || "Digital Finance Today Editorial Team",
            twitter: data.author?.twitter,
            linkedin: data.author?.linkedin,
            website: data.author?.website,
          },
          category: data.category || "general",
          tags: data.tags || [],
          readingTime: data.readingTime || calculateReadingTime(content),
        } as Post
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Ensure the content is properly formatted for MDX
    const processedContent = content
      .replace(/^#\s+/gm, "# ") // Ensure proper spacing after heading markers
      .replace(/^##\s+/gm, "## ")
      .replace(/^###\s+/gm, "### ")
      .replace(/^####\s+/gm, "#### ")

    return {
      slug,
      title: data.title || "",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content: processedContent,
      coverImage: data.coverImage || "/placeholder.svg",
      author: {
        name: data.author?.name || "Digital Finance Today",
        avatar: data.author?.avatar || "/placeholder.svg",
        role: data.author?.role || "Editor",
        bio: data.author?.bio || "Digital Finance Today Editorial Team",
        twitter: data.author?.twitter,
        linkedin: data.author?.linkedin,
        website: data.author?.website,
      },
      category: data.category || "general",
      tags: data.tags || [],
      readingTime: data.readingTime || calculateReadingTime(content),
    } as Post
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error)
    return null
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
