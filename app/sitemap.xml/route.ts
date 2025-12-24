import { getAllPosts } from "@/lib/api"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const posts = await getAllPosts()
  const baseUrl = request.nextUrl.origin

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map((post) => {
      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join("")}
</urlset>`.trim()

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
