"use client"
import { useState } from "react";
import { Task, User } from "../generated/prisma";
import { createTask } from "../lib/data";

const TaskModal = ({ task, users, projectId, projectCode }: { task?: Task, users?: User[], projectId: string, projectCode?: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="text-center">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                    Add task
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-[#7272729c] bg-opacity-40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add task</h2>

                        <form className="space-y-5" action={createTask}>
                            {/* PROJECT ID e PROJECT CODE NASCOSTI */}
                            <input type="hidden" value={projectId} name="projectId"/>
                            <input type="hidden" value={projectCode} name="projectCode"/>




                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Task name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={task?.name}
                                    placeholder="Task name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="Leave your comment here..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium mb-1">
                                    Status
                                </label>
                                <select name="status" id="status" defaultValue="TODO" className=" border border-gray-300 py-3 px-4 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                    <option value="TODO">TO DO</option>
                                    <option value="DONE">DONE</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="assignedUserId" className="block text-sm font-medium mb-1">
                                    User
                                </label>
                                <select name="assignedUserId" id="assignedUserId" className=" border border-gray-300 py-3 px-4 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                        <option value="">-</option>
                                    {users?.map(((u, i)=> {
                                        return <option value={u.id} key={i}>{u.username}</option>
                                    }))}
                                </select>
                            </div>





                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskModal;
