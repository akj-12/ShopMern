import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

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
router.route('/profile').get(getUserProfile);
export default router;
