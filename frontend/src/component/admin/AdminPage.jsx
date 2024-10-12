import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Admin</h1>

      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button
          className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/admin/categories")}
        >
          Manage Categories
        </button>

        <button
          className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={() => navigate("/admin/products")}
        >
          Manage Products
        </button>

        <button
          className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={() => navigate("/admin/orders")}
        >
          Manage Orders
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
