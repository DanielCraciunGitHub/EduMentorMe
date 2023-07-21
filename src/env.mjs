import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  },
  server: {
    CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: z.string().min(1),
    CONTENTFUL_PREVIEW_SECRET: z.string().min(1),
    CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1),
    CONTENTFUL_SPACE_ID: z.string().min(1),

    RECAPTCHA_SECRET_KEY: z.string().min(1),

    NEXT_PRIVATE_SERVICE_ROLE_KEY: z.string().min(1),

    GOOGLE_DRIVE_API_PRIVATE_KEY: z.string().min(1),
    SERVICE_ACCOUNT_EMAIL: z.string().email(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
})