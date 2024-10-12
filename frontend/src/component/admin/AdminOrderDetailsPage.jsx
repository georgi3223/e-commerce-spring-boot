import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      setMessage("order item status was successfully updated");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "unable  to update order item status"
      );
    }
  };

  return (
    <div className="order-details-page flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      {message && (
        <div className="message text-green-600 bg-green-100 border border-green-200 rounded-lg px-4 py-2 mb-4 text-sm">
          {message}
        </div>
      )}

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Order Details
      </h2>

      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div
            key={orderItem.id}
            className="order-item-details w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8"
          >
            <div className="info mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Order Information
              </h3>
              <p className="text-gray-600">
                <strong>Order Item ID:</strong> {orderItem.id}
              </p>
              <p className="text-gray-600">
                <strong>Quantity:</strong> {orderItem.quantity}
              </p>
              <p className="text-gray-600">
                <strong>Total Price:</strong> ${orderItem.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Order Status:</strong> {orderItem.status}
              </p>
              <p className="text-gray-600">
                <strong>Date Ordered:</strong>{" "}
                {new Date(orderItem.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="info mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                User Information
              </h3>
              <p className="text-gray-600">
                <strong>Name:</strong> {orderItem.user.name}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {orderItem.user.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {orderItem.user.phoneNumber}
              </p>
              <p className="text-gray-600">
                <strong>Role:</strong> {orderItem.user.role}
              </p>

              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Delivery Address
                </h3>
                <p className="text-gray-600">
                  <strong>Country:</strong> {orderItem.user.address?.country}
                </p>
                <p className="text-gray-600">
                  <strong>State:</strong> {orderItem.user.address?.state}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {orderItem.user.address?.city}
                </p>
                <p className="text-gray-600">
                  <strong>Street:</strong> {orderItem.user.address?.street}
                </p>
                <p className="text-gray-600">
                  <strong>Zip Code:</strong> {orderItem.user.address?.zipcode}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Product Information
              </h3>
              <img
                src={orderItem.product.imageUrl}
                alt={orderItem.product.name}
                className="w-32 h-32 object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-600">
                <strong>Name:</strong> {orderItem.product.name}
              </p>
              <p className="text-gray-600">
                <strong>Description:</strong> {orderItem.product.description}
              </p>
              <p className="text-gray-600">
                <strong>Price:</strong> ${orderItem.product.price.toFixed(2)}
              </p>
            </div>

            <div className="status-change">
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                Change Status
              </h4>
              <select
                className="status-option w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                value={selectedStatus[orderItem.id] || orderItem.status}
                onChange={(e) =>
                  handleStatusChange(orderItem.id, e.target.value)
                }
              >
                {OrderStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="update-status-button w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
                onClick={() => handleSubmitStatusChange(orderItem.id)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">Loading order details...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
