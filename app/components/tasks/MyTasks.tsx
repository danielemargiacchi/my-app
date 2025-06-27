import { getAllUserTasks } from "@/app/lib/data";
import { getStatusBadge } from "./Tasks";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const MyTasks = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = String(session?.user.id);
    const tasks = await getAllUserTasks(userId);
    console.log(tasks);
    


    return (
        <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase text-gray-800">
                                    Task name
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase text-gray-800">
                                    Description
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase text-gray-800">
                                    Status
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase text-gray-800">
                                    Project 
                                </span>
                            </div>
                        </th>

                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {tasks?.map((t, i) => {
                        return (
                            <tr key={i} className="bg-white hover:bg-gray-50">
                                <td className="size-px whitespace-nowrap">
                                    <span className="block px-6 py-2">
                                        <span className="text-sm font-medium">
                                            {t.name}
                                        </span>
                                    </span>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    <span className="block px-6 py-2">
                                        <span className="text-sm text-gray-600">
                                            {t.description}
                                        </span>
                                    </span>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    {getStatusBadge(t.status)}
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    {t.project.name}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div> 
    );
};

export default MyTasks;

