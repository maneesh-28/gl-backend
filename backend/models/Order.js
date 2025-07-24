module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    total: DataTypes.FLOAT,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: 'customerId' }); // ✅ OK
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });     // ✅ OK
  };

  return Order;
};
