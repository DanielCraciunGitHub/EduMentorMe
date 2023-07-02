"use client"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="h-5/6">{children}</div>
      <div className="flex h-1/6 items-end"></div>
    </div>
  )
}
