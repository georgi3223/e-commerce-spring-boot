import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ApiService from "../../service/ApiService";

const EditProductPage = () => {
  const { productId } = useParams();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

    if (productId) {
      ApiService.getProductById(productId).then((response) => {
        setName(response.product.name);
        setDescription(response.product.description);
        setPrice(response.product.price);
        setCategoryId(response.product.categoryId);
        setImageUrl(response.product.imageUrl);
      });
    }
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("productId", productId);
      formData.append("categoryId", categoryId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      const response = await ApiService.updateProduct(formData);
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
          "unable to update product"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="product-form w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Product
      </h2>

      {message && (
        <div className="text-green-600 bg-green-100 border border-green-200 rounded-lg px-4 py-2 mb-4">
          {message}
        </div>
      )}

      <input
        type="file"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer mb-4 focus:outline-none"
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg mb-4"
        />
      )}

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Update
      </button>
    </form>
  );
};

export default EditProductPage;
