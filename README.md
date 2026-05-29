# minimal-blog-platform
==========================

### Overview

A minimal blog platform built with React, Tailwind for the frontend and Express, SQLite for the backend. This project allows users to create and manage blog posts, categorize them and engage with comments.

### Features

- Blog Posts
  - Create new posts
  - Edit and delete existing posts
- Categories
  - Create new categories
  - Assign categories to blog posts
- Comments
  - Leave comments on existing posts
  - Reply to existing comments

### Setup Instructions

#### Install Dependencies

Navigate to the project root directory and run:

```bash
npm install
```

For the frontend, install required dependencies:

```bash
npm install in tailwind 
```
#### Run the Project

Run the following commands in separate terminal windows:

```bash
npm run start:backend
```

```bash
npm run start:frontend
```

### API Endpoints

#### Backend Endpoints

| Path | Verb | Description |
| --- | --- | --- |
| `/api/posts` | GET | Retrieve a list of all posts |
| `/api/posts/:id` | GET | Retrieve a specific post by ID |
| `/api/posts` | POST | Create a new post |
| `/api/posts/:id` | PUT | Update an existing post |
| `/api/posts/:id` | DELETE | Delete a specific post by ID |
| `/api/categories` | GET | Retrieve a list of all categories |
| `/api/categories/:id` | GET | Retrieve a specific category by ID |
| `/api/categories` | POST | Create a new category |
| `/api/categories/:id` | PUT | Update an existing category |
| `/api/categories/:id` | DELETE | Delete a specific category by ID |
| `/api/comments` | GET | Retrieve a list of all comments |
| `/api/comments/:id` | GET | Retrieve a specific comment by ID |
| `/api/comments` | POST | Create a new comment |
| `/api/comments/:id` | PUT | Update an existing comment |
| `/api/comments/:id` | DELETE | Delete a specific comment by ID |

#### Frontend Endpoints

| Path | Verb | Description |
| --- | --- | --- |
| `/` | GET | Home page |
| `/posts` | GET | Blog posts page |
| `/posts/:id` | GET | Post details page |
| `/categories` | GET | Categories page |
| `/categories/:id` | GET | Category details page |

### License

This project is licensed under the MIT License.

### Contributing

Contributions are welcome! Please create a pull request with your changes and describe what you've done.

### Authors

- Your Name

### References

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [Express Tutorial](https://expressjs.com/en/starter/hello-world.html)
- [SQLite Documentation](https://sqlite.org/docs.html)