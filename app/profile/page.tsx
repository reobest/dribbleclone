"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { fetchProjects } from '@/utils';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { project } from '@/constants';
const page = () => {
  const session: any = useSession()
  console.log(session);

  const [projects, setProjects] = useState<project[]>([]);
  const [profileProject, setProfileProject] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const id = searchParams.get('id');
  const profileImage = (profileProject.length > 0 ? profileProject[0]?.image : filtered[0]?.image) || '/lg.gif'
  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const filterProjects = () => {
      if (id) {
        setProfileProject(projects.filter((pro: project) => pro.id === id));
      }
      const emailToFilter = email || session?.data?.user?.email;
      setFiltered(projects.filter((pro: project) => pro.email === emailToFilter));
    };

    filterProjects();
  }, [projects, email, id, session?.data?.user?.email])

  return (
    <div className='w-full  p-4 relative'>
      <Link href='/'>
        <button className='absolute top-3 right-3 w-[100px] h-[30px] flex justify-center items-center bg-purple-600
       text-white text-xs rounded-md cursor-pointer'>
          Back
        </button>
      </Link>
      <Image
        className='rounded-md mt-4'
        src={session?.data?.user?.image}
        alt='user-image'
        width={50}
        height={50}
      />
      <h1 className='text-3xl font-bold mt-6'>{session?.data?.user?.name}</h1>
      <div className='w-full  flex justify-start mt-6 gap-4'>
        <button className='w-[120px] h-[30px] text-xs flex gap-2 justify-center items-center rounded-md bg-slate-300'>
          <Image src='/plus-round.svg' alt='plus' width={20} height={20} />
          Follow
        </button>
        <button className='w-[120px] h-[30px] text-xs flex gap-2 justify-center items-center rounded-md text-white bg-purple-600'>
          <Image src='/eye.svg' alt='plus' width={20} height={20} />
          Hire Me
        </button>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <Image src={profileImage} alt='project-1' height={300} width={500} className='w-[80%] rounded-md' />
      </div>
      <h1 className='mt-[100px] text-4xl font-bold flex justify-center sm:justify-start'>some of Projects</h1>
      <div className='flex flex-wrap items-center justify-center sm:justify-start gap-[30px] mt-[50px]'>
        {filtered && filtered.map((project: any) => {
          return <div className='w-[250px] h-[300px] rounded-md' key={project?.id}>
            <Image
              className='h-[170px] rounded-md'
              src={project?.image}
              width={250}
              height={250}
              alt='project-img'
            />
            <div className='w-[250px] h-[50px] flex items-start justify-between text-xs mt-2'>
              <span>{session?.data?.user?.name || 'loading'}</span>
              <span className='flex items-center justify-between'>
                <Image width={10} height={10} alt="heart" src='/hearth.svg' className='mx-1' /> 8179
              </span>
              <span className='flex items-center justify-between'>
                <Image width={10} height={10} alt="eye" src='/eye.svg' className='mx-1' />4.5k
              </span>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default page