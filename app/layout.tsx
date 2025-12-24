import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://siprifi.finance"),
  title: {
    default: "Siprifi Finance Blog | DeFi OTC Derivatives for Retail",
    template: "%s | Siprifi Finance Blog",
  },
  description:
    "Official DeFi blog of Siprifi.com. Research, insights and education on on-chain OTC derivatives, decentralized finance and innovative DeFi products accessible to retail users.",
  keywords: [
    "siprifi",
    "siprifi defi",
    "defi derivatives",
    "otc derivatives defi",
    "on-chain derivatives",
    "decentralized finance",
    "defi trading",
    "retail defi",
    "permissionless finance",
    "web3 finance",
    "smart contract derivatives",
  ],
  authors: [{ name: "Siprifi DeFi Research" }],
  creator: "Siprifi",
  publisher: "Siprifi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siprifi.finance",
    title: "Siprifi Finance Blog | DeFi OTC Derivatives for Retail",
    description:
      "The official Siprifi DeFi blog. On-chain OTC derivatives, decentralized finance research and Web3 market insights.",
    siteName: "Siprifi Finance Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siprifi Finance Blog | DeFi OTC Derivatives for Retail",
    description:
      "Official DeFi blog of Siprifi.com. On-chain OTC derivatives and decentralized finance for retail users.",
    siteName: "Siprifi Finance Blog",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-gray-50 dark:bg-gray-900 font-serif">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Structured Data — DeFi explicit */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Siprifi Finance Blog",
              url: "https://siprifi.finance",
              description:
                "Official blog of Siprifi.com, a decentralized finance (DeFi) platform providing on-chain OTC derivatives accessible to retail users.",
              publisher: {
                "@type": "Organization",
                name: "Siprifi",
                url: "https://siprifi.com",
                description:
                  "Siprifi is a DeFi platform offering on-chain OTC derivatives and decentralized financial products for retail accessibility.",
                sameAs: [
                  "https://siprifi.com",
                  "https://twitter.com/siprifi",
                  "https://linkedin.com/company/siprifi",
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
