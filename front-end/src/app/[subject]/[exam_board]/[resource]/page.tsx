import { FC } from "react"

interface pageProps {
  params: { subject: string; exam_board: string; resource: string }
}

const page: FC<pageProps> = ({ params }) => {
  return params.resource
}
export default page
