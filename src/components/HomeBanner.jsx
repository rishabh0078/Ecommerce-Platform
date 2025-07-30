import React from "react";
import img1 from '../assets/banner images/img1.jpg';

const HomeBanner = () => (
  <section className="home-banner">
    <div className="home-banner__carousel">
      <div className="home-banner__overlay">
        <div className="home-banner__content">
          <h1 className="home-banner__title">Spring / Summer Collection</h1>
          <p className="home-banner__desc">Get up to <span className="font-bold">30% Off</span> New Arrivals</p>
          <a href="#shop" className="home-banner__cta">Shop Now</a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeBanner;
