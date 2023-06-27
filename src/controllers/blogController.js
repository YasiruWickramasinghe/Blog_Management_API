// controllers/blogController.js
const Blog = require('../models/blogModel');

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { name, author } = req.body;
  try {
    const newBlog = await Blog.create({ name, author });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update blog by ID
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { name, author } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { name, author }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete blog by ID
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
