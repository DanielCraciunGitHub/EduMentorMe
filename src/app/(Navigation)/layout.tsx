import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Navigation/Footer"
import Navbar from "@/components/Navigation/NavBar"
import ScrollToTopButton from "@/components/Navigation/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar items={siteConfig.mainNav} />
      <main className="flex grow justify-center">{children}</main>
      <Footer />
      <ScrollToTopButton />
      <Toaster />
    </>
  )
}
