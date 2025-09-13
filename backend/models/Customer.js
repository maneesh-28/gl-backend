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
    },
    // profilePicture: {    
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // address: {          
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
    // Add any additional fields here
     profilePicture: {    
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {          
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneno: {
      type:  DataTypes.STRING,
      allowNull: true
    }
  });

  Customer.associate = (models) => {
    Customer.hasOne(models.Cart, { foreignKey: 'customerId' });
    Customer.hasMany(models.Order, { foreignKey: 'customerId' });
  };

  return Customer;
};
