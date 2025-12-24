import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Author } from "@/lib/types"

interface AuthorBioProps {
  author: Author
  className?: string
}

export default function AuthorBio({ author, className }: AuthorBioProps) {
  return (
    <div className={cn("border border-gray-200 dark:border-gray-800 rounded-xl p-6", className)}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          <Image src={author.avatar || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">{author.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{author.role}</p>

          <p className="text-gray-700 dark:text-gray-300 mb-4">{author.bio}</p>

          <div className="flex justify-center md:justify-start space-x-3">
            {author.twitter && (
              <Button variant="ghost" size="icon" asChild>
                <a href={author.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {author.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {author.website && (
              <Button variant="ghost" size="icon" asChild>
                <a href={author.website} target="_blank" rel="noopener noreferrer" aria-label="Sitio web">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
