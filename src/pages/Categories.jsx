import React from 'react';
import Categories from '../components/Categories';

const CategoriesPage = () => {
  return (
    <div className="categories-page" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ paddingTop: '2rem' }}>
        <Categories />
      </div>
    </div>
  );
};

export default CategoriesPage; 