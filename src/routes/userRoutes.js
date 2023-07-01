// routes/userRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUserById);

// Create a new user
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser
);

// Update user by ID
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUser
);

// Delete user by ID
router.delete('/:id', deleteUser);

module.exports = router;
