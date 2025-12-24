"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import CategoryDropdown from "@/components/category-dropdown"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/siprifi-logo.png" alt="Digital Finance Today" className="h-12" />
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Categories Dropdown - Desktop */}
            <div className="hidden md:block">
              <CategoryDropdown />
            </div>

            {/* Search Button */}
            <Button
              variant="outline"
              size="sm"
              aria-label="Search"
              className="hidden md:flex bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/images/siprifi-logo.png" alt="Digital Finance Today" className="h-12" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <CategoryDropdown />
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
