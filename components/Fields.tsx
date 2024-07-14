import React from 'react'
import { categoryFilters } from '@/constants'
import Link from 'next/link'
const Fields = () => {

    const handlefileds = (field: string) => {
        const queryParams = {
            field: `${field}`,
        };
        return queryParams
    }
    return (
        <div className='overflow-x-auto w-full'>
            <ul className='flex w-max text-white'>
                {
                    categoryFilters?.map((field) => (
                        <Link href={{ pathname: '/', query: handlefileds(field) }}>
                            <li className='rounded-md bg-purple-700 w-[280px] h-[30px] flex justify-center 
                        items-center text-xs m-1 cursor-pointer' key={field}>
                                {field}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Fields