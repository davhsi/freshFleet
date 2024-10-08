require('dotenv').config(); // Load env variables first
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const customerRoutes = require('./routes/customerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (e.g., recipe images)
app.use('/recipes', express.static(path.join(__dirname, 'data')));

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start server inside the MongoDB connection success callback
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB Atlas:', err);
  });

// Route handling
app.use('/api/customer', customerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/recipes', recipeRoutes);
