const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });


    res.status(200).json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
