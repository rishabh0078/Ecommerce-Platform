import React from "react";

const benefits = [
  {
    icon: (
      <svg className="benefit-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Premium Shipping",
    desc: "Complimentary express shipping on orders over $50",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: (
      <svg className="benefit-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
      </svg>
    ),
    title: "24/7 Premium Support",
    desc: "Dedicated customer care team available anytime",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: (
      <svg className="benefit-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure & Encrypted",
    desc: "Bank-level security for all your transactions",
    gradient: "from-rose-500 to-red-500"
  }
];

const Benefit = () => (
  <section className="benefit-section">
    <div className="benefit-container">
      <div className="benefit-header">
        <h2 className="benefit-title">Exclusive Benefits</h2>
        <p className="benefit-subtitle">Experience luxury shopping with our premium services</p>
      </div>
      <div className="benefit-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-card__icon-wrapper">
              <div className="benefit-card__icon">{benefit.icon}</div>
            </div>
            <div className="benefit-card__content">
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__desc">{benefit.desc}</p>
            </div>
            <div className="benefit-card__hover-effect"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefit;
