import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex flex-grow justify-center">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
