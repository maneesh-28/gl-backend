const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models');
const authCustomer = require('../middleware/authCustomer'); // make sure this sets req.user

// POST /api/orders
router.post('/', authCustomer, async (req, res) => {
  const { customer, paymentMethod, items, total } = req.body;
  const customerId = req.user.id;

  try {
    const order = await Order.create({
      customerId,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      paymentMethod,
      total
    });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });
    }

    res.status(201).json({ success: true, orderId: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order could not be placed' });
  }
});

module.exports = router;
