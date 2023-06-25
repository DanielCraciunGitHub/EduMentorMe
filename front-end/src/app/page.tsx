import Link from 'next/link';
import React from 'react';

export default async function Page() {

  return (
    <div className='mt-56'>
      <h1 className='text-4xl text-white flex justify-center p-4'>Revision</h1>
      <div className='flex text-3xl text-white underline justify-center flex-col items-center space-y-3 p-4'>
        <Link href='/computing' className='hover:text-blue-600'>Computing</Link> 
        <Link href='/maths' className='hover:text-blue-600'>Maths</Link> 
        <Link href='/physics' className='hover:text-blue-600'>Physics</Link> 
      </div>
    </div>
  )
}
  
