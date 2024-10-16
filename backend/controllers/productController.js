const Product = require('../models/Product');
const Vendor = require('../models/Vendor'); 

// Create a new product
exports.createProduct = async (req, res) => {
  try {
      const { name, totalQuantityWeight, pricePerKg, vendorId } = req.body;

      console.log('Received product data:', req.body);

      const newProduct = new Product({
          name,
          totalQuantityWeight,
          pricePerKg,
          vendorId
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('vendorId', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by vendor
exports.getProductsByVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const products = await Product.find({ vendorId }).populate('vendorId', 'name email');
  
        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this vendor.' });
        }
  
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
  };

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, category, quantityWeight, pricePerKg } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, quantityWeight, pricePerKg },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductDetailsByName = async (req, res) => {
    try {
        // Find all products by name
        const products = await Product.find({ name: req.params.name });
        if (!products.length) {
            return res.status(404).json({ message: 'Products not found' });
        }

        // Fetch details for each product's vendor
        const productDetailsPromises = products.map(async (product) => {
            const vendor = await Vendor.findById(product.vendorId);
            return {
                ...product._doc,
                vendorName: vendor ? vendor.name : 'Unknown Vendor',
                vendorContact: vendor ? vendor.email : 'No Contact'
            };
        });

        const productDetails = await Promise.all(productDetailsPromises);

        res.json(productDetails);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
