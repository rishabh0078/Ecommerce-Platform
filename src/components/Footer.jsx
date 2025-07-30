import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <p>
        &copy; {new Date().getFullYear()} FashionCube. All rights reserved. Built with <span className="footer__love">♥</span> by Rishabh Chaudhary
      </p>
    </div>
  </footer>
);

export default Footer;
