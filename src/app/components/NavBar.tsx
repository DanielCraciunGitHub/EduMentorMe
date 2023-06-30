"use client"

import useResize from "@/app/components/hooks/useResize"
import { MobileBar } from "@/app/components/MobileBar"
import { DesktopBar } from "@/app/components/DesktopBar"

export default function NavBar() {
  const { isMobile } = useResize(768)
  return <nav>{isMobile ? <MobileBar /> : <DesktopBar />}</nav>
}
