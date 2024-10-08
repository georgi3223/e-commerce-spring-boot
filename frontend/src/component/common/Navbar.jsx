import React, {useState} from "react";

import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


const Navbar = () =>{

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange =(e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) =>{
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout? ");
        if(confirm){
            ApiService.logout();
            setTimeout(()=>{
                navigate('/login')
            }, 500);
        }
    }

    return(
        <nav className="navbar bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* SEARCH FORM */}
          <form className="navbar-search flex flex-grow max-w-md" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-r-lg py-2 px-4 hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
      
          {/* Navigation Links */}
          <div className="navbar-links flex space-x-6">
            <NavLink to="/" className="hover:text-blue-600 transition duration-300">
              Home
            </NavLink>
            <NavLink to="/categories" className="hover:text-blue-600 transition duration-300">
              Categories
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/profile" className="hover:text-blue-600 transition duration-300">
                My Account
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className="hover:text-blue-600 transition duration-300">
                Admin
              </NavLink>
            )}
            {!isAuthenticated && (
              <NavLink to="/login" className="hover:text-blue-600 transition duration-300">
                Login
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink onClick={handleLogout} className="hover:text-blue-600 transition duration-300">
                Logout
              </NavLink>
            )}
            <NavLink to="/cart" className="hover:text-blue-600 transition duration-300">
              Cart
            </NavLink>
          </div>
        </div>
      </nav>
      
    );

};
export default Navbar;