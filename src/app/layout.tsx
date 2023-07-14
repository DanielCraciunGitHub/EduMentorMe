import type { Metadata } from "next"
import "@/styles/globals.css"
import { Provider } from "@/components/providers"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Edu Mentor Me",
  description: "Learn GCSEs and A-Levels with us for free",
  keywords: ["tutoring", "tutor", "a level", "gcse"],
  icons: "/emm.jpeg",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex flex-grow justify-center">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
