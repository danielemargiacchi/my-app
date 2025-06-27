import { Status, Task, User } from "../../generated/prisma";
import DeleteTask from "./DeleteTask";
import TaskModal from "./TaskModal";

type TaskWithUser = Omit<Task, "assignedUser"> & {
  assignedUser: User | null;
};

const ProjectTasks = ({
  tasks,
  users,
  projectId,
  projectCode,
}: {
  tasks?: TaskWithUser[];
  users?: User[];
  projectId: string;
  projectCode?: string;
}) => {
  return (
    <div className="mt-2 overflow-x-scroll">
      <h3 className="text-xl font-bold mb-2">Tasks</h3>
      <table className="min-w-full divide-y divide-gray-200 overflow-auto">
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
                  Assignee
                </span>
              </div>
            </th>

            <th scope="col" className="px-6 py-3 text-end"></th>
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
                  <span className="block px-6 py-2">
                    <span className="text-sm text-gray-600">
                      {t.assignedUser?.username}
                    </span>
                  </span>
                </td>
                <td className="size-px whitespace-nowrap">
                  <span className="px-6 py-1.5 flex gap-2">
                    <TaskModal
                      type='edit'
                      task={t}
                      users={users}
                      projectId={projectId}
                      projectCode={projectCode}
                    />
                    <DeleteTask projectCode={projectCode as string} id={t.id}/>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TaskModal
        type='create'
        users={users}
        projectId={projectId}
        projectCode={projectCode}
      />
    </div>
  );
};

export default ProjectTasks;

export const getStatusBadge = (status: Status) => {
  const nameMap: Record<Status, string> = {
    [Status.TODO]: "To do",
    [Status.IN_PROGRESS]: "In progress",
    [Status.DONE]: "Done",
  };

  const colorMap: Record<Status, string> = {
    [Status.TODO]: "bg-gray-100 text-gray-800",
    [Status.IN_PROGRESS]: "bg-yellow-100 text-yellow-800",
    [Status.DONE]: "bg-green-100 text-green-800",
  };

  return (
    <span className="inline-flex items-center gap-x-1 text-xs font-medium rounded-full px-3 py-1.5 transition">
      <span
        className={`inline-flex items-center gap-x-1 px-2 py-1 rounded-full ${colorMap[status]}`}
      >
        {status === 'DONE' && (
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 
            5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 
            1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            />
          </svg>
        )}
        {status === 'TODO' && (
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.854 5.646a.5.5 0 0 0-.708 0L7.5 8.293 6.354 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z" />
          </svg>

        )}
        {status === 'IN_PROGRESS' && (
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 1 .5.5v4.25l2.25 1.35a.5.5 0 1 1-.5.87l-2.5-1.5A.5.5 0 0 1 7.5 8V4a.5.5 0 0 1 .5-.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z" />
          </svg>

        )}

        {nameMap[status]}
      </span>
    </span>
  );
};
