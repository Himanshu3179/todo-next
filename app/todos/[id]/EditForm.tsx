"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { todoSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@radix-ui/themes';
import { traceGlobals } from 'next/dist/trace/shared';
import { Todo } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


type FormData = z.infer<typeof todoSchema>;


export default function EditForm({ todo }: { todo: Todo }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(todoSchema)
    });
    useEffect(() => {
        setValue('userId', todo.userId);
    }, [todo.userId, setValue]);

    const router = useRouter()
    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.put(`/api/todos/${todo.id}`, data)
            console.log(res.status === 201)
            toast.success('Todo updated successfully')
            router.push('/todos')
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const deleteTodo = async () => {
        try {
            const res = await axios.delete(`/api/todos/${todo.id}`)
            console.log(res.status === 201)
            toast.success('Todo deleted successfully')
            router.push('/todos')
            router.refresh()

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='flex flex-col items-center gap-5 py-10  px-5 max-w-xl m-auto rounded-lg border mt-16 '>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col'>
                <p className='font-bold mb-2'>Title</p>
                <input {...register('title', { required: true })}
                    type="text"
                    className='border border-gray-300 p-2 outline-none w-full bg-gray-100/50 rounded-md'
                    defaultValue={todo.title}
                />
                {errors.title && <p className='
                    text-red-500 italic
                '>
                    *{errors.title.message}
                </p>}
                <p className='font-bold mt-5'>Status</p>
                <select {...register('status', { required: true })} className="block w-full px-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue={todo.status}
                >
                    <option value="Open">Open</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                </select>
                {errors.status && <p className='
                    text-red-500 italic
                '>
                    *{errors.status.message}
                </p>}

                <button
                    className='mt-5 bg-blue-600 text-white rounded-md px-5 py-1 hover:bg-blue-700   '
                    type="submit">
                    Update
                </button>


            </form>
            <Button color='red' onClick={deleteTodo}>
                Delete
            </Button >
        </div>
    )
}
