import React from "react";
import product1 from '../assets/products/product1.jpg'
import product2 from '../assets/products/product2.jpg'
import product3 from '../assets/products/product3.jpg'
import product4 from '../assets/products/product4.jpg'
import product5 from '../assets/products/product5.jpg'
import product6 from '../assets/products/product6.jpg'
import product7 from '../assets/products/product7.jpg'
import product8 from '../assets/products/product8.jpg'
const products = [
  {
    id: 1,
    name: "Man's Shirt",
    price: "Rs.3500",
    image: product1,
  },
  {
    id: 2,
    name: "PS5 PRO",
    price: "Rs.100000",
    image: product2,
  },
  {
    id: 3,
    name: "Nike Shoes",
    price: "Rs.4500",
    image: product3,
  },
  {
    id: 4,
    name: "Shirt",
    price: "Rs.2000",
    image: product4,
  },
  {
    id: 5,
    name: "Shirt ",
    price: "Rs.3600",
    image: product5,
  },
  {
    id: 6,
    name: "Shirt",
    price: "Rs.1500",
    image: product6,
  },
  {
    id: 7,
    name: "Shirt",
    price: "Rs.2400",
    image: product7,
  },
  {
    id: 8,
    name: "Man's Jeans ",
    price: "Rs.2000",
    image: product8,
  },
];

const ProductGrid = () => (
  <section className="product-grid-section">
    <div className="product-grid__container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-card__img-wrap">
            <img src={product.image} alt={product.name} className="product-card__img" />
          </div>
          <div className="product-card__info">
            <h3 className="product-card__title">{product.name}</h3>
            <p className="product-card__price">{product.price}</p>
            <button className="product-card__btn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductGrid;
