import { bookingRouter } from "./routers/bookingRouter"
import { paymentRouter } from "./routers/paymentRouter"
import { resourceRouter } from "./routers/resourceRouter"
import { timerRouter } from "./routers/timerRouter"
import { router } from "./trpc"

export const appRouter = router({
  resourceRouter,
  paymentRouter,
  timerRouter,
  bookingRouter,
})

export type AppRouter = typeof appRouter
