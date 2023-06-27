// models/blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // ... add other fields as needed
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
