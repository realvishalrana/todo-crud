# Todo API

A simple CRUD API for a Todo application built with Node.js, Express, and MongoDB. This API allows you to create, read, update, and delete todo items.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing with .rest File](#testing-with-rest-file)
- [License](#license)

## Features

- **Create a Todo**: Add a new todo item.
- **Read Todos**: Retrieve all todos or a single todo by its ID.
- **Update a Todo**: Update specific fields of a todo.
- **Delete a Todo**: Remove a todo item.
- **Sorting**: Get todos sorted by creation time in descending order.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or above)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todo-api.git
   cd todo-api

   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Configuration

Create a .env file in the root directory and add your MongoDB connection string and desired port:

```bash
MONGODB_URI=your-mongodb-connection-string
PORT=3000
```

Replace your-mongodb-connection-string with your actual connection string.

## Usage

1. **Start the server**:

```bash
npm start
```
2. **The server will run on the port specified in your .env file (default is 3000).**

## API Endpoints

### Get All Todos
- URL: /todos
- Method: GET
- Description: Retrieves all todos sorted by creation time (newest first).

### Get a Single Todo
- URL: /todo/:id
- Method: GET
- Description: Retrieves a single todo item by its MongoDB _id.

### Create a New Todo
- URL: /addTodo
- Method: POST
- Description: Creates a new todo.
- Body: Can be sent as JSON.

- Sample JSON Body:

```bash
json

{
  "id": 123,
  "text": "Sample Todo"
}
```

### Update a Todo
- URL: /todos/:id
- Method: PATCH
- Description: Updates specific fields of a todo.
- Body: JSON containing the fields to update.
- Sample JSON Body:
```bash
json

{
  "id": 123,
  "text": "Updated Todo"
}
```

### Delete a Todo
- URL: /todos/:id
- Method: DELETE
- Description: Deletes the todo with the specified ID.

## Testing with .rest File

If you're using the 
 <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client</a> extension for VS Code, create a file named api.rest in the root directory with the following content:

```bash

### Get all todos
GET http://localhost:3000/todos
Content-Type: application/json

### Get a single todo by ID
GET http://localhost:3000/todo/<insert_todo_id>
Content-Type: application/json

### Create a new todo (JSON)
POST http://localhost:3000/addTodo
Content-Type: application/json

{
  "id": 123,
  "text": "Sample Todo"
}
### Update a todo
PATCH http://localhost:3000/todos/<insert_todo_id>
Content-Type: application/json

{
  "text": "Updated Todo"
}
### Delete a todo
DELETE http://localhost:3000/todos/<insert_todo_id>

```
Replace <insert_todo_id> with an actual MongoDB document ID when testing.