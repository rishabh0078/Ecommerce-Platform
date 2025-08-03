const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// API service functions
export const api = {
  // Auth endpoints
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Cart endpoints
  addToCart: async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item to cart');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get cart');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove item from cart');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}; 