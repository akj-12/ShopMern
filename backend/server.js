import express from 'express';
import productsRoute from './routes/productsRoute.js';
const app = express();

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  res.send('App is running');
});
app.use('/api/products', productsRoute);

/**
 * SERVER
 */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is listining at ${PORT}`);
});
