import authOption from "@/app/auth/authOption";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { todoSchema } from "@/app/validationSchema";
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOption);
    if (!session) {
        console.log("unauthorized")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOption);
    if (!session) {
        console.log("unauthorized")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const validation = todoSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const todo = await prisma.todo.create({
        data: validation.data,
    });

    return NextResponse.json(todo, { status: 201 });
}

