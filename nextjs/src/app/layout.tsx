import type { Metadata } from "next"
import "@/app/globals.css"
import { Provider } from "@/app/components/providers"

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
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex flex-grow">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
