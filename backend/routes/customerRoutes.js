const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const upload = require('../middleware/uploadMiddleware');


// POST - Register/Login
router.post('/register', customerController.register);
router.post('/login', customerController.login);


// GET - Get customer by ID
router.get('/:id', customerController.getCustomerById);

// PUT - Update customer profile with image upload
router.put('/:id', upload.single('profilePicture'), customerController.updateCustomerProfile);
// router.put('/update/:cust_id', upload.single('profilePicture'), customerController.updateCustomer);


// Update customer profile (with file upload)
// router.put('/update/:cust_id', upload.single('profilePicture'), customerController.updateCustomer);


module.exports = router;
