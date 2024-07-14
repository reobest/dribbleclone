"use client"
import Image from 'next/image'
import React from 'react'
import Model from '@/components/Model'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
const CreateProject = () => {
    const router = useRouter()
    const closeModel = () => {
        router.push('/')
    }
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const id  = searchParams.get('id')
    return (
        <div className='w-full min-h-screen h-[1200px]  absolute top-0 z-50 flex flex-col justify-end'>
            <div className='w-full min-h-screen absolute top-0 z-40 bg-black opacity-80 '></div>
                <button className='absolute top-6 right-1 z-[51]' onClick={closeModel}>
                    <Image
                        alt='x'
                        height={15}
                        width={15}
                        src='/close.svg'
                    />
                </button>
                <Model type={type} id={id}/>
        </div>
    )
}

export default CreateProject