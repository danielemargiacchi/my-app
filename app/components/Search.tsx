'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)

    }, 300)
    return (
        <div className="relative flex flex-1 flex-shrink-0  w-full m-2">
            <div className="max-w-sm">
                {/* SearchBox */}
                <div className="relative">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                        <input
                            className=" py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:outline-1 focus:outline-black disabled:opacity-50 disabled:pointer-events-none"
                            type="text"
                            onChange={e => handleSearch(e.target.value)}
                            placeholder={placeholder}
                            defaultValue={searchParams.get('query')?.toString()}

                        />
                    </div>
                </div>
                {/* End SearchBox */}
            </div>
        </div>
    );
}
