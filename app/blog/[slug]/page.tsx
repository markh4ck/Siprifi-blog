import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/api"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, Clock, Tag } from "lucide-react"
import ShareButtons from "@/components/share-buttons"
import TableOfContents from "@/components/table-of-contents"
import RelatedPosts from "@/components/related-posts"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { markdownToHtml } from "@/lib/markdown"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article not found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getAllPosts().then((posts) =>
    posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3),
  )

  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy")

  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(post.content)

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          {/* Author Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{post.author.name}</div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span>{post.author.role}</span>
                {post.author.twitter && (
                  <>
                    <span>•</span>
                    <a
                      href={post.author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      @{post.author.twitter.split("/").pop()}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{post.excerpt}</p>

          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4 order-2 lg:order-1">
            <div className="sticky top-24">
              <TableOfContents />
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </aside>

          <div className="lg:w-3/4 order-1 lg:order-2 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Interested in this topic?</h3>
              <p className="mb-4">
                Discover how{" "}
                <a
                  href="https://siprifi.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Siprifi
                </a>{" "}
                is revolutionizing decentralized finance with innovative blockchain risk management solutions.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="https://siprifi.com" target="_blank" rel="noopener noreferrer">
                  Visit Siprifi
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-heading font-bold mb-8">Related Articles</h2>
          <RelatedPosts posts={relatedPosts} />
        </section>
      )}

      {/* Article structured data for SEO */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: [post.coverImage],
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author.name,
              url: post.author.twitter,
            },
            publisher: {
              "@type": "Organization",
              name: "Digital Finance Today",
              logo: {
                "@type": "ImageObject",
                url: "https://digitalfinancetoday.com/images/siprifi-logo.png",
              },
            },
            description: post.excerpt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://digitalfinancetoday.com/blog/${post.slug}`,
            },
            keywords: post.tags.join(", "),
          }),
        }}
      />
    </div>
  )
}
