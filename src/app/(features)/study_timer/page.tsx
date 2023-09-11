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

export const revalidate = 40

export const metadata: Metadata = {
  ...staticMetadata.study_timer,
}

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Timer />
      <Leaderboard />
    </div>
  )
}
const Leaderboard = async () => {
  const { data } = await serverClient.timerRouter.getLeaderboardData()
  return (
    <Table className="w-screen">
      <TableCaption className="text-lg">Leaderboard 🏆</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Time 🕒</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((user, i) => (
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
