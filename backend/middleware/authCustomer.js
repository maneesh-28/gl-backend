const jwt = require('jsonwebtoken');
const { Customer } = require('../models');

const authenticateCustomer = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) return res.status(401).json({ message: 'Invalid token' });

    req.user = customer;
    // req.customer = customer;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = authenticateCustomer;
