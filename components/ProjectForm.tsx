"use client"
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import InputField from './InputField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants'
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { title } from 'process';
type Type = {
    type: (string | null);
    id: any;
}
const ProjectForm = ({ type, id }: Type) => {
    const router = useRouter()
    const sesssion = useSession()
    const [image, setImage] = useState<File | undefined>()
    const [missing, setMissing] = useState(false)
    const [form, setForm] = useState({
        image: '',
        title: '',
        description: '',
        weburl: '',
        githuburl: '',
        category: '',
    })
    const handlesubmit = async () => {
        if (form.image == '' || form.title == '' || form.description == '' || form.weburl == '' ||
            form.githuburl == '' || form.category == '') {
            setMissing(true)
            setTimeout(() => {
                setMissing(false)
            }, 4000);
            return
        }
        const formData: any = new FormData();
        formData.append('image', image);
        let imageUrl
        try {
            const response = await fetch('http://localhost:4001/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            imageUrl = data.imageUrl
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        const projectData = {
            image: imageUrl,
            title: form.title,
            description: form.description,
            weburl: form.weburl,
            githuburl: form.githuburl,
            category: form.category,
            email: sesssion.data?.user?.email,

        }
        const filteredProjectData = Object.fromEntries(
            Object.entries(projectData).filter(([key, value]) => value !== undefined)
        );
        try {
            if (type == 'create') {
                const docRef = await addDoc(collection(db, "Projects"), projectData);
                console.log("Document written with ID: ", docRef.id);
            } if (type == 'edit') {
                const docRef = doc(db, "Projects", `${id}`);
                await updateDoc(docRef, filteredProjectData)
            }
            router.push('/')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];
        setImage(file)


        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;
            setForm((prev) => ({ ...prev, image: result }))
        };

    };
    return (
        <div className='w-full h-[900px] flex flex-col items-center mt-16'>
            <div className='w-[350px] sm:w-[400px] md:w-[600px] h-[180px] flex justify-center items-center border-slate-400 border-[1px] rounded-md'>
                <label className=''>
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="absolute z-30 w-full opacity-0 h-[180px] cursor-pointer"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && <Image height={50} width={50} alt='form-image' src={form.image} />}
            </div>
            <InputField
                placeholder="flexibble"
                label="title"
                state={form.title}
                setstate={(value) => setForm((prev) => ({ ...prev, title: value }))} />
            <InputField
                placeholder="showcase and discover remarkable developer projects."
                label="description"
                state={form.description}
                setstate={(value) => setForm((prev) => ({ ...prev, description: value }))}
            />
            <InputField
                placeholder="https://example.com"
                label="weburl"
                state={form.weburl}
                setstate={(value) => setForm((prev) => ({ ...prev, weburl: value }))}
            />
            <InputField
                placeholder="https://example.com"
                label="githuburl"
                state={form.githuburl}
                setstate={(value) => setForm((prev) => ({ ...prev, githuburl: value }))}
            />
            <CustomMenu
                title="category"
                state={form.category}
                filters={categoryFilters}
                setstate={(value) => setForm((prev) => ({ ...prev, category: value }))}
            />
            <button onClick={handlesubmit} className='text-neutral-50 w-[200px] h-[40px] bg-violet-900 mt-[60px] text-[12px] rounded-md p-3 box-border flex justify-center items-center'>
                {type == 'create' ? "Create Project" : "Edit Project"}
            </button>
            {missing && <h1 className='w-[450px] h-[35px] text-white bg-red-600 rounded-md mt-12 flex justify-center items-center text-sm'>
                Please Fill Missing Fields
            </h1>}
        </div>
    )
}

export default ProjectForm