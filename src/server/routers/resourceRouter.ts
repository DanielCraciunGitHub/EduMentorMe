import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { resourcesSchema } from "@/lib/validations/resources"
import { sendError } from "@/app/_actions/discord"

import { publicProcedure, router } from "../trpc"

export const resourceRouter = router({
  saveResourceToAccount: publicProcedure
    .input(z.object({ link: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const supabase = createRouteHandlerClient<Database>({ cookies })
      try {
        const user = await getCurrentUser()

        // for authenticated users
        if (user) {
          // get their array of resources if there is one
          const { data } = await supabase
            .from("accounts")
            .select("resources")
            .single()
          // Make sure the data from the DB is valid
          const parsedData = resourcesSchema.parse(data?.resources)

          // find out if the payload link matches with any existing links in their array of resources
          let linkPresent = false

          if (parsedData) {
            linkPresent = parsedData.some(
              (resource) => resource.link === input.link
            )
          }

          // if no duplicates
          if (!linkPresent) {
            // makes the user's resource array behave like a queue of size '5'
            let newResources

            if (parsedData && parsedData.length < 5) {
              newResources = [
                ...parsedData,
                { link: input.link, name: input.name },
              ]
            } else if (parsedData?.length === 5) {
              newResources = [
                ...parsedData.slice(1),
                { link: input.link, name: input.name },
              ]
            } else {
              newResources = [{ link: input.link, name: input.name }]
            }
            // update DB with new data for the authenticated user
            await supabase
              .from("accounts")
              .update({ resources: newResources })
              .eq("email", user.email)
          }
          return NextResponse.json({ status: 200 })
        }
        return NextResponse.json({ status: 404 })
      } catch (err: any) {
        await sendError({
          location: "api/updateResources",
          errMsg: err.message,
        })
        return NextResponse.json({ err })
      }
    }),
})
