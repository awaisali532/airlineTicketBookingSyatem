import React from "react";
import "./footer.css";
import cart from "../../assets/img/footer/cart.png";
const Footer = () => {
  return (
    <div>
      <div className="footer-bottom mt-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="copyright-text">
                <p>
                  Copyright © 2022.All Rights Reserved By <span>FlyEase</span>
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cart-img text-end">
                <img src={cart} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
