"use server"

import { env } from "@/env.mjs"
import { Logger } from "@/Logger"

interface payload {
  errMsg: string
  location: string
  userId?: string
}
export const sendError = async ({ location, errMsg, userId }: payload) => {
  try {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "🚨 ERROR 🚨",
            fields: [
              {
                name: "Error location",
                value: location,
                inline: true,
              },
              {
                name: "Error Message",
                value: errMsg,
                inline: true,
              },
              {
                name: "User ID",
                value: userId ? userId : "undefined",
                inline: false,
              },
            ],
          },
        ],
      }),
    })
  } catch (err: any) {
    Logger.debug("sendError():", err.message)
  }
}
