import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch categories"
      );
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="category-list max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-left p-3 bg-gray-200 hover:bg-gray-300 rounded transition duration-200 flex justify-between items-center"
                >
                  {category.name}
                  <span className="text-gray-600">▶</span>{" "}
                  {/* Optional arrow icon */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
