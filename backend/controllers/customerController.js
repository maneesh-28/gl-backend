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
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// exports.updateCustomerProfile = async (req, res) => {
//   try {
//     const customer = await Customer.findByPk(req.params.id);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     const { name, email, phone } = req.body;
//     const profilePicture = req.file ? `/uploads/products/${req.file.filename}` : customer.profilePicture;

//     await customer.update({ name, email, phone, profilePicture });

//     res.status(200).json({ message: 'Profile updated successfully', customer });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateCustomerProfile = async (req, res) => {
//   try {
//     const customer = await Customer.findByPk(req.params.id);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     const { name, email, phone } = req.body;
//     const profilePicture = req.file ? `/uploads/profiles/${req.file.filename}` : customer.profilePicture;

//     await customer.update({ name, email, phone, profilePicture });

//     res.status(200).json({
//       message: 'Profile updated successfully',
//       customer
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.updateCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const { fullName, password, phone, address } = req.body;
    if (req.file) {
      customer.profilePicture = req.file.filename;
    }

    customer.fullName = fullName;
    customer.password = password;
    customer.phone = phone;
    customer.address = address;

    await customer.save();
    res.json({ message: 'Profile updated successfully', customer });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.updateCustomer = async (req, res) => {
//   const { cust_id } = req.params;
//   const { fullName, phone, address, password } = req.body;
//   const profilePicture = req.file ? req.file.filename : null;

//   try {
//     const customer = await Customer.findByPk(cust_id);
//     if (!customer) return res.status(404).json({ message: 'Customer not found' });

//     // Only update provided fields
//     if (fullName) customer.fullName = fullName;
//     if (phone) customer.phone = phone;
//     if (address) customer.address = address;
//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);
//       customer.password = hashed;
//     }
//     if (profilePicture) customer.profilePicture = `/uploads/${profilePicture}`;

//     await customer.save();
//     res.status(200).json(customer);
//   } catch (err) {
//     console.error('Error updating customer:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };