"use client"
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';
const RelatedProjects = ({projects,session} : {projects : any,session: any}) => {
  const router = useRouter()
  const handleDetails = (id: string) => {
    router.push(`/project/${id}`)
}
  return (
    <div className='w-full flex flex-wrap p-4 items-center justify-start '>
        {projects && projects.map((project : any) => {
                return<div className='w-[250px] h-[300px] rounded-md mx-3 cursor-pointer' key={project?.id} onClick={() => handleDetails(project.id)}>
                <Image
                  className='h-[170px] rounded-md'
                  src={project?.image}
                  width={250}
                  height={250}
                  alt='project-img'
                />
                <div className='w-[250px] h-[50px] flex items-start justify-between text-xs mt-1'>
                  <span>{session?.data?.user?.name || 'loading'}</span>
                  <span className='flex items-center justify-between'>
                    <Image width={10} height={10} alt="heart" src='/hearth.svg' className='mx-1' /> 8179
                  </span>
                  <span className='flex items-center justify-between'>
                    <Image width={10} height={10} alt="eye" src='/eye.svg' className='mx-1' />4.5k
                  </span>
                </div>
              </div>
            } )}
    </div>
  )
}

export default RelatedProjects