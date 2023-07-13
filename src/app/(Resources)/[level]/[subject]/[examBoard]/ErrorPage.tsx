import Link from "next/link"

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-center space-y-10 text-4xl p-4">
        Error 😔
      </div>
      <div className="flex flex-col justify-center items-center text-xl space-y-4">
        No Resources Found | Try Again Later <br />
        <Link href="/">Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
