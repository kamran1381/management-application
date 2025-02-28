'use client'
import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
    const path = usePathname();
    const router = useRouter();



    return (
        <div className='w-full flex flex-col items-center mx-10 mt-14 lg:w-60 lg:items-start'>
            <div className='w-full'>

            </div>
            <div className='w-full flex flex-col items-center space-y-10 mt-8 text-base lg:text-sm'>
                <Link href='users' className={`${path === '/userpanel/users' ? 'text-red-500' : 'text-white'}`}>
                    users
                </Link>
                <Link href='newprogram' className={`${path === '/userpanel/newprogram' ? 'text-red-500' : 'text-white'}`}>
                    Add program
                </Link>
                <Link href='program' className={`${path === '/userpanel/program' ? 'text-red-500' : 'text-white'}`}>
                    programs
                </Link>
                <Link href='newexcersice' className={`${path === '/userpanel/newexcersice' ? 'text-red-500' : 'text-white'}`}>
                    add new exercise
                </Link>
                <Link href='excersise' className={`${path === 'userpanel/excersise' ? 'text-red-500' : 'text-white'}`}>
                    exercises
                </Link>
                <Link href='/' className={`${path === '/' ? 'text-red-500' : 'text-white'}`}>
                    signout
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
