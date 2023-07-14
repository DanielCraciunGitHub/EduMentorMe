import { DesktopBar } from "@/components/DesktopBar"
import { MobileBar } from "@/components/MobileBar"

export default function NavBar() {
  return (
    <nav>
      <MobileBar />
      <DesktopBar />
    </nav>
  )
}
