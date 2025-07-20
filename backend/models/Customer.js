// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Customer = sequelize.define('Customer', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Customer;

// models/Customer.js
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // Add any additional fields here
  });

  Customer.associate = (models) => {
    Customer.hasOne(models.Cart, { foreignKey: 'customerId' });
    Customer.hasMany(models.Order, { foreignKey: 'customerId' });
  };

  return Customer;
};
