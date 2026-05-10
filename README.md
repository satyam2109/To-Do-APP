# 📝 ToDo Application (MERN Stack)

## 📌 Project Overview

This project is a Full Stack To Do Application built using the MERN Stack architecture.

The application allows users to:
- Create ToDo tasks
- View all tasks
- Update tasks with business rules
- Delete individual tasks
- Clear all tasks
- Filter tasks using different attributes
- Access API documentation using Swagger UI

The project focuses on learning:
- Backend API Development
- RESTful API Design
- MongoDB Integration
- Express Middleware & Routing
- Business Logic Handling
- Frontend & Backend Communication
- Full Stack Application Architecture

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Axios
- CSS / Tailwind / Custom Styling (depending on implementation)

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Swagger UI
- dotenv
- CORS

---

# 📂 Project Structure

```bash
ToDoApp/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── swagger.js
│   │   │
│   │   ├── controllers/
│   │   │   └── todoControllers.js
│   │   │
│   │   ├── models/
│   │   │   ├── Todo.js
│   │   │   └── Counter.js
│   │   │
│   │   ├── routes/
│   │   │   └── todos.js
│   │   │
│   │   ├── utils/
│   │   │   └── updateHelper.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Features

## ✅ CRUD Operations

### Create ToDo
- Create new task
- Auto generated custom `todoId`
- Stores title, description, status, and target date

### Get ToDos
- Fetch all tasks
- Fetch tasks using filters
- Total record count included in response

### Update ToDo
- Controlled update mechanism
- Business rule implementation
- Completed tasks cannot be modified
- Empty values are ignored silently
- Same target date is ignored

### Delete ToDo
- Delete individual task using `todoId`

### Clear All ToDos
- Deletes all tasks from database
- Resets the custom counter collection

---

# 🔍 Backend Filtering Features

The GET API supports filtering using:

| Filter | Description |
|--------|-------------|
| todoId | Search by ID |
| title | Partial title match |
| status | true / false |
| startDate | Filter from date |
| endDate | Filter till date |

Example:

```bash
GET /api/todos?status=true
```

---

# 🧠 Backend Business Rules

## Update Restrictions

### If task status becomes TRUE:
- Task cannot be modified further

### Allowed update fields:
- description
- targetDate
- status

### Ignored Inputs:
- Empty description
- Empty targetDate
- Same targetDate
- Invalid values

---

# 📘 Swagger API Documentation

Swagger UI is integrated for API testing and documentation.

## Swagger Route

```bash
http://localhost:5000/api-docs
```

Swagger provides:
- API endpoint testing
- Request body structure
- Query parameters
- Response structures
- API descriptions

---

# 🗃️ Database Design

## Todo Collection

| Field | Type |
|------|------|
| todoId | Number |
| title | String |
| description | String |
| status | Boolean |
| targetDate | Date |
| createdAt | Date |
| updatedAt | Date |

---

## Counter Collection

Used for:
- Auto incrementing `todoId`
- Maintaining unique IDs

---

# 🔄 Application Flow

## Backend Request Flow

```text
Client Request
      ↓
Express Route
      ↓
Controller Function
      ↓
Validation / Business Rules
      ↓
Mongoose Model
      ↓
MongoDB Database
      ↓
Formatted Response
      ↓
Client
```

---

# 🎨 Frontend Features

## UI Functionalities

- Just Landing Page

---

# 🔗 Frontend & Backend Communication

Frontend communicates with backend APIs using HTTP requests (Not yet Implemented).

Example:

| Action | API |
|------|------|
| Create Task | POST /api/todos |
| Get Tasks | GET /api/todos |
| Update Task | PUT /api/todos/:id |
| Delete Task | DELETE /api/todos/:id |
| Clear All | DELETE /api/todos/clear-all |

---

# 🚀 How To Run This Project

## 📌 Prerequisites

Install the following software:

- Node.js
- MongoDB
- Git
- VS Code (recommended)

---

# 📥 Step 1: Clone Repository

```bash
git clone <repository-url>
```

---

# 📁 Step 2: Open Project

```bash
cd ToDoApp
```

---

# ⚙️ Step 3: Backend Setup

## Navigate to Backend

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

---

# 🔐 Step 4: Configure Environment Variables

Create `.env` file inside Backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ToDoAPP
NODE_ENV=development
```

---

# ▶️ Step 5: Start Backend Server

```bash
npm run dev
```

OR

```bash
node server.js
```

Expected Output:

```bash
Database Connected Successfully
Server running on port 5000
```

---

# 🌐 Step 6: Access Swagger Documentation

Open browser:

```bash
http://localhost:5000/api-docs
```

---

# 🎨 Step 7: Frontend Setup

## Navigate to Frontend

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

---

# ▶️ Step 8: Start Frontend

```bash
npm start
```

Frontend will start on:

```bash
http://localhost:3000
```

---

# 🔧 Important Backend Files Explanation

## server.js
Responsible for:
- Starting backend server
- Loading environment variables
- Connecting database

---

## app.js
Responsible for:
- Express app configuration
- Middleware setup
- Route registration
- Swagger integration

---

## db.js
Responsible for:
- MongoDB connection setup
- Connection error handling

---

## swagger.js
Responsible for:
- Swagger configuration
- API documentation setup

---

## todoControllers.js
Responsible for:
- API business logic
- CRUD operation handling
- Validation handling
- Response formatting

---

## Todo.js
Responsible for:
- Main ToDo database schema
- Mongoose model definition
- Auto increment logic

---

## Counter.js
Responsible for:
- Maintaining auto increment counter
- Generating unique custom IDs

---

## todos.js
Responsible for:
- API route definitions
- Swagger endpoint annotations
- Route-controller mapping

---

## updateHelper.js
Responsible for:
- Centralized update validation
- Ignoring invalid updates
- Building safe update objects

---

# 📌 API Summary

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |
| DELETE | /api/todos/clear-all | Delete all todos |

---

# 🛡️ Error Handling Implemented

- Invalid ID validation
- Empty update prevention
- Invalid date prevention
- Completed task restriction
- Database connection handling
- Route level validations

---

# 📈 Future Improvements

Potential future enhancements:

- Not yet Decided

---

# 👨‍💻 Author

### Satyam Choudhary

Built as a learning-focused Full Stack MERN project for understanding:
- Backend architecture
- REST APIs
- MongoDB integration
- Business rule implementation
- Real-world API design

---

# 📄 License

This project is open for learning and educational purposes.