import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddlware.js';

const router = express.Router();

/**
 * Description : Create User
 * Route : POST /api/users/
 * access : private
 */
router.route('/').post(registerUser);
/**
 * Description : Authenticate User
 * Route : POST /api/users/:id
 * access : private
 */
router.route('/login').post(authUser);

/**
 * Description : Get Authenticate User Profile
 * Route : /api/users/profile
 * access : private
 */
router.route('/profile').get(protect, getUserProfile);
export default router;
