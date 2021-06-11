import express from 'express';
import { authUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * Description : Authenticate User
 * Route : /api/users/:id
 * access : private
 */
router.route('/login').post(authUser);
export default router;
