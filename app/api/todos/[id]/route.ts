import authOption from "@/app/auth/authOption";
import { todoSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: {
        id: string
    }
}

export async function PUT(req: NextRequest, { params }: Props) {
    const session = await getServerSession(authOption);
    if (!session) {
        console.log("unauthorized")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const defaultTodo = await prisma.todo.findUnique({
        where: {
            id: params.id,
        },
        select: {
            userId: true,
            title: true,
            status: true,
        },
    });

    // merge data of defaultTodo and body
    const data = {
        ...defaultTodo,
        ...body,
    };

    

    const validation = todoSchema.safeParse(data);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    let todo;
    try {
        todo = await prisma.todo.update({
            where: {
                id: params.id,
            },
            data: validation.data,
        });
    } catch (error) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: Props) {
    const session = await getServerSession(authOption);
    if (!session) {
        console.log("unauthorized")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let todo;
    try {
        todo = await prisma.todo.delete({
            where: {
                id: params.id,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 201 });
}