const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 
const Customer = require('./models/Customer');
const Vendor = require('./models/Vendor');

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

app.post('/api/customer/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const customer = new Customer({ name, email, password });
  await customer.save();
  res.send({ message: 'Customer created successfully' });
});

app.post('/api/vendor/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const vendor = new Vendor({ name, email, password });
  await vendor.save();
  res.send({ message: 'Vendor created successfully' });
});

app.post('/api/customer/signin', async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email, password });
  if (customer) {
    res.send({ message: 'Customer signed in successfully' });
  } else {
    res.send({ message: 'Invalid credentials' });
  }
});

app.post('/api/vendor/signin', async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email, password });
  if (vendor) {
    res.send({ message: 'Vendor signed in successfully' });
  } else {
    res.send({ message: 'Invalid credentials' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
