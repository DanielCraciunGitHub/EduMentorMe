import Link from 'next/link'
import { FC } from 'react'


const Navbar: FC = () => {
  return (
    <div className='flex justify-center'>
      <nav className='text-4xl text-white w-5/6 bg-blue-600 p-4 border-2 border-cyan-500 rounded'>
        <Link href='/'>Home</Link>
      </nav>
    </div>
  ) 
}

export default Navbar