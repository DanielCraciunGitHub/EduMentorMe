import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { resourceSchema, resourcesSchema } from "@/lib/validations/resources"

export async function PATCH(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  try {
    // receive payload and parse
    const { link, name } = resourceSchema.parse(await req.json())

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
        linkPresent = parsedData.some((resource) => resource.link === link)
      }

      // if no duplicates
      if (!linkPresent) {
        // makes the user's resource array behave like a queue of size '5'
        let newResources

        if (parsedData && parsedData.length < 5) {
          newResources = [...parsedData, { link, name }]
        } else if (parsedData?.length === 5) {
          newResources = [...parsedData.slice(1), { link, name }]
        } else {
          newResources = [{ link, name }]
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
  } catch (err: unknown) {
    return NextResponse.json({ err })
  }
}
