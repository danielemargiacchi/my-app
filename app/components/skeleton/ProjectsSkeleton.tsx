export const ProjectsSkeleton = () => {
return (
        <div className="animate-pulse overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {["Project name", "Code", "Created at", "Updated at", ""].map((header, i) => (
                            <th key={i} scope="col" className="px-6 py-3 text-left">
                                <span className="text-xs font-semibold uppercase text-gray-800">{header}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {[...Array(5)].map((_, rowIndex) => (
                        <tr key={rowIndex} className="bg-white hover:bg-gray-50">
                            {[...Array(6)].map((_, colIndex) => (
                                <td key={colIndex} className="px-6 py-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};