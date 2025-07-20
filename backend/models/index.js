const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Import all model factories
db.Customer = require('./Customer')(sequelize, DataTypes);
db.Cart = require('./Cart')(sequelize, DataTypes);
db.Product = require('./Product')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.OrderItem = require('./OrderItem')(sequelize, DataTypes);

// ✅ Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
