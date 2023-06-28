interface ApiResponse {
  data: {
    id: number
    attributes: {
      createdAt: string
      updatedAt: string
      publishedAt: string
      title: string
      body: string
      url: string
    }
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
interface fileData {
  fileName: string
  pdfFile: Buffer
}
interface User {
  name: string
  email: string
  password: string
}
