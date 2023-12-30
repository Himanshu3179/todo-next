"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
const Header = () => {
    const session = useSession()
    const status = session.status
    return (
        <div className='flex justify-between p-3 bg-gray-200 w-full fixed top-0 z-50 items-center'>
            <Link href="/"
                className='text-2xl font-bold text-red-600 hover:text-red-500'
            >Todo App</Link>
            {status === 'authenticated' && (
                <p className="text-blue-600" >{session?.data?.user?.name}</p>
            )}
            {status === 'authenticated' && (
                <button
                    className='bg-white rounded-full border px-4 py-1 shadow-md'
                    onClick={() => signOut()}>Sign Out</button>
            )}
            {status === 'unauthenticated' && (
                <SignInButton className='bg-white rounded-full border px-4 py-1 shadow-md'>
                    Sign In
                </SignInButton >
            )}
        </div >
    )
}

export default Header