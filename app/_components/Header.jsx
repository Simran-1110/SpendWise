"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'


function Header() {

  const {user, isSignedIn} = useUser();
  return (
    <>
        <div className="mainContainer h-full flex flex-col items-center justify-center border shadow-sm">
            <div className="head w-full flex justify-center">
                <header className="w-11/12 py-4 flex justify-between">
                    <div className="headerLogo">
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        width={135}
                        height={30}
                    />
                    </div>
          

            { isSignedIn ? <UserButton/>
            :<div className="navContact flex items-center justify-center space-x-2">
            <Image
                src={'/Notification.png'}
                alt="logo"
                width={45}
                height={45}
            />
            <Link href={'/sign-in'}>
            <button style={{backgroundColor: "#6fac6d"}} className="rounded-3xl text-white p-2.5">Login/Signup</button>
            </Link>
            </div>}
        
      </header>
    </div>
    </div>
    </>
  )
}

export default Header