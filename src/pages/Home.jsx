import React from 'react';
import HomeBanner from '../components/HomeBanner';
import Benefit from '../components/Benefit';
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  return (
    <>
      <HomeBanner />
      <Benefit />
      <Categories />
      <ProductGrid />
    </>
  );
};

export default Home; 