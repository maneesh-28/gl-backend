const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
// app.use(cors());
// Allow frontend origin
app.use(cors({
  origin: 'http://localhost:4200', // Angular frontend
  credentials: true, // if using cookies or auth headers
}));

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB Sync error:', err));
