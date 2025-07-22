const { Product } = require('../models');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      category,
      sizes,
      colors,
      status
    } = req.body;

    const imageUrl = req.file ? req.file.filename : null;

    const adminId = req.adminId; // Using from middleware

    if (!adminId) {
      return res.status(401).json({ message: 'Unauthorized: Admin ID missing' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      category,
      sizes: JSON.parse(sizes || '[]'),
      colors,
      status: status === 'true' || status === true,
      imageUrl,
      adminId
    });

    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Product creation failed', error: err.message });
  }
};

// Get Products for Admin
exports.getAdminProducts = async (req, res) => {
  try {
    const adminId = req.adminId; // Consistent usage

    const products = await Product.findAll({ where: { adminId } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin products', error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const adminId = req.adminId; // Consistent usage

    const product = await Product.findOne({ where: { id: productId, adminId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};


// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { status: true } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};