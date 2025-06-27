import TasksSkeleton from "@/app/components/skeleton/TasksSkeleton";
import MyTasks from "@/app/components/tasks/MyTasks";
import { Suspense } from "react";

const Page = () => {
    return (
        <>
            <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
                {/* Header + Button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My tasks</h1>
                </div>

                {/* Projects grid */}
                <Suspense fallback={<TasksSkeleton />}>
                    <MyTasks />
                </Suspense>
            </div>
        </>
    );
}

export default Page;