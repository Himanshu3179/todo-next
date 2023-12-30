import { Table } from "@radix-ui/themes"

import TodoStatusBadge from "../components/TodoStatusBadge"
import { Status, Todo } from "@prisma/client"
import { sort } from "fast-sort"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from "../components/Link"

// create type of array of todoSchema 


interface todos {
    todos: Todo[]
}
TimeAgo.addDefaultLocale(en)

export default function AllTodos({ todos }: todos) {
    const timeAgo = new TimeAgo('en-US')

    if (todos.length === 0) {
        return (
            <div className="w-full text-center">
                <h1 className="bg-bold">
                    No todos found
                </h1>
            </div>

        )
    }

    return (
        <div className="w-full bg-gray-50  rounded-lg shadow-lg border border-gray-200
        md:table 
        ">
            <div className="hidden md:table-row bg-gray-200">

                <div className="hidden md:table-cell p-2 font-bold flex-grow">Title</div>
                <div className="hidden md:table-cell p-2 font-bold flex-grow text-center">Status</div>
                <div className="hidden md:table-cell p-2 font-bold flex-grow ">Created At</div>
            </div>
            {todos.map(todo => (
                <div key={todo.id} className="border-b border-gray-200 md:table-row hover:bg-gray-100">
                    <div className="block md:hidden p-2">
                        <div className="text-gray-900 mb-2 text-lg ">
                            <Link href={`/todos/${todo.id}`}>
                                {todo.title}
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            <TodoStatusBadge todo={todo} />
                            <div className="text-sm ">{timeAgo.format(new Date(todo.createdAt))}</div>
                        </div>
                    </div>
                    <div className="hidden md:table-cell p-2 flex-grow ">
                        <Link href={`/todos/${todo.id}`}>
                            {todo.title}
                        </Link>
                    </div>
                    <div className="hidden md:table-cell p-2 flex-grow">
                        <TodoStatusBadge todo={todo} />
                    </div>
                    <div className="hidden md:table-cell p-2 flex-grow">{timeAgo.format(new Date(todo.createdAt))}</div>
                </div>
            ))}
        </div>
        // <div className="w-full bg-gray-50 rounded-lg shadow-lg border border-gray-200">
        //     {
        //         <div className="hidden md:table-row
        //         bg-gray-200
        //         ">
        //             <div className="hidden md:table-cell p-2 font-bold">Title</div>
        //             <div className="hidden md:table-cell p-2 font-bold">Status</div>
        //             <div className="hidden md:table-cell p-2 font-bold ">Created At</div>
        //         </div>
        //     }

        //     {todos.map(todo => (
        //         <div key={todo.id} className="border-b border-gray-200 md:table-row
        //         hover:bg-gray-100

        //         "
        //         >
        //             <div className="block md:hidden p-2">
        //                 <div className="text-gray-900 mb-2 text-lg">{todo.title}</div>
        //                 <div className="flex justify-between">
        //                     <TodoStatusBadge todo={todo} />
        //                     <div className="text-sm ">{timeAgo.format(new Date(todo.createdAt))}</div>
        //                 </div>
        //             </div>
        //             <div className="hidden md:table-cell p-3 ">{todo.title}</div>
        //             <div className="hidden md:table-cell p-2">
        //                 <TodoStatusBadge todo={todo} />
        //             </div>
        //             <div className="hidden md:table-cell p-2 ">{timeAgo.format(new Date(todo.createdAt))}</div>
        //         </div>
        //     ))}
        // </div>
    )
}

