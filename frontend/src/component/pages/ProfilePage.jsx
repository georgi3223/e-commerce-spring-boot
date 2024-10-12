import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];

  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="profile-page max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {userInfo.name}</h2>

      {error ? (
        <p className="error-message text-red-500">{error}</p>
      ) : (
        <div>
          <div className="mb-4">
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {userInfo.phoneNumber}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold">Address</h3>
            {userInfo.address ? (
              <div>
                <p>
                  <strong>Street:</strong> {userInfo.address.street}
                </p>
                <p>
                  <strong>City:</strong> {userInfo.address.city}
                </p>
                <p>
                  <strong>State:</strong> {userInfo.address.state}
                </p>
                <p>
                  <strong>Zip Code:</strong> {userInfo.address.zipCode}
                </p>
                <p>
                  <strong>Country:</strong> {userInfo.address.country}
                </p>
              </div>
            ) : (
              <p>No Address information available</p>
            )}
            <button
              className="profile-button mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleAddressClick}
            >
              {userInfo.address ? "Edit Address" : "Add Address"}
            </button>
          </div>

          <h3 className="text-xl font-bold mb-2">Order History</h3>
          <ul className="space-y-4">
            {paginatedOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center bg-gray-100 p-4 rounded-lg shadow"
              >
                <img
                  src={order.product?.imageUrl}
                  alt={order.product.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p>
                    <strong>Name:</strong> {order.product.name}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${order.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
