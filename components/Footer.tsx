import { footerLinks } from '@/constants'
import Image from 'next/image'
import React from 'react'
type FooterURLs = {
    title: string;
    links: string[];
}
const Footerurls = ({ title, links }: FooterURLs) => {
    return <ul>
        <li className='font-medium'>{title}</li>
        {links.map((link) => (
            <li className='text-slate-800 text-xs '>{link}</li>
        ))}
    </ul>
}
const Footer = () => {
    return (
        <div className='w-full flex flex-col relative  z-10 h-[700px] sm:h-[530px] md:h-[350]'>
            <hr className='w-full text-slate-200' />
            <div className='flex flex-col gap-3 px-4 mt-[30px]'>
                <Image
                    src='logo.svg'
                    alt='logo'
                    width={130}
                    height={130}
                />
                <p className='w-[300px] text-sm text-slate-800'>Flexabble is the worlds leading community for creatives to share, grow, and get hired</p>
            </div>
            <div className='flex flex-wrap mt-12 gap-14 px-4'>
                <div>
                    <Footerurls title={footerLinks[0].title} links={footerLinks[0].links} />
                </div>
                <div className='flex flex-col gap-4'>
                    <Footerurls title={footerLinks[1].title} links={footerLinks[1].links} />
                    <Footerurls title={footerLinks[2].title} links={footerLinks[2].links} />
                </div>
                <div>
                    <Footerurls title={footerLinks[3].title} links={footerLinks[3].links} />
                </div>
                <div className='flex flex-col gap-4'>
                    <Footerurls title={footerLinks[4].title} links={footerLinks[4].links} />
                    <Footerurls title={footerLinks[5].title} links={footerLinks[5].links} />
                </div>
                <div>
                    <Footerurls title={footerLinks[6].title} links={footerLinks[6].links} />
                </div>
            </div>
        </div>
    )
}

export default Footer