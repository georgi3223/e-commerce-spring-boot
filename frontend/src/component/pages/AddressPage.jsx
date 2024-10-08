import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddressPage = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/edit-address") {
      fetchUserInfo();
    }
  }, [location.pathname]);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      if (response.user.address) {
        setAddress(response.user.address);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "unable to fetch user information"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.saveAddress(address);
      navigate("/profile");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to save/update address"
      );
    }
  };

  return (
    <div className="address-page max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {location.pathname === "/edit-address" ? "Edit Address" : "Add Address"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Street:</span>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">City:</span>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">State:</span>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Zip Code:</span>
          <input
            type="text"
            name="zipcode"
            value={address.zipCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Country:</span>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300"
        >
          {location.pathname === "/edit-address"
            ? "Edit Address"
            : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
