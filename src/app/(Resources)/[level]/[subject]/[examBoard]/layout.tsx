export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-1/2 w-5/6">{children}</div>
    </div>
  )
}
