module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    colors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  // ✅ Define associations here if needed
  Product.associate = (models) => {
    Product.hasMany(models.OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
    // Add more associations if needed
  };

  return Product;
};
