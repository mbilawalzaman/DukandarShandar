import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="footer">
          <div className="text-info-div">
            <h1>Visit our Website and Enjoy Fast Shipping</h1>
            <p>
              Discover a world of amazing products and hassle-free shopping on
              our website.
            </p>
          </div>
          <div className="input-div">
            <input type="text" placeholder="Email address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
