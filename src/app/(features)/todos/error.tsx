"use client"

import Link from "next/link"

export default function Error() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex justify-center space-y-10 p-4 text-4xl ">
        Error 😔
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 text-xl">
        The Todo feature is currently unavailable <br />
        <Link href="/" className="text-blue-600 underline">
          Home 🏡
        </Link>
      </div>
    </div>
  )
}
