// backend/config/db.js
require('dotenv').config();  // Load .env variables

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password (make sure it's a string)
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,          // Optional: turn off SQL query logging
  }
);

module.exports = sequelize;
