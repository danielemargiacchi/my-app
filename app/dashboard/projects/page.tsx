import Projects from "@/app/components/projects/Projects";
import { ProjectsSkeleton } from "@/app/components/skeleton/ProjectsSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Projects | ProjectTaskManager',
    description: 'The best app to manage your projects and tasks.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};


const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
       const searchParams = await props.searchParams;
    return (
        <>
            <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
                {/* Header + Button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Projects</h1>
                </div>

                {/* Projects grid */}
                <Suspense fallback={<ProjectsSkeleton />}>
                    <Projects searchParams={searchParams} />
                </Suspense>
            </div>
        </>
    );
}

export default Page;