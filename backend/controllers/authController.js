// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.adminLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find admin by username OR email OR mobile (flexible login)
    const admin = await Admin.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { username: identifier },
          { email: identifier },
          { mobile: identifier },
        ],
      },
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password stored
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
