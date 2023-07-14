"use client"

import { NavItem } from "@/components/NavItem"
import { useUserStore } from "@/hooks/useUserStore"
import { PanelRight } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileBar() {
  const { user } = useUserStore()
  return (
    <div className="flex flex-col items-center py-2 md:hidden">
      <NavItem key="EMM" page="/" text="EMM" className="text-4xl" />
      <Sheet>
        <SheetTrigger className="flex w-full justify-end p-2">
          <PanelRight className="dark:text-slate-300" />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-center" side="right">
          <SheetClose asChild>
            <NavItem key="/about_us" page="/about_us" text="About Us" />
          </SheetClose>
          <SheetClose asChild>
            <NavItem key="/contact_us" page="/contact_us" text="Contact Us" />
          </SheetClose>
          <SheetClose asChild>
            <NavItem
              key="/products_and_services"
              page="/products_and_services"
              text="Products And Services"
            />
          </SheetClose>
          {user ? (
            <>
              <SheetClose asChild>
                <NavItem key="/account" page="/account" text="Account" />
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <NavItem key="/login" page="/login" text="Login" />
              </SheetClose>
              <SheetClose asChild>
                <NavItem key="/sign_up" page="/sign_up" text="Sign Up" />
              </SheetClose>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
