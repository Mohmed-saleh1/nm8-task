# Blog API

A robust Blog API built with NestJS, featuring user authentication, role-based access control, and comprehensive blog post management.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User & Admin roles)
  - Secure password hashing

- 👥 **User Management**
  - User registration and login
  - User profile management
  - Admin-only user management endpoints

- 📝 **Blog Post Management**
  - Create, read, update, and delete blog posts
  - Pagination support
  - Author-based post ownership
  - Admin can manage all posts

- 📚 **API Documentation**
  - Swagger/OpenAPI documentation
  - Detailed endpoint descriptions
  - Request/response examples
  - Authentication requirements

## Prerequisites

- Node.js 
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohmed-saleh1/nm8-task.git
   cd blog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DB_NAME=
    DB_SYNC=
    WT_EXPIRATION=
    JWT_SECRET=your_jwt_secret_here
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

Access the Swagger documentation at `http://localhost:3000/api` to explore all available endpoints, request/response schemas, and test the API directly.

### Authentication

1. Register a new user:
   ```http
   POST /auth/register
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123",
     "role": "user"
   }
   ```

2. Login:
   ```http
   POST /auth/login
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

### User Management (Admin Only)

1. Create a new user:
   ```http
   POST /users
   Authorization: Bearer <jwt_token>
   Content-Type: application/json

   {
     "email": "newuser@example.com",
     "password": "password123",
     "role": "user"
   }
   ```

2. Get all users:
   ```http
   GET /users
   Authorization: Bearer <jwt_token>
   ```

3. Get user by ID:
   ```http
   GET /users/1
   Authorization: Bearer <jwt_token>
   ```

4. Update user:
   ```http
   PATCH /users/1
   Authorization: Bearer <jwt_token>
   Content-Type: application/json

   {
     "email": "updated@example.com",
     "password": "newpassword123"
   }
   ```

5. Delete user:
   ```http
   DELETE /users/1
   Authorization: Bearer <jwt_token>
   ```

### Blog Post Management

1. Create a post:
   ```http
   POST /posts
   Authorization: Bearer <jwt_token>
   Content-Type: application/json

   {
     "title": "My First Post",
     "content": "This is the content of my first post."
   }
   ```

2. Get all posts (with pagination):
   ```http
   GET /posts?page=1&limit=10
   ```

3. Get post by ID:
   ```http
   GET /posts/1
   ```

4. Update post:
   ```http
   PATCH /posts/1
   Authorization: Bearer <jwt_token>
   Content-Type: application/json

   {
     "title": "Updated Post Title",
     "content": "Updated post content."
   }
   ```

5. Delete post:
   ```http
   DELETE /posts/1
   Authorization: Bearer <jwt_token>
   ```
 

## Project Structure

```
src/
├── auth/                 # Authentication module
├── user/                 # User management module
├── posts/               # Blog post module
├── common/              # Shared resources
│   ├── decorators/      # Custom decorators
│   ├── guards/          # Authentication guards
│   └── interfaces/      # TypeScript interfaces
└── main.ts             # Application entry point
```

 