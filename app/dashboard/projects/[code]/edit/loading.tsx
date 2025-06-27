export default function Loading(){
    return <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto animate-pulse">
  <div className="mx-auto max-w-2xl">
    <div className="text-center">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>

    <div className="mt-5 p-4 relative z-10 bg-white border border-gray-200 rounded-xl sm:mt-10 md:p-10">
      <div className="mb-4 sm:mb-8">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="mt-1">
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="mt-6 grid">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
}