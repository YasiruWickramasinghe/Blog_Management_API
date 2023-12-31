const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
} = require('../controllers/blogController');

const router = express.Router();

// Get all blogs with pagination, search, sorting, and filtering
router.get('/', getBlogs);

// Get blog by ID
router.get('/:id', getBlogById);

// Create a new blog
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('author').notEmpty().withMessage('Author is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createBlog
);

// Update blog by ID
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('author').notEmpty().withMessage('Author is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateBlog
);

// Delete blog by ID
router.delete('/:id', deleteBlog);

// Search blogs by name
router.get('/search/name', searchBlogs);

module.exports = router;
