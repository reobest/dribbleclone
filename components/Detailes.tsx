"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../firebase/firebaseConfig';
import { fetchProjects } from '@/utils';
import Link from 'next/link';
import RelatedProjects from './RelatedProjects';
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
const Details = ({ id }: { id: string }) => {
  const session = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const [filtered2, setFiltered2] = useState<any>([]);
  const [userFound, setUserFound] = useState<boolean>(false)
  const [projectDetails, setProjectDetails] = useState<any>([])

  
  const projecImage = projectDetails[0]?.image || '/lg.gif'
  const queryParams = {
    type: 'edit',
    id: `${id}`,
  };
  const handleDelete = async () => {
    await deleteDoc(doc(db, "Projects", id as string));
    router.push('/')
  }
  const checkUser = () => {
    if (filtered2.length) {
      setUserFound(true);
    }
  }

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };
    loadProjects();
  }, [session]);
  useEffect(() => {
    if (session?.data?.user?.email && projects.length > 0) {
      const thisProjectDetails = projects.filter((pro: any) => pro.id === id);
      
      
      const filteredArray2 = projects.filter((pro: any) => session?.data?.user?.email === pro.email && pro.id === id);
      const filteredArray1 = userFound ? projects.filter((pro: any) => session?.data?.user?.email === pro.email && pro.id !== id)
        : projects.filter((pro: any) => thisProjectDetails[0]?.email === pro.email && pro.id !== id)
      setFiltered(filteredArray1);
      setFiltered2(filteredArray2);
      setProjectDetails(thisProjectDetails);
    }
  }, [projects, session, id]);
  useEffect(() => { checkUser() }, [filtered2])
  return (
    <div className='w-full h-[850px] bg-white opacity-100 rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <div className='w-full flex items-center justify-start pl-4 mt-4'>
          <Image
            className='rounded-full'
            alt='user-image'
            width={40}
            height={40}
            src={session?.data?.user?.image ? session?.data?.user?.image as string : '/lg.gif'}
          />
          <div className='ml-4'>
            <h3 className='font-bold text-xl'>{projectDetails[0]?.title}</h3>
            <div>
              {session.data?.user?.name && <span className='text-sm text-slate-700'>{session.data?.user?.name}</span>}
              <span className='mx-4 text-purple-700 text-sm'>{projectDetails[0]?.category}</span>
            </div>
          </div>
        </div>
        {userFound &&
          <div className='flex items-center pr-4 gap-3'>
            <Link href={{ pathname: '/create-project', query: queryParams }}>
              <Image width={25} height={25} alt="edit" src='/pencile.svg'
                className='rounded-md box-border p-[3px] bg-slate-300 mx-2 cursor-pointer' />
            </Link>
            <Image width={25} height={25} alt="edit" src='/trash.svg'
              className='rounded-md box-border p-[3px] bg-purple-700 mx-2 cursor-pointer' onClick={handleDelete} />
          </div>
        }
      </div>
      <div className='w-full flex items-center justify-center mt-10'>
        <Image
          width={600}
          height={600}
          alt='poster'
          src={projecImage}
          className='rounded-md w-[80%] h-[300px] sm:h-[400px] md:h-[500px]'
        />
      </div>
      <div className='w-full flex justify-center items-center mt-8 mb-[20px]'>
        <div className='w-[200px] flex flex-col'>
          <p>this is {projectDetails[0]?.title}</p>
          <div >
          <a href={projectDetails[0]?.githuburl} target="_blank" rel="noopener noreferrer" className='mx-2 text-xs text-purple-600 cursor-pointer'>Github</a>
          <a href={projectDetails[0]?.weburl}  target="_blank" rel="noopener noreferrer" className='mx-2 text-xs text-purple-600 cursor-pointer'>Live Site</a>
          </div>
        </div>
      </div>
      <RelatedProjects projects={filtered} session={session} />
    </div>
  )
}

export default Details