import { siteConfig } from "@/config/site"
import Footer from "@/components/Footer"
import Navbar from "@/components/NavBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar items={siteConfig.mainNav} />
      <main className="container flex flex-grow items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
