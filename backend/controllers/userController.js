// import products from '../data/products.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * Description : Authenticate User and get tokens
 * Route : POST /api/users/login
 * access : public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if user exist and their password matched
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), //if every thing ok generate token
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Description :Create User
 * Route : POST /api/users/
 * access : public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // if every thing ok then generate a token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * Description : Get Authenticate User Profile
 * Route : /api/users/profile
 * access : private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //get from protected middleware

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error('User not found');
  }
});

/**
 * Description : Get All user
 * Route : GET /api/users
 * access : private | admin
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); //get all users
  res.status(200).json(users);
});

/**
 * Description : Get Authenticate User Profile
 * Route : PUT /api/users/profile
 * access : private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  // get the user from DB
  const user = await User.findById(req.user._id); //get from protected middleware

  // if user exists
  if (user) {
    // collect details from body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    // save after collected data from body
    const updatedUser = await user.save();

    // send response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
