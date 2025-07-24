const { Order, OrderItem, Product, Customer } = require('../models');

exports.getMyOrders = async (req, res) => {
  try {
    const customerId = req.user.id;

    const orders = await Order.findAll({
      where: { customerId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
        {
          model: Customer,
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const formatted = orders.map(order => ({
      id: order.id,
      customerName: order.Customer?.name || 'N/A',
      createdAt: order.createdAt,
      total: order.total,
      paymentMethod: order.paymentMethod,
      items: order.OrderItems.map(item => ({
        productId: item.productId,
        name: item.Product?.name || 'Unknown Product',
        size: item.Product?.size || 'N/A',
        color: item.Product?.color || 'N/A',
        quantity: item.quantity,
        price: item.price,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};



exports.placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id; // From authCustomer middleware
    const { paymentMethod, items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order items cannot be empty' });
    }

    // Create the order
    const order = await Order.create({
      customerId,
      total,
      paymentMethod,
      status: 'Pending'
    });

    // Create order items
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      return await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price
      });
    }));

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order.id
    });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};
