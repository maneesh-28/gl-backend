const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const verifyToken = require('../middleware/verifyToken');
const {
  addProduct,
  getAdminProducts,
  deleteProduct,
  getAllProducts
} = require('../controllers/productController');

// POST - Add product
router.post('/', verifyToken, upload.single('image'), addProduct);

// GET - All products by logged-in admin
router.get('/', verifyToken, getAdminProducts);

// DELETE - Admin's own product
router.delete('/:id', verifyToken, deleteProduct);

// fetch all product to shop
router.get('/all', getAllProducts);

module.exports = router;
