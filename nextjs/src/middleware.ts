import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware() {}, {
  callbacks: {
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
