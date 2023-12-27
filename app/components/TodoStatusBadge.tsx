"use client"
import { Todo } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

// type Status = "Open" | "InProgress" | "Done"
const statusMap: Record<string, { label: string, color: 'red' | 'green' | 'yellow' }> = {
    Open: {
        label: 'Open',
        color: 'red'
    },
    InProgress: {
        label: 'In Progress',
        color: 'yellow'
    },
    Done: {
        label: 'Done',
        color: 'green'
    }
}

const TodoStatusBadge = ({ todo }: { todo: Todo }) => {
    const router = useRouter()
    let status = todo.status
    const toggleStatus = async () => {
        switch (status) {
            case 'Open':
                status = 'InProgress'
                break;
            case 'InProgress':
                status = 'Done'
                break;
            case 'Done':
                status = 'Open'
                break;
            default:
                break;
        }
        toast.loading('Updating status...')
        try {
            const res = await axios.put(`/api/todos/${todo.id}`, { status })
            console.log(res)
            toast.dismiss()
            toast.success('Status updated')
            router.refresh()

        }
        catch {
            console.log('Something went wrong')
            toast.dismiss()
            toast.error('Something went wrong')
        }
    }
    return (
        <div onClick={toggleStatus} className='cursor-pointer flex items-center justify-center'>
            <Badge color={statusMap[status]?.color} >
                {statusMap[status]?.label}
            </Badge>
        </div>

    )
}

export default TodoStatusBadge