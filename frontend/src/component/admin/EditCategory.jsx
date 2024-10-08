import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.category.name);

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to get a category by id")
            setTimeout(() => {
                setMessage('');
            }, 3000)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.updateCategory(categoryId, { name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories")
                }, 3000)
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a category")
        }
    }

    return (
        <div className="add-category-page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        {message && (
          <p className="text-green-600 bg-green-100 border border-green-200 rounded-lg px-4 py-2 mb-6 text-sm">
            {message}
          </p>
        )}
      
        <form
          onSubmit={handleSubmit}
          className="category-form w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Category</h2>
      
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
      
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
      
    )

}

export default EditCategory;