import { siteConfig } from "@/config/site"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import ScrollToTopButton from "@/components/ScrollToTopButton"

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
