// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// exports.adminAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };


const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach decoded token to req.admin
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// const jwt = require('jsonwebtoken');
// const { Admin } = require('../models');

// exports.verifyAdmin = async (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains admin id
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
