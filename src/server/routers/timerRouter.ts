import { cookies } from "next/headers"
import { Logger } from "@/Logger"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { subjectArraySchema } from "@/lib/validations/form"

import { publicProcedure, router } from "../trpc"

export const dynamic = "force-dynamic"

export const timerRouter = router({
  getLeaderboardData: publicProcedure.query(async () => {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data } = await supabase
      .from("leaderboard")
      .select("leaderboard_time, name")
      .order("leaderboard_time", { ascending: false })
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
  insertSubjectsAndTimes: publicProcedure
    .input(subjectArraySchema)
    .mutation(async ({ input }) => {
      const supabase = createRouteHandlerClient<Database>({ cookies })
      const user = await getCurrentUser()
      if (user) {
        await supabase
          .from("accounts")
          .update({ subjects_and_times: input })
          .eq("id", user.id)
      }
    }),
  getSubjectsAndTimes: publicProcedure.query(async () => {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const user = await getCurrentUser()

    if (user) {
      const { data } = await supabase
        .from("accounts")
        .select("subjects_and_times")
        .eq("id", user.id)
        .single()
      return subjectArraySchema.parse(data?.subjects_and_times)
    }
  }),
  updateSubjectTime: publicProcedure
    .input(
      z.object({
        subject: z.string(),
        time: z.number(),
        subjectData: subjectArraySchema,
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createRouteHandlerClient<Database>({ cookies })
      const user = await getCurrentUser()
      if (user) {
        const indexToUpdate = input.subjectData!.findIndex(
          (item) => item.subject === input.subject
        )

        input.subjectData![indexToUpdate].time = String(
          Number(input.subjectData![indexToUpdate].time) + input.time
        )

        await supabase
          .from("accounts")
          .update({ subjects_and_times: input.subjectData })
          .eq("id", user.id)
      }
    }),
})
