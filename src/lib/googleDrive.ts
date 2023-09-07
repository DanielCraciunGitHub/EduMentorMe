import { env } from "@/env.mjs"
import { google } from "googleapis"

// Parse the key into a suitable format
const private_key = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.split(
  String.raw`\n`
).join("\n")

// Authorizes the service account to be used
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key,
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
})
export const drive = google.drive({ version: "v3", auth })
