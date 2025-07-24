const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authCustomer = require('../middleware/authCustomer');

router.get('/my-orders', authCustomer, orderController.getMyOrders); 
router.post('/', authCustomer, orderController.placeOrder);

module.exports = router;
