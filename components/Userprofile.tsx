"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Signout from './Signout'
import Link from 'next/link'
const Userprofile = ({ session } : {session: any}) => {
    const [Content, setContent] = useState(false)
    return (
        <div className='relative flex flex-col items-center'>
            <Image
                onMouseMove={() => setContent(true)}
                src={session.user?.image as string}
                alt='user-image'
                width={40}
                height={40}
                className='rounded-3xl cursor-pointer'
            />
            {Content &&
                <div className='absolute z-50 flex flex-col w-[250px] h-[300px] top-12 bg-white rounded-md shadow-lg p-4'
                    onMouseLeave={() => setContent(false)}
                >
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                            src={session.user?.image as string}
                            alt='user-image'
                            width={60}
                            height={60}
                            className='rounded-full cursor-pointer'
                        />
                        <h3 className='text-black font-normal text-xl'>{session.user?.name as string}</h3>
                    </div>
                    <div className='flex flex-col mt-4 text-xs text-slate-600 gap-3'>
                        <p>Work Preferences</p>
                        <p>Settings</p>
                       <Link href='/profile'><p className='cursor-pointer'>Profile</p></Link>
                        <hr className='w-full border-t-2 border-gray-300 mt-2 mb-4' />
                        <Signout />
                    </div>
                </div>
            }
        </div>
    )
}

export default Userprofile