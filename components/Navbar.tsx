import React from 'react'
import Image from 'next/image'
import Signin from './Signin'
import { NavLinks } from '@/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/session'
import Link from 'next/link'
import Userprofile from './Userprofile'
const Navbar = async () => {
    const session: any = await getServerSession(authOptions)
    const queryParams = {
        type: 'create',
    };
    return (
        <div className='w-full h-[80px] flex items-center justify-between px-6'>
            <Link href='/'><Image
                src='\logo.svg'
                alt='logo'
                width={130}
                height={130}
            /></Link>
            <ul className='flex text-sm gap-4 text-slate-700'>
                {

                    NavLinks.map((link) => (
                        <li key={link.key} className='hidden md:block md:text-[11px]'>
                            <Link href={link.href}>{link.text}</Link>
                        </li>
                    ))
                }
            </ul>
            {
                session ? (
                    <div className='w-[160px] flex items-center justify-between'>
                        <Userprofile session={session} />
                        <Link href={{ pathname: '/create-project', query: queryParams }}>
                            <button type='button' className='flex justify-center text-neutral-50 w-[90px] h-[30px] bg-violet-700 
                            text-[10px] rounded-md p-3 box-border items-center'>
                                Share Work
                            </button>
                        </Link>
                    </div>
                ) :
                    (
                        <Signin />
                    )
            }
        </div>
    )

}

export default Navbar