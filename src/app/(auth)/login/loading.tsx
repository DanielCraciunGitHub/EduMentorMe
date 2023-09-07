import { Loader2 } from "lucide-react"

const loading = () => {
  return (
    <div className="flex items-center">
      <Loader2 className="h-24 w-24 animate-spin" />
    </div>
  )
}

export default loading
