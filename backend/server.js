import express from 'express';
import dotenv from 'dotenv';

import productsRoute from './routes/productsRoute.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMessage.js';

dotenv.config();
const app = express();

/**
 * DATABASE
 */
connectDB();

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  res.send('App is running');
});

/**
 * Middleware
 */
app.use('/api/products', productsRoute);

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
