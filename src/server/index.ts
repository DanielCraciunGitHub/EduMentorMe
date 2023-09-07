import { paymentRouter } from "./routers/paymentRouter"
import { resourceRouter } from "./routers/resourceRouter"
import { router } from "./trpc"

export const appRouter = router({
  resourceRouter,
  paymentRouter,
})

export type AppRouter = typeof appRouter
