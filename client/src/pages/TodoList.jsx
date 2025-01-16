import React, { useEffect, useState } from 'react';
import { LuListTodo } from "react-icons/lu";
import Todos from '../components/Todos';
import { IoIosAddCircle } from "react-icons/io";
import AddTodoModal from '../components/AddTodoModal';
import { FadeLoader } from 'react-spinners';

function TodoList() {

    const [todos, setTodos] = useState(null);
    const [message, setMessage] = useState("")
    const [isAddTodo, setIsAddTodo] = useState(false);



    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/todo-api/getAll`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const data = await res.json();
                if (res.status === 200) {
                    setTodos(data.data);
                    setMessage("");
                } else {
                    setMessage(data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchTodos()
    }, []);




    return (
        <>
            <div className="w-screen h-screen py-5">
                <div className="h-auto w-full mx-auto flex flex-col items-center max-w-screen-xl">
                    <div className="w-[60%] h-[80vh] max-h-[80vh] m-10 flex flex-col justify-start bg-white rounded-md">
                        <div className="sticky top-0 mx-auto flex items-center justify-between gap-1 p-4 border-b-[1px] border-zinc-800 w-full bg-white z-10">
                            <div className='flex gap-2 items-center '>
                                <LuListTodo className="text-sky-600 mt-1" size={30} />
                                <h1 className="text-zinc-800 font-bold text-xl">Todo List</h1>
                            </div>
                            <div className='transform -translate-y-10 translate-x-10 bg-zinc-900 p-1 rounded-full'>
                                <IoIosAddCircle
                                    onClick={() => setIsAddTodo(true)}
                                    className="text-green-500 mt-1 hover:text-green-600 hover:scale-105 transition-all duration-200 ease-in-out" size={65} />
                            </div>
                        </div>

                        {/* Make the Todo section scrollable */}
                        <div className="overflow-auto h-full">
                            {!todos ? <FadeLoader className='h-2 w-2'
                                height={4}
                                margin={-5}
                                radius={1}
                                speedMultiplier={1}
                                width={5}
                            /> :
                                <Todos todos={todos} setTodos={setTodos} />}
                        </div>
                    </div>
                </div>
            </div>
            {isAddTodo && <AddTodoModal showModal={setIsAddTodo} setTodos={setTodos} />}
        </>
    );
}

export default TodoList;
