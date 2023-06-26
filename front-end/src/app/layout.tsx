import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"

import Navbar from "./components/NavBar"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Template",
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
          <main className="flex-grow h-full flex items-center">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
