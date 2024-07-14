"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
const Signin = () => {
  return (
    <button onClick={() => signIn()} className='text-neutral-50 w-[70px] h-[30px] bg-violet-900 text-[12px] rounded-md p-3 box-border flex items-center'>
        Signin
    </button>
  )
}

export default Signin