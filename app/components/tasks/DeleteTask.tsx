"use client";
import { deleteTask } from "@/app/lib/data";
import { useState } from "react";

const DeleteTask = ({ id, projectCode }: { id: string, projectCode: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const action = async (formData: FormData)  => {
        await deleteTask(formData)
        setIsOpen(false);
    }

    return <>

        <div className="text-center">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center disabled:opacity-50 disabled:pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#777777"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" /></svg>
            </button>
        </div>
        {isOpen && (
            <div className="fixed inset-0 bg-[#7272729c] bg-opacity-40 z-50 flex items-center justify-center">
                {/* questo tienilo */}
                <div className="relative flex flex-col bg-white shadow-lg rounded-xl">
                    <div className="absolute top-2 end-2">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10 text-center overflow-y-auto">
                        {/* Icon */}
                        <span className="mb-4 inline-flex justify-center items-center size-15.5 rounded-full border-4 border-red-50 bg-red-100 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" /></svg>
                        </span>
                        {/* End Icon */}

                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                            Delete
                        </h3>
                        <p className="text-gray-500">
                            Are you sure you want to delete this task?
                        </p>

                        <form action={action} className="mt-6 flex justify-center gap-x-4">
                            <input name="projectCode" type="hidden" value={projectCode} />
                            <input name="id" type="hidden" value={id} />
                            <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
                                Yes. Delete.
                            </button>
                            <button onClick={(e)=> {
                                e.preventDefault();
                                setIsOpen(false)
                            }} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default DeleteTask;