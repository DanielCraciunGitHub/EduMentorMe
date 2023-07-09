import ScrollToTopButton from "@/app/components/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  )
}
