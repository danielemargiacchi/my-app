"use client"
import { useState, useEffect } from "react";
import { Status, Task, User } from "../../generated/prisma";
import { createTask, editTask } from "../../lib/data";

const TaskModal = ({ type, task, users, projectId, projectCode }: {
    type: 'create' | 'edit',
    task?: Task,
    users?: User[],
    projectId: string,
    projectCode?: string
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // Stato locale per i campi
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'TODO' | 'DONE' | 'IN_PROGRESS'>('TODO');
    const [assignedUserId, setAssignedUserId] = useState('');

    // Popola lo stato quando task è presente (modal edit)
    useEffect(() => {
        if (type === 'edit' && task) {
            setName(task.name || '');
            setDescription(task.description || '');
            setStatus(task.status || 'TODO');
            setAssignedUserId(task.assignedUserId || '');
        }
    }, [type, task]);

    useEffect(()=>{
        if (!isOpen && type === 'create') {
          setName('');  
          setDescription('');  
          setStatus('TODO');  
          setAssignedUserId('');  
        }
    },[isOpen, type])

    const action = async (formData: FormData) => {
        setIsPending(true);
        if (type === 'create') {
            await createTask(formData);
            setIsPending(false);
            setIsOpen(!open);
        }else{
            await editTask(formData);
            setIsPending(false);
            setIsOpen(!open);
        }
    };





    return (
        <>
            <div className="text-center">
                {type === 'create' && (
                    <button onClick={() => setIsOpen(true)} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                        Add task
                    </button>
                )}
                {type === 'edit' && (
                    <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center gap-x-2 hover:cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                </button>
                )}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-[#7272729c] bg-opacity-40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg">
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{type === 'create' ? 'Add task' : 'Edit task'}</h2>

                        <form className="space-y-5" action={action}>
                            <input type="hidden" value={projectId} name="projectId" />
                            <input type="hidden" value={projectCode} name="projectCode" />
                            {type === 'edit' && (
                                <input type="hidden" value={task?.id} name="taskId" />
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Task name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Task name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Leave your comment here..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as Status)}
                                    className="border border-gray-300 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="TODO">TO DO</option>
                                    <option value="DONE">DONE</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="assignedUserId" className="block text-sm font-medium mb-1">User</label>
                                <select
                                    name="assignedUserId"
                                    id="assignedUserId"
                                    value={assignedUserId}
                                    onChange={(e) => setAssignedUserId(e.target.value)}
                                    className="border border-gray-300 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">-</option>
                                    {users?.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm transition disabled:bg-blue-400"
                                    disabled={isPending}
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
