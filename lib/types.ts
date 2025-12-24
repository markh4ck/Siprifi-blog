export interface Author {
  name: string
  avatar: string
  role: string
  bio: string
  twitter?: string
  linkedin?: string
  website?: string
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  category: string
  tags: string[]
  readingTime: number
}
