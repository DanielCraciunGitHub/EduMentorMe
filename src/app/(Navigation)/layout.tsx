"use client"

import ScrollToTopButton from "../components/ScrollToTopButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  )
}
