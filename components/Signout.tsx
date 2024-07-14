"use client"
import React from 'react'
import {signOut} from 'next-auth/react'
const Signout = () => {
    return (
        <button onClick={() => signOut()} className='text-neutral-50 w-[70px] h-[30px] bg-violet-900 text-[12px] rounded-md p-3 box-border flex items-center'>
            Signout
        </button>
    )
}

export default Signout