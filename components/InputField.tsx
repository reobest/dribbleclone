import React from 'react'
type InputType = {
    placeholder: string;
    label: string;
    state: string;
    setstate: (value: string) => void;
}
const InputField = ({ placeholder, label, state, setstate }: InputType) => {
    return (
        <div className=' w-full flex  items-start justify-center mt-6'>
            <div className='w-[350px] sm:w-[400px] md:w-[600px] flex flex-col items-start'>
                <label>{label}</label>
                <input type='text' className='w-full h-[35px] mt-2 outline-none pl-3  border-slate-500 rounded-md bg-slate-200 text-sm'
                    placeholder={placeholder}
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                />
            </div>
        </div>
    )
}

export default InputField