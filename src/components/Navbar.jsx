import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        Fashion<span>Cube</span>
      </Link>
      <ul className="navbar__links">
        <li><Link to="/" className="navbar__link">Home</Link></li>
        <li><Link to="/category" className="navbar__link">Categories</Link></li>
        <li>
          <Link to="/cart" className="navbar__link">
            Cart
            {isAuthenticated && getCartItemCount() > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {getCartItemCount()}
              </span>
            )}
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="navbar__link">
              <span>Welcome, {user?.name}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="navbar__link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login" className="navbar__link">Login / Signup</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
