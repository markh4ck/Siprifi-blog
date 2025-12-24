import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="inline-block">
              <img src="/images/siprifi-logo.png" alt="Digital Finance Today" className="h-10" />
            </Link>
          </div>

          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" aria-label="Twitter" asChild>
              <a href="https://twitter.com/siprifi" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn" asChild>
              <a href="https://linkedin.com/company/siprifi" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Facebook" asChild>
              <a href="https://facebook.com/siprifi" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            © {new Date().getFullYear()} Digital Finance Today. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Powered by{" "}
            <a
              href="https://siprifi.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Siprifi.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
