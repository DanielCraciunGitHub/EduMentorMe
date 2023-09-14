import { setTimeout } from "timers/promises"
import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Timer } from "@/components/Timer"
import { serverClient } from "@/app/_trpc/serverClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.study_timer,
}

const page = async () => {
  const subjectData = await serverClient.timerRouter.getSubjectsAndTimes()
  await setTimeout(150)

  return (
    <div className="flex flex-col items-center space-y-4 pt-16">
      <Timer subjectData={subjectData} />
      <Leaderboard />
    </div>
  )
}
const Leaderboard = async () => {
  const { data: leaderBoardData } =
    await serverClient.timerRouter.getLeaderboardData()

  return (
    <Table className="w-screen">
      <TableCaption className="text-lg">Leaderboard 🏆</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Total Time 🕒</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderBoardData?.map((user, i) => (
          <TableRow key={i}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.leaderboard_time} Minutes</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default page
