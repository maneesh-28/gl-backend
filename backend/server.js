const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const db = require('./models');


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
// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/customers', customerRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);



const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB Sync error:', err));
