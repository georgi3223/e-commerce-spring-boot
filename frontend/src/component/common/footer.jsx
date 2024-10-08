import React from "react";

import { NavLink } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="footer bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="footer-links mb-6 md:mb-0">
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                About Us
              </NavLink>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                Contact Us
              </NavLink>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                Terms & Conditions
              </NavLink>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                Privacy Policy
              </NavLink>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                FAQs
              </NavLink>
            </ul>
          </div>
      
          {/* Footer Info */}
          <div className="footer-info text-center">
            <p>&copy; 2024 Ecommerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    )
}
export default Footer;