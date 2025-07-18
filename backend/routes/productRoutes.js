// const express = require('express');
// const router = express.Router();
// const { addProduct } = require('../controllers/productController');
// const { adminAuth } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware'); // multer config

// // router.post('/products', adminAuth, upload.single('image'), addProduct);
// router.post('/', adminAuth, upload.single('image'), addProduct);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const verifyToken = require('../middleware/verifyToken'); // for auth
// const upload = require('../middleware/uploadMiddleware'); // multer config

// // Add product (with image) — POST /api/products
// router.post('/', verifyToken, upload.single('image'), productController.addProduct);

// // Fetch products uploaded by logged-in admin — GET /api/products/admin-products
// router.get('/admin-products', verifyToken, productController.getAdminProducts);

// // Delete product (owned by admin) — DELETE /api/products/:id
// router.delete('/:id', verifyToken, productController.deleteProduct);

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const verifyToken = require('../middleware/verifyToken');
const {
  addProduct,
  getAdminProducts,
  deleteProduct
} = require('../controllers/productController');

// POST - Add product
router.post('/', verifyToken, upload.single('image'), addProduct);

// GET - All products by logged-in admin
router.get('/', verifyToken, getAdminProducts);

// DELETE - Admin's own product
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
