
"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

interface Props {
    className?: string,
    children: React.ReactNode,
}

export default function SignInButton({ className, children }: Props) {
    return (
        <button onClick={() => signIn(
            'google',
            { callbackUrl: 'http://localhost:3000/' }
        )}
            className={className}
        >
            {children}
        </button>
    )
}
