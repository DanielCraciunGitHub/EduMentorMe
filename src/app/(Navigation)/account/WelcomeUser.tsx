import { getCurrentUser } from "@/lib/getCurrentUser"

const WelcomeUser = async () => {
  const user = await getCurrentUser()

  return <div className="text-3xl">Welcome, {user?.name}</div>
}

export default WelcomeUser
