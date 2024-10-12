import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [searchStatus, currentPage]);

  const fetchOrders = async () => {
    try {
      let response;
      if (searchStatus) {
        response = await ApiService.getAllOrderItemsByStatus(searchStatus);
      } else {
        response = await ApiService.getAllOrders();
      }
      const orderList = response.orderItemList || [];

      setTotalPages(Math.ceil(orderList.length / itemsPerPage));
      setOrders(orderList);
      setFilteredOrders(
        orderList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "unable to fetch orders"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setStatusFilter(filterValue);
    setCurrentPage(1);

    if (filterValue) {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } else {
      setFilteredOrders(orders.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(orders.length / itemsPerPage));
    }
  };

  const handleSearchStatusChange = async (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="admin-orders-page flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h2>

      {error && (
        <p className="error-message text-red-600 bg-red-100 border border-red-200 rounded-lg px-4 py-2 mb-4 text-sm">
          {error}
        </p>
      )}

      <div className="filter-container w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="statusFilter mb-4">
          <label className="text-gray-700 font-medium">Filter By Status</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">All</option>
            {OrderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="searchStatus">
          <label className="text-gray-700 font-medium">Search By Status</label>
          <select
            value={searchStatus}
            onChange={handleSearchStatusChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">All</option>
            {OrderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="orders-table w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700 font-medium">
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Date Ordered</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-3 px-4 text-gray-600">{order.id}</td>
                <td className="py-3 px-4 text-gray-600">{order.user.name}</td>
                <td className="py-3 px-4 text-gray-600">{order.status}</td>
                <td className="py-3 px-4 text-gray-600">
                  ${order.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => handleOrderDetails(order.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        className="mt-8"
      />
    </div>
  );
};

export default AdminOrdersPage;
