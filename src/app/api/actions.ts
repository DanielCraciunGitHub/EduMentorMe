"use server"

import { prisma } from "@/prisma/db"

export async function removeAccountFromDb(email: string) {
  await prisma.user.delete({
    where: { email },
  })
}
export async function getAllDataFromDb() {
  const data = await prisma.user.findMany()
  return data
}
