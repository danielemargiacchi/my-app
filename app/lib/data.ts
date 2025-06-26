"use server";
import { PrismaClient, Status } from "../generated/prisma";
import { generateProjectCode } from "./utils";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();


export const createProject = async (formData: FormData) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = String(session?.user.id);


    const name = String(formData.get('name'));
    const description = String(formData.get('description'));

    try {
        await prisma.project.create({
            data: {
                name: name,
                description: description,
                projectCode: generateProjectCode(),
                owner: {
                    connect: { id: userId },
                },
            },
        })

    } catch (error) {
        console.error("Error during project creation:", error);
    }

    redirect("/dashboard");



}


export const assigneeProject = async (formData: FormData) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = String(session?.user.id);

    const projectCode = String(formData.get('projectCode'))

    // fare il controllo se esiste il project code

    await prisma.projectUser.create({
        data: {
            user: {
                connect: { id: userId },
            },
            project: {
                connect: { projectCode: projectCode },
            },
        },
    })
}


export const fetchAllProjects = async (userId: string) => {

    const data = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            projectAccess: {
                include: {
                    project: true,
                },
            },
            createdProjects: true
        },
    })

    return data;
}


export const getProjectByCode = async (projectCode: string) => {
    const data = await prisma.project.findUnique({
        where: {
            projectCode: projectCode
        },
        include: {
            tasks: true,
            users: {
                include: {
                    user: true,
                },
            },
            owner: true,
        },
    })

    return data;
}

export const getTasksByProjectCode = async (projectCode: string) => {
    const data = await prisma.project.findUnique({
        where: {
            projectCode: projectCode,
        },
        select: {
            id: true,
            tasks: {
                include: {
                    assignedUser: true,
                },
            },
        },
    });


    return data;
}

export const getAllUserTasks = async (userId: string) => {
    
    const tasks = await prisma.task.findMany({
        where: {
            assignedUserId: userId, 
        },
        include: {
            project: true, 
        },
    });

    return tasks;
}


export const createTask = async (formData: FormData) => {
    const name = String(formData.get('name'));
    const description = String(formData.get('description'));
    const status = formData.get('status') as Status;
    const projectId = String(formData.get('projectId'));
    const assignedUserId = String(formData.get('assignedUserId'));
    
    const projectCode = String(formData.get('projectCode'));
    
    try {
         await prisma.task.create({
            data: {
                name: name,
                description: description,
                status: status,
                projectId: projectId,
                assignedUserId: assignedUserId || null
            },
        })
    } catch (error) {
        console.error(error)
    }

    redirect(`/dashboard/projects/${projectCode}`)

    


}