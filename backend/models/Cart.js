module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // One cart per customer
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    }
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Customer, { foreignKey: 'customerId' });
  };

  return Cart;
};
