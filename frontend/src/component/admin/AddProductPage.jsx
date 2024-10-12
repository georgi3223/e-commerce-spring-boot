import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../service/ApiService";

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("categoryId", categoryId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      const response = await ApiService.addProduct(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "unable to upload product"
      );
    }
  };

  return (
    <div className="add-product-page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="product-form w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Add Product
        </h2>

        {message && (
          <div className="message text-green-600 bg-green-100 border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Product Image</span>
            <input
              type="file"
              onChange={handleImage}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:ring focus:ring-blue-200 focus:outline-none mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Category</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Product Name</span>
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Price</span>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProductPage;
