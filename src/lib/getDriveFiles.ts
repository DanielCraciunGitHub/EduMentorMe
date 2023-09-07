import { Logger } from "@/Logger"
import { Files } from "@/types"

import { drive } from "@/lib/googleDrive"

export const getFiles = async (...folders: string[]) => {
  try {
    // set a variable instance assigned with the first folder in the tree
    let folder = await drive.files.list({
      q: `name='${folders[0]}' and mimeType='application/vnd.google-apps.folder'`,
    })

    // loop through all folders input, until you reach the root folder
    for (let i = 1; i < folders.length; i++) {
      const parentId = folder.data.files![0].id
      const folderName = folders[i]

      folder = await drive.files.list({
        q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      })
    }

    // the root folder is assigned, which contains all of the files
    const rootFolder = await drive.files.list({
      q: `'${folder.data.files![0].id}' in parents`,
    })

    const files: Files = []

    // go through each file and return their names and web links
    for (const file of rootFolder.data.files!) {
      files.push({
        name: file.name!,
        link: `https://drive.google.com/file/d/${file.id}/view`,
      })
    }

    return files
  } catch (err: any) {
    Logger.debug("getFiles(): ", err.message)
    return null
  }
}
