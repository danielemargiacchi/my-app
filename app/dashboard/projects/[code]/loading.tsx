export default function Loading() {
  return <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto animate-pulse">
    <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-48" />
    </div>
    <div className="mb-2 h-4 bg-gray-200 rounded w-32" />
    <div className="h-4 bg-gray-200 rounded w-full max-w-lg mb-6" />

    <div className="mt-8">
        <div className="h-5 w-24 bg-gray-200 rounded mb-4" />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {[...Array(5)].map((_, i) => (
                                <th key={i} className="px-6 py-3">
                                    <div className="h-3 bg-gray-200 rounded w-20" />
                                </th>
                            ))}
                            <th className="px-6 py-3 text-end" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...Array(5)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="bg-white">
                                {[...Array(5)].map((_, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded w-full max-w-[150px]" />
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-end">
                                    <div className="h-8 w-16 bg-gray-200 rounded" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
</div>
}