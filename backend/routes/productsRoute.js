import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddlware.js';

const router = express.Router();

/**
 * Description : GET all products
 * Route : /api/products/
 * access : public
 */
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router.route('/:id/reviews').post(protect, createProductReview);

/**
 * Description : GET a product
 * Route : /api/products/:id
 * access : public
 */
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
export default router;
