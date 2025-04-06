import React from "react";
import "./footer.css";
import cart from "../../assets/img/footer/cart.png";
const Footer = () => {
  return (
    <div>
      <div class="footer-bottom mt-1">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="copyright-text">
                <p>
                  Copyright © 2022.All Rights Reserved By <span>FlyEase</span>
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="cart-img text-end">
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
