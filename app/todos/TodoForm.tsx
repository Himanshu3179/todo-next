"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { User } from '../auth/authOption';
import { todoSchema } from '../validationSchema';
// import { User } from '@/app/auth/authOption'
type FormData = z.infer<typeof todoSchema>;

const TodoForm = () => {
    const session = useSession();
    const userId = (session?.data?.user as User)?.id;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(todoSchema),
    });
    const router = useRouter()

    if (session.status === 'unauthenticated') {
        return (
            <div>
                <h1>You are not authenticated</h1>
            </div>
        )
    }

    if (session.status === 'loading') {
        return <div>Loading...</div>
    }

    const onSubmit = async (data: FormData) => {
        console.log(data)
        try {
            const response = await axios.post('/api/todos', data);
            console.log(response)
            toast.success('Todo created successfully')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
        reset();
        router.refresh();
    }
    return (
        <   >

            <form onSubmit={handleSubmit(onSubmit)}
                className='flex gap-2 w-full '
            >
                <TextField.Root className='w-full shadow-md' size={'3'}>
                    <TextField.Input placeholder="Create a new todo..."

                        className='w-fit'
                        {...register('title')}
                    />
                </TextField.Root>
                <input type="hidden" {...register('userId')}
                    defaultValue={userId}
                />
                <button type='submit'
                    className='bg-blue-600 px-3 py-2 text-white font-semibold shadow-lg rounded-md border '>
                    Add
                </button>

            </form>
            {
                errors.title && <p className='text-red-500 italic underline'>*{errors.title?.message}</p>
            }
        </>

    )
}

export default TodoForm