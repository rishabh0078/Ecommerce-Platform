import React from "react";
import img1 from '../assets/banner images/img1.jpg';

const HomeBanner = () => {
  const scrollToProducts = () => {
    const productsSection = document.querySelector('.product-grid-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="home-banner">
      <div 
        className="home-banner__carousel"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="home-banner__overlay">
          <div className="home-banner__content">
            <h1 className="home-banner__title">Spring / Summer Collection</h1>
            <p className="home-banner__desc">Get up to <span className="font-bold">30% Off</span> New Arrivals</p>
            <button onClick={scrollToProducts} className="home-banner__cta">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
