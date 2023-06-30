import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware() {}, {
  callbacks: {
    // redirects will only happen if false is returned from this function
    authorized: ({ token, req }) => {
      const reqPath = req.nextUrl.pathname
      if (!token && (reqPath === "/login" || reqPath === "/sign_up")) {
        return true
      } else if (token && reqPath === "/account") {
        return true
      }
      return false
    },
  },
})

export const config = {
  matcher: ["/account", "/login", "/sign_up"],
}
