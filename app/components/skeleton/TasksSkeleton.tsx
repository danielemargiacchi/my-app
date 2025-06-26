const TasksSkeleton = () => {
  return (
    <>
      <h3>Tasks</h3>
      <table className="min-w-full divide-y divide-gray-200 animate-pulse">
        <thead className="bg-gray-50">
          <tr>
            {["Task name", "Description", "Status", "Assignee", "Updated at", ""].map((label, idx) => (
              <th key={idx} scope="col" className="px-6 py-3 text-start">
                <div className="flex items-center gap-x-2">
                  <span className="text-xs font-semibold uppercase text-gray-300">{label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="bg-white">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TasksSkeleton
