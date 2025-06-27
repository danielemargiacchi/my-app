import ProjectTasks from "@/app/components/tasks/Tasks";
import { getProjectByCode, getTasksByProjectCode } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

const Page = async (props: { params: Promise<{ code: string }> }) => {
    const params = await props.params;
    const code = params.code;
    const project = await getProjectByCode(code);
    const tasks = await getTasksByProjectCode(code);

    const users = project?.users.map(u => u.user).concat(project.owner);

    return <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{project?.name}</h1>

        </div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <div>Code: <span className="text-sm bg-gray-100 px-2 py-0.5 text-gray-800 rounded">{project?.projectCode}</span></div>
                <p>{project?.description}</p>

            </div>

            <div className="w-auto gap-4 flex items-center justify-around">
                {users?.map((u, i) => {
                    return <div key={i} className="text-center">
                        <Image width={600} height={600} alt="user image" src={u.image || '/user.png'} className="rounded-full size-10 mx-auto" />
                        <div className="mt-2 sm:mt-4">
                            <h3 className="font-medium text-gray-800">
                                {u.username}
                            </h3>
                        </div>
                    </div>
                })}



            </div>
        </div>


        <Link href={`/dashboard/projects/${code}/edit`}>Edit project</Link>
        <ProjectTasks tasks={tasks?.tasks} users={users} projectId={project?.id as string} projectCode={project?.projectCode} />
    </div>
}

export default Page;