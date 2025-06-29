import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { fetchFilteredProjects } from "../../lib/data";
import Link from "next/link";
import Search from "../Search";

const Projects = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
})=> {

  const query = searchParams?.query || '';
  
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = String(session?.user.id);
  const allProjects = await fetchFilteredProjects(userId, query);

  return (
    <div className="overflow-x-auto">
      <Search placeholder="search by project name"/>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Project name", "Code", "Created at", "Updated at", ""].map((col, i) => (
              <th key={i} className={`px-4 py-3 text-left ${col ? "text-gray-800 font-semibold uppercase text-xs" : ""}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {allProjects.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap font-medium">{p.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="bg-gray-100 text-gray-800 rounded px-2 py-0.5">{p.projectCode}</span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-600">{p.createdAt.toDateString()}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-600">{p.updatedAt.toDateString()}</td>
              <td className="px-4 py-2 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  {p.ownerId === userId && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium">Owner</span>
                  )}
                  <Link href={`/dashboard/projects/${p.projectCode}`}>
                    <span className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-sm text-gray-700 bg-white hover:bg-gray-100 transition-all shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480.18-353.85q60.97 0 103.47-42.68t42.5-103.65q0-60.97-42.68-103.47t-103.65-42.5q-60.97 0-103.47 42.68t-42.5 103.65q0 60.97 42.68 103.47t103.65 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.96 0-236.88-70.73Q136.31-381.46 83.08-500q53.23-118.54 160.04-189.27T479.89-760q129.96 0 236.88 70.73Q823.69-618.54 876.92-500q-53.23 118.54-160.04 189.27T480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg> View
                    </span>
                  </Link>
                  <Link href={`/dashboard/projects/${p.projectCode}/edit`}>
                    <span className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-sm text-gray-700 bg-white hover:bg-gray-100 transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg> Edit
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
