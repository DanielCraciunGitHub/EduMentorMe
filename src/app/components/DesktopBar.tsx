import { NavItem } from "@/app/components/NavItem"

export function DesktopBar() {
  return (
    <div className="w-full p-4 flex justify-between">
      <div className="flex items-center">
        <NavItem key="CMT" page="/" text="CMT" className="text-4xl" />
        <NavItem key="/about_us" page="/about_us" text="About Us" />
        <NavItem key="/contact_us" page="/contact_us" text="Contact Us" />
        <NavItem
          key="/products_and_services"
          page="/products_and_services"
          text="Products And Services"
        />
      </div>
      <div className="flex items-center">
        <NavItem key="/login" page="/login" text="Login" />
        <NavItem key="/sign_up" page="/sign_up" text="Sign Up" />
      </div>
    </div>
  )
}
