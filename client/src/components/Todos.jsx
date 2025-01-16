import React, { useState } from 'react'
import { LuLoader } from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { RiErrorWarningLine } from 'react-icons/ri';
import EditTodoModal from './EditTodoModal';
import { FadeLoader } from 'react-spinners'

function Todos({ todos, setTodos }) {


    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [isEditTodo, setIsEditTodo] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    const handleEditTodo = (todo) => {
        setTodoToEdit(todo);
        setIsEditTodo(true);
    }

    const handleSetTodoToDelete = (t) => {
        setTodoToDelete(t);
        setDeleteModalVisible(true);
    }

    const handleDeleteTodo = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/todo-api/deleteTodo/${todoToDelete._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (res.status === 200) {
                setTodos((prev) => prev.filter((todo) => todo._id !== todoToDelete._id));
                setLoading(false)
                setDeleteModalVisible(false);
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }



    const handleChangeStatus = async (todo) => {
        try {
            setStatusLoading(true)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/todo-api/updateState/${todo._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (res.status === 200) {
                setTodos((prev) => {
                    // Update the todoState for the specific todo
                    return prev.map((item) =>
                        item._id === todo._id ? { ...item, todoState: data.data.todoState } : item
                    );
                });
                setStatusLoading(false)
            } else {
                setStatusLoading(false)
            }
        } catch (error) {
            setStatusLoading(false);
            console.log(error);
        }
    }


    return (
        <>
            <div className='h-full w-full py-3 bg-zinc-300 mx-auto scroll-bar'>
                {todos.map((todo, i) =>
                    <div key={i} className='w-[90%] mx-5 my-2 px-3 py-2 bg text-zinc-800 bg-white rounded-md shadow-md flex gap-2 items-center group relative'>
                        {/* Display the loader or checkmark based on todoStatus */}
                        {todo.todoState === 'pending' ?
                            <LuLoader size={25} className='flex-shrink-0 text-[#eebe21]' /> :
                            <IoCheckmarkDoneCircle size={28} className='flex-shrink-0 text-[#29cc42]' />
                        }

                        {/* Todo details */}
                        <div>
                            <h2 className='text-sm font-semibold mb-1'>{todo.title}</h2>
                            <p className='text-xs'>{todo.description}</p>
                        </div>

                        {/* Edit and Delete Icons - hidden by default, shown on hover */}
                        <div className='absolute right-2 top-1/2 flex gap-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <FiEdit3 onClick={() => handleEditTodo(todo)} size={20} className='text-blue-600 cursor-pointer mr-2' />
                            <MdDeleteSweep onClick={() => handleSetTodoToDelete(todo)} size={20} className='text-red-600 cursor-pointer' />
                            {statusLoading ? <span className='text-zinc-800 text-sm'>...</span> :
                                <span
                                    onClick={() => handleChangeStatus(todo)}
                                    className={`text-[9px] px-2 py-1 text-white rounded-sm cursor-pointer ${todo.todoState === 'completed' ? 'bg-[#eebe21]' : 'bg-[#29cc42]'}`}>
                                    Mark {todo.todoState === 'pending' ? 'Complete' : 'Pending'}
                                </span>}
                        </div>
                    </div>
                )}
            </div>
            {isEditTodo && <EditTodoModal showModal={setIsEditTodo} todo={todoToEdit} setTodos={setTodos} />}

            {deleteModalVisible && (
                <div className="fixed inset-0 text-zinc-900 bg-white bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[40%] p-6 rounded-lg shadow-lg relative flex flex-col items-center">
                        <button
                            className="absolute top-1 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                            onClick={() => setDeleteModalVisible(false)}
                        >
                            &times;
                        </button>
                        <RiErrorWarningLine className="inline-block text-gray-400" size={50} />
                        <h1 className='font-semibold text-center text-zinc-800 text-2xl my-4'>Want to delete this todo?
                        </h1>
                        <div className='flex justify-center gap-6'>
                            <button
                                disabled={loading}
                                onClick={handleDeleteTodo}
                                className='bg-red-500 px-5 py-2 my-4 font-semibold text-zinc-100 hover:text-white hover:bg-red-700 hover:scale-105 transition-all ease-in-out duration-300 rounded' >
                                {loading ? <FadeLoader
                                    height={4}
                                    margin={-5}
                                    radius={1}
                                    speedMultiplier={1}
                                    width={5}
                                /> : 'Yes, delete'}
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => setDeleteModalVisible(false)}
                                className='bg-gray-400 px-5 py-2 my-4 font-semibold text-zinc-800 hover:text-zinc-100 hover:bg-gray-700 hover:scale-105 transition-all ease-in-out duration-300 rounded' >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Todos
