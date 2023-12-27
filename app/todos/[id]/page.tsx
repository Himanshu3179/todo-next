import authOption from '@/app/auth/authOption';
import { todoSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';

import { getServerSession } from 'next-auth';
import EditForm from './EditForm';



interface Props {
    params: {
        id: string
    }
}

export default async function Todo({ params }: Props) {

    const session = await getServerSession(authOption)
    const userId = (session?.user as User)?.id;

    const todo = await prisma.todo.findUnique({ where: { id: params.id, userId: userId } })
    if (!todo) {
        return <div>Todo not found</div>
    }



    return (
        <div>
            <EditForm todo={todo} />
        </div>
    )
}

