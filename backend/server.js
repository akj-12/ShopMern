import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
app.use(helmet());
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
