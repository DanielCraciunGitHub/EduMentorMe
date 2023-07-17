import { Files } from "@/types"
import { google } from "googleapis"

const private_key = process.env.GOOGLE_DRIVE_API_PRIVATE_KEY?.split(
  String.raw`\n`
).join("\n")

// Authorizes the service account to be used
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.SERVICE_ACCOUNT_EMAIL,
    private_key,
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
})
const drive = google.drive({ version: "v3", auth })

export const getFiles = async (
  level: string,
  subject: string,
  examBoard: string
) => {
  try {
    // // navigates through the folder tree to get to the root
    const levelRes = await drive.files.list({
      q: `name='${level}'`,
    })
    const subjectRes = await drive.files.list({
      q: `'${levelRes.data.files![0].id}' in parents and name='${subject}'`,
    })
    const examBoardRes = await drive.files.list({
      q: `'${subjectRes.data.files![0].id}' in parents and name='${examBoard}'`,
    })
    // lists all of the files in the root folder
    const res = await drive.files.list({
      q: `'${examBoardRes.data.files![0].id}' in parents`,
    })

    const files: Files = []
    // go through each file and return their names and links for
    // further processing
    for (const file of res.data.files!) {
      files.push({
        name: file.name!,
        link: `https://drive.google.com/file/d/${file.id}/view`,
      })
    }
    return files
  } catch (err: any) {
    console.error("Error: ", err.message)
    return null
  }
}
