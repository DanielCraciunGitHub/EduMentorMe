import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { sendError } from "@/app/_actions/discord"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session && req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/account", req.url))
    }
    if (session && req.nextUrl.pathname === "/sign_up") {
      return NextResponse.redirect(new URL("/account", req.url))
    }
    if (!session && req.nextUrl.pathname === "/account") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    if (!session && req.nextUrl.pathname === "/todos") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return res
  } catch (err: any) {
    await sendError({ location: "middleware", errMsg: err.message })
  }
}

export const config = {
  matcher: ["/account", "/login", "/sign_up", "/todos"],
}
