import Link from "next/link"

import { getFiles } from "@/lib/googleDrive"

const Test = async () => {
  const files = await getFiles("a-level", "computer-science", "ocr")
  return files?.map((file) => <Link href={file.link}>{file.name}</Link>)
}

export default Test
