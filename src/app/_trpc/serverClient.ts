import { appRouter } from "@/server"
import { httpBatchLink } from "@trpc/client"

import { baseUrl } from "@/lib/utils"

const url = baseUrl()

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${url}/api/trpc`,
    }),
  ],
})
