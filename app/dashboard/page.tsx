import { Suspense } from "react";
import { assigneeProject } from "../lib/data";
import Link from "next/link";
import { DashboardProjectsSkeleton } from "../components/skeleton/DashboardProjectsSkeleton";
import DashboardProjects from "../components/projects/DashboardProjects";

const Page = async () => {

    return (
        <>
            <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
                {/* Header + Button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Link
                        href="/dashboard/projects/create"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Create project
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                            <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
                        </svg>
                    </Link>
                </div>

                {/* Projects grid */}
                <Suspense fallback={<DashboardProjectsSkeleton />}>
                    <DashboardProjects />
                </Suspense>

                {/* Subscribe */}
                <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
                    <div className="max-w-xl text-center mx-auto">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Add existing project</h3>
                        </div>

                        <form action={assigneeProject}>
                            <div className="mt-3 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                                <div className="w-full">
                                    <label htmlFor="hero-input" className="sr-only">Go</label>
                                    <input type="text" id="projectCode" name="projectCode" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter project code" />
                                </div>
                                <button type="submit" className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* End Subscribe */}
            </div>
        </>
    );

}

export default Page;