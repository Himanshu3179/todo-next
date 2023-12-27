"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
const Header = () => {
    const session = useSession()
    const status = session.status
    return (
        <div className='flex justify-between p-3 bg-gray-200 w-full fixed top-0 z-50'>
            <Link href="/">Todo App</Link>
            {status === 'authenticated' && (
                <p className="text-blue-600" >{session?.data?.user?.name}</p>
            )}
            {status === 'authenticated' && (
                <button onClick={() => signOut()}>Sign Out</button>
            )}
            {status === 'unauthenticated' && (
                <button onClick={() => signIn(
                    'google',
                    { callbackUrl: 'http://localhost:3000/' }
                )}>Sign In</button>
            )}
        </div>
    )
}

export default Header