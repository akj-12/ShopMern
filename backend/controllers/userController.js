// import products from '../data/products.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * Description : Authenticate User
 * Route : POST /api/users/:id
 * access : private
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Description : Get Authenticate User Profile
 * Route : /api/users/profile
 * access : private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send('seccess');
});
