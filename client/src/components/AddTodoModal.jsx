import React, { useState } from 'react';
import { FadeLoader } from 'react-spinners';

function AddTodoModal({ showModal, setTodos }) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // Handle input changes and update formData state
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSaveTodo = async () => {
        try {
            if (!formData.title || !formData.description) {
                return setMessage("Please fill all the fields.")
            }
            setLoading(true)
            setMessage("");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/todo-api/addTodo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.status === 201) {
                setTodos((prev) => [...prev, data.data]);
                setMessage("");
                setLoading(false)
                showModal(false);
            } else {
                setLoading(false)
                setMessage(data.message)
            }
        } catch (error) {
            setLoading(false);
            setMessage(error.message)
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 text-zinc-900 bg-black bg-opacity-90 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] md:w-[40%] p-6 rounded-lg shadow-lg relative">

                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    onClick={() => showModal(false)}
                >
                    &times;
                </button>

                <h2 className="text-2xl text-zinc-900 font-semibold mb-4 text-center">Add New Todo</h2>
                <div className="mb-4 flex flex-col gap-1">
                    <p className='text-zinc-800 font-semibold'>Title:</p>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-4 flex flex-col gap-1 mt-4">
                    <p className='text-zinc-800 font-semibold'>Description:</p>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                        placeholder="Enter description"
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={handleSaveTodo}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {loading ? <FadeLoader
                        height={4}
                        margin={-5}
                        radius={1}
                        speedMultiplier={1}
                        width={5}
                    /> : 'Add Todo'}
                </button>
                {message && <p className='text-center font-base my-4'>{message}</p>}
            </div>
        </div>
    );
}

export default AddTodoModal;
