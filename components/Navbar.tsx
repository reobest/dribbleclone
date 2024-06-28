import React from 'react'
import Image from 'next/image'
import Authproviders from './Authproviders'
import { NavLinks } from '@/constants'
import Link from 'next/link'
const Navbar = () => {
    const session = {}
    return (
        <div className='w-full h-[80px] flex items-center justify-between px-6'>
            <Image
                src='\logo.svg'
                alt='logo'
                width={130}
                height={130}
            />
            <ul className='flex text-sm gap-4 text-slate-700'>
            {
                
                NavLinks.map((link) => (
                    <li key={link.key}>
                        <Link href={link.href}>{link.text}</Link>
                    </li>
                ))
            }
            </ul>
            {
                session ? (
                    <>
                        user photo
                        share work
                    </>
                ) :
                    (
                        <Authproviders />
                    )
            }
        </div>
    )
}

export default Navbar