"use client"
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

export default function AuthProvider({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
