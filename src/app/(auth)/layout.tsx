import { siteConfig } from "@/config/site"
import Footer from "@/components/Footer"
import Navbar from "@/components/NavBar"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar items={siteConfig.mainNav} />
      <main className="flex flex-grow justify-center">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
