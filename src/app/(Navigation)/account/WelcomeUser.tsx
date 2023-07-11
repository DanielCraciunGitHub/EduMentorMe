import { getUser } from "@/app/lib/getUser"

const WelcomeUser = async () => {
  const { user } = await getUser()

  return <div className="text-3xl">Welcome, {user?.name}</div>
}

export default WelcomeUser
