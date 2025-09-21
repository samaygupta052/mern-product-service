const Product = require('../models/productModel');
const { getUserById } = require('../utils/apiCall');

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, userId } = req.body;

    // validate user
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const product = await Product.create({ name, price, description, userId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID (with user details)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await getUserById(product.userId);

    res.json({ product, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts, getProductById };
