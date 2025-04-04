import React from "react";
import { useLocation } from "react-router-dom";
import "./SimpleHeader.css";
import bgImage from '../../assets/img/simpleHeader/bg.png';
import bg2 from '../../assets/img/simpleHeader/about.webp';
import bg3 from '../../assets/img/simpleHeader/contact.png';
import bg4 from '../../assets/img/simpleHeader/contact1.avif';
const SimpleHeader = () => {
  const location = useLocation();
  
  const pageContent = {
    '/login': {
      title: "Login to Your Account",
      image: `url(${bgImage})`
    },
    '/about': {
      title: "AboutUs",
      image: `url(${bg2})`
    },
    '/contact': {
      title: "Contact Us",
      image: `url(${bg4})`
    },
  };

  const currentContent = pageContent[location.pathname] || {
    title: "Welcome",
    image: `url(${bgImage})`
  };

  return (
    <section 
      className="simple-header-area"
      style={{ 
        backgroundImage: currentContent.image,
      }}
    >
      <div className="overlay"></div>
      <div className="container h-100">
        <div className="row align-items-center h-100 mx-0">
          <div className="col-12 text-white text-right">
            <div className="header-content">
              <h1 className="display-3 fw-bold mb-0">
                {currentContent.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeader;