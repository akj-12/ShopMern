import products from '../data/products.js';

export const getAllProducts = (req, res) => {
  if (products) {
    res.status(200).json({ status: 'success', data: { products } });
  } else {
    res.status(400).json({ status: 'fail', message: 'No products data found' });
  }
};
export const getProduct = (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  if (product) {
    res.status(200).json({ status: 'success', data: { product } });
  } else {
    res.status(400).json({ status: 'fail', message: 'No products data found' });
  }
};
