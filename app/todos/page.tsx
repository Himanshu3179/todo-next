import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import authOption, { User } from "../auth/authOption"
import SelectStatus from "./SelectStatus"
import TodoForm from "./TodoForm"
import { Status } from "@prisma/client"
import Calander from "./Calander"
import { Button } from "@radix-ui/themes"
const AllTodos = dynamic(() => import('./AllTodos'), {
    ssr: false,
})

interface Props {
    searchParams: {
        sortOrder: string,
        status: string
    }
}
const Todos = async ({ searchParams }: Props) => {

    const session = await getServerSession(authOption)
    const userId = (session?.user as User)?.id;

    if (!userId) {
        return <div>Not authenticated</div>
    }

    const todos = await prisma.todo.findMany({
        where:
        {
            userId: userId,
            status: searchParams.status as Status
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className='mx-5 mt-5 flex md:flex-row-reverse flex-col gap-4'>
            <Calander />
            <div className="flex flex-col items-center gap-5 max-w-2xl m-auto ">
                <TodoForm />
                <SelectStatus />
                <AllTodos todos={todos} sortOrder={searchParams.sortOrder} />
            </div>
        </div>
    )

}

export default Todos