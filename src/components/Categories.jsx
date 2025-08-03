import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    description: "Premium clothing for the modern gentleman",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop",
    productCount: 45,
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Women's Fashion",
    description: "Elegant styles for every occasion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    productCount: 62,
    color: "#EC4899"
  },
  {
    id: 3,
    name: "Footwear",
    description: "Comfortable and stylish shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    productCount: 28,
    color: "#8B5CF6"
  },
  {
    id: 4,
    name: "Accessories",
    description: "Complete your look with premium accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop",
    productCount: 34,
    color: "#F59E0B"
  },
  {
    id: 5,
    name: "Electronics",
    description: "Latest gadgets and technology",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    productCount: 23,
    color: "#10B981"
  },
  {
    id: 6,
    name: "Home & Living",
    description: "Beautiful items for your home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    productCount: 19,
    color: "#EF4444"
  }
];

const Categories = () => {
  console.log('Categories component rendering with', categories.length, 'categories');
  
  return (
    <section className="categories-section" style={{ backgroundColor: '#f0f0f0', padding: '40px 0' }}>
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title" style={{ color: '#333', fontSize: '2rem' }}>Shop by Category</h2>
          <p className="categories-subtitle" style={{ color: '#666' }}>Explore our curated collections and find exactly what you're looking for</p>
        </div>
        
        <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {categories.map((category) => (
            <div key={category.id} className="category-card" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="category-image-wrapper" style={{ position: 'relative', height: '200px' }}>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="category-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                  <div className="category-content" style={{ color: 'white', width: '100%' }}>
                    <h3 className="category-name" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{category.name}</h3>
                    <p className="category-description" style={{ marginBottom: '15px', opacity: 0.9 }}>{category.description}</p>
                    <div className="category-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="category-count" style={{ color: '#d4af37', fontWeight: 'bold' }}>{category.productCount} Products</span>
                      <button className="category-btn" style={{ backgroundColor: '#d4af37', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Explore</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 