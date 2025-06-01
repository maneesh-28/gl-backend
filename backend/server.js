// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    
    // Sync tables (optional, only if needed)
    // await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
})();
