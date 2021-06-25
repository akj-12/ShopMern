import express from 'express';
import dotenv from 'dotenv';

import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMessage.js';

dotenv.config();
const app = express();

/**
 * DATABASE
 */
connectDB();

/**
 * Middleware
 */
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoutes);

/**
 * ROUTES
 */

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.get('/', (req, res) => {
  res.send('App is running');
});

// not found middleware
app.use(notFound);

// custom error middleware
app.use(errorHandler);

/**
 * SERVER
 */
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`App is in ${process.env.NODE_ENV} mode  listining at ${PORT}`);
});
