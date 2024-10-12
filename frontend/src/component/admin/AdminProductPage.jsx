import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = async (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are your sure you want to delete this product? "
    );
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "unable to delete product"
        );
      }
    }
  };

  return (
    <div className="admin-product-list flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      {error ? (
        <p className="text-red-600 bg-red-100 border border-red-200 rounded-lg px-4 py-2 mb-6 text-sm">
          {error}
        </p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => navigate("/admin/add-product")}
            >
              Add Product
            </button>
          </div>

          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border-b py-4"
              >
                <span className="text-gray-800 font-medium">
                  {product.name}
                </span>
                <div className="space-x-4">
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminProductPage;
