import { editProject, getProjectByCode } from "@/app/lib/data";

const Page = async (props: { params: Promise<{ code: string }> }) => {
        const params = await props.params;
        const code = params.code;
        const project = await getProjectByCode(code);
    return <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="mx-auto max-w-2xl">
    <div className="text-center">
      <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
        Edit project
      </h2>
    </div>

    {/* Card */}
    <div className="mt-5 p-4 relative z-10 bg-white border border-gray-200 rounded-xl sm:mt-10 md:p-10">
      <form action={editProject}>
        <input type="hidden" name="projectId" value={project?.id} />
        <input type="hidden" name="projectCode" value={project?.projectCode} />
        <div className="mb-4 sm:mb-8">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">Project name</label>
          <input defaultValue={project?.name} type="text" id="name" name="name" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Full name" />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium">Project description</label>
          <div className="mt-1">
            <textarea defaultValue={project?.description as string} id="description" rows={4} name="description"  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Leave your comment here..."></textarea>
          </div>
        </div>

        <div className="mt-6 grid">
          <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Edit</button>
        </div>
      </form>
    </div>
    {/* End Card */}
  </div>
</div>
{/* End Comment Form */}
}

export default Page;