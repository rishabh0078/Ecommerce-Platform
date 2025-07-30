import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar__brand">
      Fashion<span >Cube</span>
    </Link>
    <ul className="navbar__links">
      <li><Link to="/" className="navbar__link">Home</Link></li>
      <li><Link to="/category" className="navbar__link">Categories</Link></li>
      <li><Link to="/cart" className="navbar__link">Cart</Link></li>
      <li><Link to="/login" className="navbar__link">Login</Link></li>
    </ul>
  </nav>
);

export default Navbar;
