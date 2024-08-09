const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));


app.use('/api/customer', customerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/products', productRoutes);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
