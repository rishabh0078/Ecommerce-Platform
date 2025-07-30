import React from "react";

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ),
    title: "Free Shipping",
    desc: "On all orders over $50"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
    ),
    title: "24/7 Support",
    desc: "We’re here to help anytime"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>
    ),
    title: "Secure Payment",
    desc: "100% secure payment"
  }
];

const Benefit = () => (
  <section className="benefit-section">
    <div className="benefit-list">
      {benefits.map((b, i) => (
        <div key={i} className="benefit-card">
          <div className="benefit-card__icon">{b.icon}</div>
          <h3 className="benefit-card__title">{b.title}</h3>
          <p className="benefit-card__desc">{b.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Benefit;
