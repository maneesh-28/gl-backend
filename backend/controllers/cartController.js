const { Cart } = require('../models');

exports.saveCart = async (req, res) => {
  const customerId = req.user.id;
  const items = req.body.items;

  try {
    const [cart, created] = await Cart.upsert(
      { customerId, items },
      { returning: true }
    );
    res.json({ message: 'Cart saved successfully', cart });
  } catch (error) {
    console.error('Cart Save Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCart = async (req, res) => {
  const customerId = req.user.id;

  try {
    const cart = await Cart.findOne({ where: { customerId } });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};
