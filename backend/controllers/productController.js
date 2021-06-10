// import products from '../data/products.js';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.status(200).json({ status: 'success', data: { products } });
  } else {
    // res.status(404).json({ status: 'fail', message: 'No products data found' });
    res.status(404);
    throw new Error('No products found');
  }
});
export const getProduct = asyncHandler(async (req, res) => {
  // const product = products.find((product) => product._id === req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({ status: 'success', data: { product } });
  } else {
    res.status(404).json({ status: 'fail', message: 'No product data found' });
  }
});
