import { MobileBar } from "@/app/components/MobileBar"
import { DesktopBar } from "@/app/components/DesktopBar"

export default function NavBar() {
  return (
    <nav>
      <MobileBar />
      <DesktopBar />
    </nav>
  )
}
