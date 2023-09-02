import { siteConfig } from "@/config/site"
import Footer from "@/components/Navigation/Footer"
import Navbar from "@/components/Navigation/NavBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar items={siteConfig.mainNav} />
      <main className="container flex grow items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
