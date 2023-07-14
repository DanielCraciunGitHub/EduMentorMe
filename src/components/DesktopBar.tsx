"use client"

import { useUserStore } from "@/hooks/useUserStore"
import { NavItem } from "@/components/NavItem"

export function DesktopBar() {
  const { user } = useUserStore()
  return (
    <div className="hidden md:flex md:w-full md:justify-between md:p-6">
      <div className="flex items-center">
        <NavItem key="EMM" page="/" text="EMM" className="text-4xl" />
        <NavItem key="/about_us" page="/about_us" text="About Us" />
        <NavItem key="/contact_us" page="/contact_us" text="Contact Us" />
        <NavItem
          key="/products_and_services"
          page="/products_and_services"
          text="Products And Services"
        />
      </div>
      <div className="flex items-center">
        {user ? (
          <NavItem key="/account" page="/account" text="Account" />
        ) : (
          <>
            <NavItem key="/login" page="/login" text="Login" />
            <NavItem key="/sign_up" page="/sign_up" text="Sign Up" />
          </>
        )}
      </div>
    </div>
  )
}
