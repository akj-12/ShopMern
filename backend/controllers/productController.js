// import products from '../data/products.js';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * Description : GET all products
 * Route : /api/products/
 * access : public
 */
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

/**
 * Description : GET all products
 * Route : /api/products/:id
 * access : public
 */
export const getProductById = asyncHandler(async (req, res) => {
  // const product = products.find((product) => product._id === req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({ status: 'success', data: { product } });
  } else {
    res.status(404).json({ status: 'fail', message: 'No product data found' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
