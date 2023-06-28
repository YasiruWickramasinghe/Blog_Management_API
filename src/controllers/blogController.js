const Blog = require('../models/blogModel');

// Get all blogs with pagination, search, sorting, and filtering
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, filter, search } = req.query;
    const query = {};

    // Apply filtering
    if (filter) {
      const filters = JSON.parse(filter);
      Object.assign(query, filters);
    }

    // Apply search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count for pagination
    const totalCount = await Blog.countDocuments(query);

    // Apply sorting
    const sortOptions = sort ? JSON.parse(sort) : { createdAt: -1 };

    const blogs = await Blog.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: blogs,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit),
    });
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

// Search blogs by name and author
const searchBlogs = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const blogs = await Blog.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, searchBlogs };
