"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import Details from '@/components/Detailes'
const page = ({params : {id}} : {params : {id :string}}) => {
    const router = useRouter()
    const closeModel = () => {
        router.push('/')
    }
    
    return (
        <div className='w-full min-h-screen h-[900px]   absolute top-0 z-50 flex flex-col justify-end'>
            <div className='w-full min-h-screen h-[900px] absolute bottom-0 -z-40 bg-black opacity-80 '></div>
            <button className='absolute top-1 right-1' onClick={closeModel}>
                <Image
                    alt='x'
                    height={15}
                    width={15}
                    src='/close.svg'
                />
            </button>
            <Details id={id}/>
        </div>
    )
}

export default page