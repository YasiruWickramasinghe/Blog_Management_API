# Blog_Management_Client

Empower your blog with React, Redux, and more. Create a seamless front-end interface that enriches your blogging experience Integrate effortlessly with the powerful Blog Management API for efficient post management and a feature-rich solution.

# Blog_Management_Server

Blog Management API is a powerful and efficient RESTful API for managing blogs. Built with Express, Node.js, and MongoDB, it enables seamless creation, retrieval, update, and deletion of blog posts. Enhance your blogging experience with this scalable and feature-rich API solution.

## API Documentation

### Base URL

The base URL for all API endpoints is: `http://localhost:3000`.

### Endpoints

- **GET /blogs**
  - Description: Retrieve all blogs with pagination, search, sorting, and filtering.
  - Parameters:
    - page (optional): Page number for pagination (default: 1).
    - limit (optional): Number of items per page (default: 10).
    - sort (optional): Sorting options in JSON format.
    - filter (optional): Filtering options in JSON format.
    - search (optional): Search query for name or author.
  - Example: `GET /blogs` 
             `GET /blogs?page=1&limit=10&sort={"createdAt": -1}&filter={"author": "John"}&search=example`

- **GET /blogs/:id**
  - Description: Retrieve a specific blog by ID.
  - Parameters:
    - id: ID of the blog.
  - Example: `GET /blogs/:id`

- **POST /blogs**
  - Description: Create a new blog.
  - Request Body:
    - name: Name of the blog (required).
    - author: Author of the blog (required).
    - Additional fields as needed.
  - Example: `POST /blogs`
    ```json
    {
      "name": "Example Blog",
      "author": "John Doe"
    }
    ```

- **PUT /blogs/:id**
  - Description: Update a blog by ID.
  - Parameters:
    - id: ID of the blog.
  - Request Body:
    - name: Name of the blog (required).
    - author: Author of the blog (required).
    - Additional fields as needed.
  - Example: `PUT /blogs/:id`
    ```json
    {
      "name": "Updated Blog",
      "author": "Jane Smith"
    }
    ```

- **DELETE /blogs/:id**
  - Description: Delete a blog by ID.
  - Parameters:
    - id: ID of the blog.
  - Example: `DELETE /blogs/:id`

- **GET /blogs/search?searchQuery=query**
  - Description: Search blogs by name or author.
  - Parameters:
    - searchQuery: Query string to search for.
  - Example: `GET /blogs/search/name?searchQuery=example`
  

## Environment Variables

The following environment variables are used in the project:

- `MONGO_URI`: MongoDB connection URI.
- `PORT`: Port number for the server (default: 3000).

## Getting Started

1. Clone the repository.
2. Install the dependencies: `npm install`.
3. Set up the environment variables by creating a `.env` file (see the example `.env.example` file).
4. Start the server: `npm start`.


