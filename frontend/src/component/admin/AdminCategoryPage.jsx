import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AdminCategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        fetchCategories();
    }, [])

    const fetchCategories = async()=>{
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            console.log("Error fetching category list",  error)
        }
    }

    const handleEdit = async (id) => {
        navigate(`/admin/edit-category/${id}`)
    }
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are your sure you want to delete this category? ")
        if(confirmed){
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.log("Error deleting category by id")
            }
        }
    }

    return(
        <div className="admin-category-page flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
        <div className="admin-category-list w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
            <button
              onClick={() => navigate('/admin/add-category')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Category
            </button>
          </div>
      
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">{category.name}</span>
                <div className="admin-bt space-x-2">
                  <button
                    className="admin-btn-edit bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    )
}

export default AdminCategoryPage;