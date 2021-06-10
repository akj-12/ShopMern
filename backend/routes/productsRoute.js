import express from 'express';
import {
  getAllProducts,
  getProduct,
} from '../controllers/productController.js';

const router = express.Router();

/**
 * Description : GET all products
 * Route : /api/products/
 * access : public
 */
router.route('/').get(getAllProducts);

/**
 * Description : GET a product
 * Route : /api/products/:id
 * access : public
 */
router.route('/:id').get(getProduct);
export default router;
