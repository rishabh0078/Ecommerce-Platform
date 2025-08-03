import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCart();
      setCart(data.cart || []);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const productData = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      const data = await api.addToCart(productData);
      setCart(data.cart || []);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      
      const data = await api.removeFromCart(productId);
      setCart(data.cart || []);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      
      // First remove the item
      await api.removeFromCart(productId);
      
      // Then add it back with new quantity
      const product = cart.find(item => item.productId === productId);
      if (product) {
        const productData = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        };
        
        const data = await api.addToCart(productData);
        setCart(data.cart || []);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('Rs.', '').trim());
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 