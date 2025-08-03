import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = api.getCurrentUser();
        if (currentUser && api.isAuthenticated()) {
          // Verify token is still valid
          try {
            await api.getProfile();
            setUser(currentUser);
          } catch (error) {
            // Token is invalid, clear storage
            api.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await api.login(credentials);
      setUser({
        id: data.id,
        name: data.name,
        email: data.email
      });
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await api.register(userData);
      setUser({
        id: data.id,
        name: data.name,
        email: data.email
      });
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 