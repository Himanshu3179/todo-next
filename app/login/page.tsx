
"use client"
import { Button } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import React from 'react'

const LoginPage = () => {
    
    return (
        <div>
            <Button
                onClick={() => {
                    signIn('google', { callbackUrl: 'http://localhost:3000/' })
                }}
            >Login</Button>
        </div>
    )
}

export default LoginPage