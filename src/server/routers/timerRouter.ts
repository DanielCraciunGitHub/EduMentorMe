import { cookies } from "next/headers"
import { Logger } from "@/Logger"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { getCurrentUser } from "@/lib/getCurrentUser"

import { publicProcedure, router } from "../trpc"

export const timerRouter = router({
  getLeaderboardData: publicProcedure.query(async () => {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data } = await supabase
      .from("leaderboard")
      .select("leaderboard_time, name")
      .not("leaderboard_time", "is", null)
    return { data }
  }),
  setLeaderboardData: publicProcedure
    .input(z.object({ minutes: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const supabase = createRouteHandlerClient<Database>({ cookies })
        const user = await getCurrentUser()

        if (user) {
          const { data } = await supabase
            .from("leaderboard")
            .select("leaderboard_time")
            .eq("id", user.id)
            .single()

          const leaderboard_time = data?.leaderboard_time
            ? Number(data.leaderboard_time)
            : 0

          await supabase
            .from("leaderboard")
            .update({
              leaderboard_time: String(input.minutes + leaderboard_time),
            })
            .eq("id", user.id)
        }
      } catch (err: any) {
        Logger.debug(err.message)
      }
    }),
})
