const express = require('express');
const router = express.Router();
const authenticateCustomer = require('../middleware/authCustomer');
const cartController = require('../controllers/cartController');

router.post('/save', authenticateCustomer, cartController.saveCart);
router.get('/', authenticateCustomer, cartController.getCart);

module.exports = router;
