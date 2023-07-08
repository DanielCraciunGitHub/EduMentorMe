export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-5/6 h-1/2">{children}</div>
    </div>
  )
}
