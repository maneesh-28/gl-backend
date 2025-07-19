const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Customer } = require('../models');
require('dotenv').config();


exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    console.log('Register request body:', req.body);

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: newCustomer.id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    return res.status(201).json({
      message: 'Customer registered successfully',
      token,
    });
  } catch (error) {
    console.error('Register error:', error); // 👈 Log the actual error
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error); // 👈 Log the actual error
    res.status(500).json({ message: 'Server error' });
  }
};
