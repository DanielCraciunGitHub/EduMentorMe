import DeleteAccountButton from "./DeleteAccountButton"
import SignOutButton from "./SignOutButton"
import WelcomeUser from "./WelcomeUser"

const page = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-10">
        <WelcomeUser />
        <SignOutButton />
      </div>
      <div className="flex justify-center">
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
