import { MobileBar } from "@/components/MobileBar"
import { DesktopBar } from "@/components/DesktopBar"

export default function NavBar() {
  return (
    <nav>
      <MobileBar />
      <DesktopBar />
    </nav>
  )
}
