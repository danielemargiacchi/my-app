export const DashboardProjectsSkeleton = () => {
    return <div className="flex flex-col md:flex-row gap-10 animate-pulse">
  {/*Owned Projects */}
  <div className="w-full md:w-1/2">
    <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="flex flex-col gap-3 sm:gap-6">
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex gap-x-5">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="grow flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-3 bg-gray-100 px-2 py-0.5 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/*Accessed Projects */ }
  <div className="w-full md:w-1/2">
    <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="flex flex-col gap-3 sm:gap-6">
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex gap-x-5">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="grow flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-3 bg-gray-100 px-2 py-0.5 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}