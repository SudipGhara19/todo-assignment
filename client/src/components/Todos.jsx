import React, { useState } from 'react'
import { LuLoader } from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import EditTodoModal from './EditTodoModal';

function Todos({ todos, setTodos }) {


    const [isEditTodo, setIsEditTodo] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const handleEditTodo = (todo) => {
        setTodoToEdit(todo);
        setIsEditTodo(true);
    }


    return (
        <>
            <div className='h-auto w-full py-3 bg-zinc-300 mx-auto scroll-bar'>
                {todos.map((todo, i) =>
                    <div key={i} className='w-[90%] mx-5 my-2 px-3 py-2 bg text-zinc-800 bg-white rounded-md shadow-md flex gap-2 items-center group relative'>
                        {/* Display the loader or checkmark based on todoStatus */}
                        {todo.todoStatus === 'pending' ?
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
                            <MdDeleteSweep size={20} className='text-red-600 cursor-pointer' />
                            <span className={`text-[9px] px-2 py-1 text white rounded-sm cursor-pointer ${todo.todoStatus === 'pending' ? 'bg-[#29cc42]' : 'bg-[#eebe21]'}`}>
                                Mark {todo.todoStatus === 'pending' ? 'Complete' : 'Pending'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            {isEditTodo && <EditTodoModal showModal={setIsEditTodo} todo={todoToEdit} setTodos={setTodos} />}
        </>
    )
}

export default Todos
