"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const { toast } = useToast()
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`

  const shareData = {
    title,
    url,
  }

  const handleShare = async (platform: string) => {
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          toast({
            title: "Link copied!",
            description: "The link has been copied to your clipboard.",
          })
        } catch (err) {
          toast({
            title: "Error",
            description: "Could not copy the link.",
            variant: "destructive",
          })
        }
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share(shareData)
          } catch (err) {
            console.error("Error sharing:", err)
          }
        }
    }
  }

  return (
    <div className="mt-8">
      <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Share</h4>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleShare("facebook")} aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")} aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("copy")} aria-label="Copy link">
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
