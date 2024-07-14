import React from 'react'
import ProjectForm from './ProjectForm'

const Model = ({type,id} : {type : (string | null ),id: any}) => {
  return (
    <div className='w-full h-[90%]  bg-white opacity-100 rounded-md relative z-50'>
        <h3 className='w-full flex justify-center text-4xl mt-2 font-bold'>
          {type == 'create' ? "New Project" : "Edit Your Project"}
        </h3>
        <ProjectForm type={type} id={id}/>
    </div>
  )
}

export default Model