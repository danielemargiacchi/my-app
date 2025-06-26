import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { fetchAllProjects } from "../lib/data";
import Link from "next/link";

const DashboardProjects = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = String(session?.user.id);

    const projects = await fetchAllProjects(userId);
    const createdProjects = projects?.createdProjects.slice(0, 3) || [];
    const accessProjects = projects?.projectAccess.slice(0, 3) || [];

    return <>
        <div className="flex flex-col md:flex-row gap-10">
            {/* Owned Projects */}
            <div className="w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-2">Owned</h3>
                <div className="flex flex-col gap-1.5 sm:gap-2.5">
                    {createdProjects?.map((p, i) => (
                        <Link
                            key={i}
                            className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition"
                            href={`/dashboard/projects/${p.projectCode}`}
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex gap-x-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                        <path d="M160-240v-480 520-40Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v200h-80v-200H447l-80-80H160v480h200v80H160ZM584-56 440-200l144-144 56 57-87 87 87 87-56 57Zm192 0-56-57 87-87-87-87 56-57 144 144L776-56Z" />
                                    </svg>
                                    <div className="grow flex justify-between items-center">
                                        <div>
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                {p.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {p.description}
                                            </p>
                                        </div>
                                        <span className="text-sm bg-gray-100 px-2 py-0.5 text-gray-800 rounded">
                                            {p.projectCode}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Accessed Projects */}
            <div className="w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-2">Accessed</h3>
                <div className="flex flex-col gap-3 sm:gap-6">
                    {accessProjects?.map((p, i) => (

                        <Link
                            key={i}
                            className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition"
                            href={`/dashboard/projects/${p.project.projectCode}`}
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex gap-x-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                        <path d="M160-240v-480 520-40Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v200h-80v-200H447l-80-80H160v480h200v80H160ZM584-56 440-200l144-144 56 57-87 87 87 87-56 57Zm192 0-56-57 87-87-87-87 56-57 144 144L776-56Z" />
                                    </svg>
                                    <div className="grow flex justify-between items-center">
                                        <div>
                                            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                                                {p.project.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {p.project.description}
                                            </p>
                                        </div>
                                        <span className="text-sm bg-gray-100 px-2 py-0.5 text-gray-800 rounded">
                                            {p.project.projectCode}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
        <div className="mt-6 flex justify-end">
            <Link href='/dashboard/projects' className="text-sm font-medium text-blue-600 hover:underline">
                View all →
            </Link>
        </div>

    </>
}

export default DashboardProjects;