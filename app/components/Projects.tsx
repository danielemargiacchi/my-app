import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { fetchAllProjects } from "../lib/data";
import Link from "next/link";

const Projects = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = String(session?.user.id);
  const projects = await fetchAllProjects(userId);

  const createdProjects = projects?.createdProjects ?? [];
  const accessProjects = projects?.projectAccess?.map(p => p.project) ?? [];
  const allProjects = [...createdProjects, ...accessProjects];

  return (
    <div className="overflow-x-auto">
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
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480.18-353.85q60.97 0 103.47-42.68t42.5-103.65q0-60.97-42.68-103.47t-103.65-42.5q-60.97 0-103.47 42.68t-42.5 103.65q0 60.97 42.68 103.47t103.65 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.96 0-236.88-70.73Q136.31-381.46 83.08-500q53.23-118.54 160.04-189.27T479.89-760q129.96 0 236.88 70.73Q823.69-618.54 876.92-500q-53.23 118.54-160.04 189.27T480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg> View
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
