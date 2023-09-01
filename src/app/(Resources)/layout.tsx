import { siteConfig } from "@/config/site"
import Footer from "@/components/Navigation/Footer"
import NavBar from "@/components/Navigation/NavBar"
import ScrollToTopButton from "@/components/Navigation/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar items={siteConfig.mainNav} />
      <main className="flex flex-grow">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
