import React, { useState } from "react";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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
    name: "Premium Cotton Shirt",
    price: "Rs.3,500",
    originalPrice: "Rs.4,200",
    image: product1,
    rating: 4.5,
    reviews: 128,
    isNew: true,
    discount: "17% OFF"
  },
  {
    id: 2,
    name: "PlayStation 5 Pro",
    price: "Rs.100,000",
    originalPrice: "Rs.120,000",
    image: product2,
    rating: 4.8,
    reviews: 256,
    isNew: false,
    discount: "17% OFF"
  },
  {
    id: 3,
    name: "Nike Air Max Shoes",
    price: "Rs.4,500",
    originalPrice: "Rs.5,800",
    image: product3,
    rating: 4.6,
    reviews: 89,
    isNew: true,
    discount: "22% OFF"
  },
  {
    id: 4,
    name: "Designer Casual Shirt",
    price: "Rs.2,000",
    originalPrice: "Rs.2,500",
    image: product4,
    rating: 4.3,
    reviews: 67,
    isNew: false,
    discount: "20% OFF"
  },
  {
    id: 5,
    name: "Premium Denim Shirt",
    price: "Rs.3,600",
    originalPrice: "Rs.4,500",
    image: product5,
    rating: 4.4,
    reviews: 94,
    isNew: false,
    discount: "20% OFF"
  },
  {
    id: 6,
    name: "Classic White Shirt",
    price: "Rs.1,500",
    originalPrice: "Rs.2,000",
    image: product6,
    rating: 4.2,
    reviews: 156,
    isNew: false,
    discount: "25% OFF"
  },
  {
    id: 7,
    name: "Business Formal Shirt",
    price: "Rs.2,400",
    originalPrice: "Rs.3,200",
    image: product7,
    rating: 4.7,
    reviews: 203,
    isNew: true,
    discount: "25% OFF"
  },
  {
    id: 8,
    name: "Premium Denim Jeans",
    price: "Rs.2,000",
    originalPrice: "Rs.2,800",
    image: product8,
    rating: 4.5,
    reviews: 178,
    isNew: false,
    discount: "29% OFF"
  },
];

const ProductGrid = () => {
  const { addToCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState(null);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAddingToCart(product.id);
    try {
      await addToCart(product);
      alert('Item added to cart successfully!');
    } catch (error) {
      alert('Failed to add item to cart: ' + error.message);
    } finally {
      setAddingToCart(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#d1d5db' }}>★</span>);
    }

    return stars;
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid__header">
        <h2 className="product-grid__title">Products</h2>
        <p className="product-grid__subtitle">Discover our premium collection with exclusive deals</p>
      </div>
      <div className="product-grid__container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.isNew && (
              <div className="product-card__badge">NEW</div>
            )}
            <div className="product-card__img-wrap">
              <img src={product.image} alt={product.name} className="product-card__img" />
            </div>
            <div className="product-card__info">
              <h3 className="product-card__title">{product.name}</h3>
              
              <div className="product-card__rating">
                <div className="product-card__stars">
                  {renderStars(product.rating)}
                </div>
                <span className="product-card__rating-text">
                  ({product.reviews})
                </span>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <span style={{ 
                  color: '#e53e3e', 
                  fontSize: '20px', 
                  fontWeight: '700',
                  marginRight: '8px'
                }}>
                  {product.price}
                </span>
                <span style={{ 
                  color: '#9ca3af', 
                  fontSize: '16px', 
                  textDecoration: 'line-through',
                  fontWeight: '400'
                }}>
                  {product.originalPrice}
                </span>
              </div>
              
              <span style={{ 
                color: '#10b981', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                {product.discount}
              </span>
              
              <button 
                className="product-card__btn"
                onClick={() => handleAddToCart(product)}
                disabled={addingToCart === product.id || loading}
              >
                {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
