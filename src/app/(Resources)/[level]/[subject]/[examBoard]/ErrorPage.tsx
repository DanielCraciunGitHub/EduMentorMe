import Link from "next/link"

const ErrorPage = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex justify-center space-y-10 p-4 text-4xl">
        Error 😔
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 text-xl">
        No Resources Found | Try Again Later <br />
        <Link href="/">Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
