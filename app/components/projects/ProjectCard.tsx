"use client";

import { Project } from "@/app/generated/prisma";
import Link from "next/link";

export const ProjectCard = ({project}: {project: Project}) => {
    return <Link
        className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition"
        href={`/dashboard/projects/${project.projectCode}`}
    >
        <div className="p-4 md:p-5">
            <div className="flex gap-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M160-240v-480 520-40Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v200h-80v-200H447l-80-80H160v480h200v80H160ZM584-56 440-200l144-144 56 57-87 87 87 87-56 57Zm192 0-56-57 87-87-87-87 56-57 144 144L776-56Z" />
                </svg>
                <div className="grow flex justify-between items-center">
                    <div>
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                            {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {project.description}
                        </p>
                    </div>
                    <span className="text-sm bg-gray-100 px-2 py-0.5 text-gray-800 rounded">
                        {project.projectCode}
                    </span>
                </div>
            </div>
        </div>
    </Link>
}