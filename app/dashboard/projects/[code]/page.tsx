import ProjectTasks from "@/app/components/Tasks";
import { getProjectByCode, getTasksByProjectCode } from "@/app/lib/data";

const Page = async ({ params }: { params: { code: string } }) => {
    const {code} = params;
    const project = await getProjectByCode(code);
    const tasks = await getTasksByProjectCode(code);
    
    const users = project?.users.map(u => u.user).concat(project.owner)

    return <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{project?.name}</h1>
        </div>
        <div>Code: <span className="text-sm bg-gray-100 px-2 py-0.5 text-gray-800 rounded">{project?.projectCode}</span></div>
        <p>{project?.description}</p>
        <ProjectTasks tasks={tasks?.tasks} users={users} projectId={project?.id as string} projectCode={project?.projectCode} />
    </div>
}

export default Page;