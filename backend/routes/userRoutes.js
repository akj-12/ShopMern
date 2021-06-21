import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddlware.js';

const router = express.Router();

/**
 * Description : Create User
 * Route : POST /api/users/
 * access : public
 */
router.route('/').post(registerUser);

/**
 * Description : Authenticate User
 * Route : POST /api/users/login
 * access : public
 */
router.route('/login').post(authUser);

/**
 * Description : Get Authenticate User Profile
 * Route : /api/users/profile
 * access : private(protected routes)
 */
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
export default router;
