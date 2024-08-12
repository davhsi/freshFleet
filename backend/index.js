const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));

// Route handling
app.use('/api/customer', customerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/products', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
