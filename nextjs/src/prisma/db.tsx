import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const addFile = async (fileName: string, pdfFile: Buffer) => {
  await prisma.files.create({
    data: {
      fileName,
      pdfFile,
    },
  })
}

export default addFile
