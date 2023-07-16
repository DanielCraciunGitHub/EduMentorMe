import { google } from "googleapis"

export const getData = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.cwd() + "/credentials.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  })
  const drive = google.drive({ version: "v3", auth })
  try {
    const res = await drive.files.list()
    const files = res.data.files

    if (!files?.length) {
      console.log("No files found.")
      return null
    }
    const links = []
    for (const file of files) {
      // Get the shareable link
      console.log(file)
      const fileDetails = await drive.files.get({
        fileId: file.id as string,
        fields: "webViewLink",
      })

      return fileDetails.data.webViewLink
    }
  } catch (error: any) {
    console.error("Error fetching files:", error.message)
    return null
  }
}
