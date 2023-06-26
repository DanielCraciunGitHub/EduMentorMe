import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"

import Navbar from "@/app/components/NavBar"
import Footer from "@/app/components/Footer"

export const metadata: Metadata = {
  title: "Computing And Maths Tutor",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow h-full flex">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
