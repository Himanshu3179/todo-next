"use client"
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';




export default function SelectStatus() {
    const router = useRouter()

    const [status, setStatus] = useState('all')

    useEffect(() => {
        router.refresh()
    }, [status, router])


    return (
        <div className='grid gap-2 
        grid-cols-2 sm:grid-cols-4
        '>
            <Button
                color='gray'
                onClick={() => {
                    setStatus('all')
                    router.push('/todos')
                }}
            >All</Button>
            <Button
                color='red'
                onClick={() => {
                    setStatus('open')
                    router.push('/todos?status=Open')
                }}
            >Open</Button>
            <Button
                color='yellow'
                onClick={() => {
                    setStatus('inProgress')
                    router.push('/todos?status=InProgress')
                }}
            >In Progress</Button>
            <Button
                color='green'
                onClick={() => {
                    setStatus('done')
                    router.push('/todos?status=Done')
                }}
            >Done</Button>


        </div>
    );

}
