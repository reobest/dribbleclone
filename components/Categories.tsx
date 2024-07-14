"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProjects } from '@/utils';
import Link from 'next/link';
import { generateRandomLikes, generateRandomViews } from '@/utils';
const Categories = () => {
    const router = useRouter()
    const session = useSession()
    const [projects, setProjects] = useState<any>([]);
    const [hover, setHover] = useState(false)
    const [hoverId, setHoverId] = useState('')
    const [originalProjects, setOriginalProjects] = useState<any>([]);
    const searchParams = useSearchParams();
    const field = searchParams.get('field');
    const handleDetails = (id: string) => {
        router.push(`/project/${id}`)
    }

    useEffect(() => {
        const loadProjects = async () => {
            const fetchedProjects = await fetchProjects();
            const projectsWithRandomStats = fetchedProjects.map((project: any) => ({
                ...project,
                likes: generateRandomLikes(),
                views: generateRandomViews()
            }));
            setProjects(projectsWithRandomStats);
            setOriginalProjects(projectsWithRandomStats);
        };
        loadProjects();
    }, []);
    useEffect(() => {
        if (field) {
            const filteredProjects = originalProjects.filter((project: any) => project.category === field);
            setProjects(filteredProjects);
        } else {
            setProjects(originalProjects);
        }
    }, [field, originalProjects]);

    return (
        <div className='w-full flex flex-wrap  items-center justify-center gap-6 p-2 cursor-pointer mt-10' >
            {projects && projects.map((project: any) => {
                return <div className='w-[250px] h-[220px] rounded-md relative' key={project.id} onClick={() => handleDetails(project.id)}
                 onMouseMove={() => {
                    setHover(true),
                        setHoverId(project.id)
                }}
                    onMouseLeave={() => setHover(false)}>
                    {hover && project.id == hoverId && <h1 className='text-white text-2xl absolute z-50 left-[15px] bottom-[80px]'>{project.title}</h1>}
                    {hover && project.id == hoverId && <div className='absolute top-0 
                    bottom-[50px] rounded-md right-0 left-0 bg-black opacity-10 flex justify-start items-end p-4'>
                    </div>}
                    <Image
                        onClick={() => handleDetails(project.id)}
                        src={project.image}
                        width={250}
                        height={250}
                        alt='project-img'
                        className='h-[170px] rounded-md'
                    />
                    <Link href={`/profile?email=${encodeURIComponent(project.email)}&id=${project.id}`}>
                        <div className='w-[250px] h-[50px] flex items-start justify-between text-xs mt-3'>
                            <span>{session.data?.user?.name || 'loading'}</span>
                            <span className='flex items-center justify-between'>
                                <Image width={10} height={10} alt="heart" src='/hearth.svg' className='mx-1' /> {project.views}
                            </span>
                            <span className='flex items-center justify-between'>
                                <Image width={10} height={10} alt="eye" src='/eye.svg' className='mx-1' />{project.likes}
                            </span>
                        </div></Link>
                </div>
            })}
        </div>
    )
}

export default Categories