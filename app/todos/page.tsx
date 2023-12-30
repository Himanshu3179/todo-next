import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import { Status } from "@prisma/client"
import dynamic from 'next/dynamic'
import authOption, { User } from "../auth/authOption"
import SelectStatus from "./SelectStatus"
import TodoForm from "./TodoForm"
import SignInButton from "../components/SignInButton"
import Image from "next/image"

const AllTodos = dynamic(() => import('./AllTodos'), {
    ssr: false,
})

interface Props {
    searchParams: {
        status: string,
    }
}
const Todos = async ({ searchParams }: Props) => {

    const session = await getServerSession(authOption)
    const userId = (session?.user as User)?.id;

    if (!userId) {
        return (<div className="h-screen flex justify-center items-center">

            <SignInButton className="rounded-full px-6 py-3 border border-gray-400 shadow-md flex gap-3 items-center">
                <Image src="/google.png" width={20} height={20} alt="google" />
                <p>
                    Sign In With Google
                </p>
            </SignInButton>
        </div >)
    }



    const todos = await prisma.todo.findMany({
        where:
        {
            userId: userId,
            status: searchParams.status as Status,
        },
        orderBy: { createdAt: 'desc' }
    })
    return (
        <div className='px-5 flex md:flex-row-reverse flex-col gap-4 w-screen pt-20'>
            <div className="flex flex-col items-center gap-5 w-full  
            ">
                <TodoForm />
                <SelectStatus />
                <AllTodos todos={todos} />
            </div>
        </div>
    )

}

export default Todos