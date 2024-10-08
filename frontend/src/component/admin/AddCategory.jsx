import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createCategory({name});
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(()=>{
                    setMessage('');
                    navigate("/admin/categories")
                }, 3000)
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a category")
        }
    }

    return(
        <div className="add-category-page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        {message && (
          <p className="message text-green-600 bg-green-100 border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm">
            {message}
          </p>
        )}
        
        <form
          onSubmit={handleSubmit}
          className="category-form w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Category</h2>
      
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
      
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </form>
      </div>
      
    )
}

export default AddCategory;