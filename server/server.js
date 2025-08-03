import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data stores (in a real app, you would use a database)
let users = [];
let carts = {};

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Routes

// User registration
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    };

    users.push(user);

    // Initialize empty cart for user
    carts[user.id] = [];

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile (protected route)
app.get('/api/users/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = users.find(user => user.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Add item to cart
app.post('/api/cart/add', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const userId = decoded.id;

    const { productId, name, price, image, quantity = 1 } = req.body;

    // Initialize cart for user if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }

    // Check if product already in cart
    const existingItemIndex = carts[userId].findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      // Update quantity
      carts[userId][existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      carts[userId].push({
        productId,
        name,
        price,
        image,
        quantity
      });
    }

    res.json({ message: 'Item added to cart', cart: carts[userId] });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Get cart items
app.get('/api/cart', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const userId = decoded.id;

    // Initialize cart for user if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }

    res.json({ cart: carts[userId] });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Remove item from cart
app.delete('/api/cart/remove/:productId', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const userId = decoded.id;
    const productId = parseInt(req.params.productId);

    // Initialize cart for user if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }

    // Remove item from cart
    carts[userId] = carts[userId].filter(item => item.productId !== productId);

    res.json({ message: 'Item removed from cart', cart: carts[userId] });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
