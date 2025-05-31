"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { icons, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {

    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path: '/dashboard'

        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path: '/dashboard/expenses'
        },
    ]

    const path = usePathname();

    useEffect(() => {}, [path])

  return (
    <div className='h-screen p-6 border shadow-sm'>
        <Image
            src={'/logo.png'}
            alt='logo'
            width={130}
            height={70}
        />
        <div className='mt-5'>
            {menuList.map((menu, index) => (
                <Link href={menu.path} key={menu.id}>
                <h2 key={menu.id} className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md  mb-2 hover:text-primary  hover:bg-green-200 ${path==menu.path && 'text-primary && bg-green-300'  }`}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center font-semibold text-gray-600'>
            <UserButton/> User's Profile
        </div>
    </div>

  )
}

export default SideNav