import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    NextResponse.redirect(new URL(req.nextUrl.origin))
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        if (!token && (path === "/login" || path === "/sign_up")) {
          return true
        } else if (token && path === "/account") {
          return true
        }
        return false
      },
    },
  }
)

export const config = { matcher: ["/account", "/login", "/sign_up"] }
