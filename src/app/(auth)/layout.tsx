import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "ml-4 mt-8 w-fit"
        )}
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
      <main className="flex flex-grow justify-center">{children}</main>
      <Toaster />
    </>
  )
}
