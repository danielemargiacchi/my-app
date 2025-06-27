import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { fetchAllProjects } from "../../lib/data";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

const DashboardProjects = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = String(session?.user.id);

    const projects = await fetchAllProjects(userId);
    const createdProjects = projects.filter(p => p.ownerId === userId).slice(0,3);
    const accessProjects = projects.filter(p => p.ownerId !== userId).slice(0,3);

    return <>
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Owned Projects */}
            <div className="w-full lg:w-1/2">
                <h3 className="text-xl font-bold mb-2">Owned</h3>
                <div className="flex flex-col gap-1.5 sm:gap-2.5">
                    {createdProjects?.map((p, i) => (
                        <ProjectCard project={p} key={i}/>
                    ))}
                </div>
            </div>

            {/* Accessed Projects */}
            <div className="w-full lg:w-1/2">
                <h3 className="text-xl font-bold mb-2">Accessed</h3>
                <div className="flex flex-col gap-3 sm:gap-6">
                    {accessProjects?.map((p, i) => (
                    <ProjectCard project={p} key={i}/>
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