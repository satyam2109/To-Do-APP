# 📝 ToDo Application (MERN Stack)

## 📌 Project Overview

This project is a Full Stack To Do Application built using the MERN
Stack architecture.

The application currently provides a functional Dashboard for managing
ToDo tasks through a React frontend connected to a Node.js, Express.js,
and MongoDB backend.

The application allows users to:

-   Create ToDo tasks
-   View all tasks
-   Update tasks with business rules
-   Delete individual tasks
-   Filter tasks using different attributes
-   Search tasks by title
-   Sort tasks by creation date
-   Paginate the Todo list
-   Update Todo completion status
-   Display API success and error dialogs
-   Display confirmation dialogs for destructive actions
-   Switch between Light and Dark mode
-   Persist the selected theme
-   Refresh Dashboard data using the application logo/title
-   Access API documentation using Swagger UI

The project focuses on learning:

-   Backend API Development
-   RESTful API Design
-   MongoDB Integration
-   Express Middleware & Routing
-   Business Logic Handling
-   Frontend & Backend Communication
-   React State Management
-   API Integration
-   Full Stack Application Architecture
-   Responsive UI Development

------------------------------------------------------------------------

# 🏗️ Tech Stack

## Frontend

-   React.js
-   Axios
-   React Router DOM
-   Lucide React
-   CSS / Custom Styling

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Swagger UI
-   dotenv
-   CORS

------------------------------------------------------------------------

# 📂 Project Structure

``` bash
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
│   │   ├── services/
│   │   │   └── APICalls.js
│   │   ├── components/
│   │   │   └── ApiDialog.js
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── LandingPage.js
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

------------------------------------------------------------------------

# ⚙️ Backend Features

## ✅ CRUD Operations

### Create ToDo

-   Create new task
-   Auto generated custom `todoId`
-   Stores title, description, status, and target date
-   Automatically maintains `createdAt` and `updatedAt`

### Get ToDos

-   Fetch all tasks
-   Fetch tasks using filters
-   Total record count included in response
-   Supports title, ID, status, and date-based filtering

### Update ToDo

-   Controlled update mechanism
-   Business rule implementation
-   Completed tasks cannot be modified
-   Empty values are ignored silently
-   Same target date is ignored

### Delete ToDo

-   Delete individual task using `todoId`

### Clear All ToDos

-   Backend API is implemented
-   Deletes all tasks from the database
-   Resets the custom counter collection
-   Frontend Delete All functionality is planned for the My Todos
    section

------------------------------------------------------------------------

# 🔍 Backend Filtering Features

The GET API supports filtering using:

  Filter      Description
  ----------- --------------------------------
  todoId      Search by ID
  title       Partial title match
  status      true / false
  startDate   Filter by Todo creation date
  endDate     Filter by Todo target/due date

Example:

``` bash
GET /api/todos?status=true
```

Date filtering is designed around:

-   `startDate` → `createdAt`
-   `endDate` → `targetDate`

The application uses date-based filtering rather than exposing the full
creation timestamp to the user.

------------------------------------------------------------------------

# 🧠 Backend Business Rules

## Update Restrictions

### If task status becomes TRUE:

-   Task cannot be modified further

### Allowed update fields:

-   description
-   targetDate
-   status

### Ignored Inputs:

-   Empty description
-   Empty targetDate
-   Same targetDate
-   Invalid values

------------------------------------------------------------------------

# 📘 Swagger API Documentation

Swagger UI is integrated for API testing and documentation.

## Swagger Route

``` bash
http://localhost:5000/api-docs
```

Swagger provides:

-   API endpoint testing
-   Request body structure
-   Query parameters
-   Response structures
-   API descriptions

------------------------------------------------------------------------

# 🗃️ Database Design

## Todo Collection

  Field         Type
  ------------- ---------
  todoId        Number
  title         String
  description   String
  status        Boolean
  targetDate    Date
  createdAt     Date
  updatedAt     Date

------------------------------------------------------------------------

## Counter Collection

Used for:

-   Auto incrementing `todoId`
-   Maintaining unique IDs
-   Resetting the counter when all Todos are deleted

------------------------------------------------------------------------

# 🔄 Application Flow

## Backend Request Flow

``` text
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

## Frontend Request Flow

``` text
React UI
   ↓
Frontend API Service
   ↓
Axios
   ↓
Express REST API
   ↓
Controller
   ↓
MongoDB
   ↓
API Response
   ↓
React State
   ↓
UI Update
```

------------------------------------------------------------------------

# 🎨 Frontend Features

## 🏠 Dashboard

The Dashboard currently provides:

-   Welcome section
-   Total Todo count
-   Completed Todo count
-   Pending Todo count
-   Today's Todo count
-   Todo list
-   Search
-   Filters
-   Sorting
-   Pagination
-   Todo status updates
-   Edit Todo
-   Delete individual Todo

------------------------------------------------------------------------

## 🔍 Search

The Todo list supports client-side search by title.

Features:

-   Case-insensitive search
-   Filters the currently loaded Todo collection
-   Resets pagination when the search query changes

------------------------------------------------------------------------

## 🔎 Filtering

The Dashboard supports:

-   Todo ID filtering
-   Title filtering
-   Status filtering
-   Start date filtering
-   End date filtering

Date filters follow the backend definitions:

-   Start date → Todo creation date
-   End date → Todo target/due date

------------------------------------------------------------------------

## ↕️ Sorting

The Todo list supports:

-   Newest First
-   Oldest First

Sorting is based on the Todo `createdAt` date.

The application intentionally works with the creation **date** rather
than displaying the full creation timestamp.

------------------------------------------------------------------------

## 📄 Pagination

The Todo list supports:

-   Configurable items per page
-   Page navigation
-   Current page tracking
-   Pagination count based on the filtered and sorted results

The data flow is:

``` text
Todos
  ↓
Search
  ↓
Filters
  ↓
Sorting
  ↓
Pagination
  ↓
Displayed Todos
```

------------------------------------------------------------------------

## ☑️ Todo Status

Todos can be marked as completed directly from the Todo list.

When a Todo is completed:

-   Its status is updated through the backend API
-   Completed Todo business rules are respected
-   Dashboard statistics are updated

------------------------------------------------------------------------

## ✏️ Todo Update

The application provides an edit flow for Todo tasks.

The existing backend business rules are respected by the frontend.

------------------------------------------------------------------------

## 🗑️ Todo Deletion

### Delete Individual Todo

-   Confirmation dialog is displayed before deletion
-   User can Cancel or Delete
-   API response is handled through the application dialog system
-   Todo list is refreshed after successful deletion

### Delete All Todos

-   Backend API is already implemented
-   Frontend integration is **not yet completed**
-   The feature will be implemented under the **My Todos** section
    rather than the Dashboard

------------------------------------------------------------------------

# 💬 API Response & Error Dialogs

The frontend includes a reusable API dialog system.

Dialogs are used for:

-   API success responses
-   API error responses
-   Individual Todo delete confirmation
-   Other API-related user feedback

Loading dialogs are not used for API calls.

The application uses dialogs to communicate the final API response to
the user.

------------------------------------------------------------------------

# 🌙 Theme / Dark Mode

The application supports:

-   Light mode
-   Dark mode
-   Theme switching from the Dashboard
-   Persistent theme preference using browser storage
-   Dynamic UI styling based on the selected theme

The sidebar maintains its dedicated application styling while the main
application content adapts to the selected theme.

------------------------------------------------------------------------

# 🏠 Application Logo & Dashboard Navigation

The application logo and **To Do App** title function as a
Dashboard/Home button.

### Behavior

When the user is already on the Dashboard:

``` text
Logo / Title
      ↓
Refresh Todo data
      ↓
Update Dashboard
```

When the user is on another application screen:

``` text
Logo / Title
      ↓
Navigate to Dashboard
```

This provides a consistent way to return to the Dashboard from the
application's sidebar screens.

------------------------------------------------------------------------

# 🔗 Frontend & Backend Communication

Frontend communicates with backend APIs using Axios.

Current API integration includes:

  Action        API
  ------------- -------------------------------
  Create Task   POST `/api/todos`
  Get Tasks     GET `/api/todos`
  Update Task   PUT `/api/todos/:id`
  Delete Task   DELETE `/api/todos/:id`
  Clear All     DELETE `/api/todos/clear-all`

The Clear All endpoint exists in the backend but its frontend UI
integration is currently pending.

------------------------------------------------------------------------

# 🚀 How To Run This Project

## 📌 Prerequisites

Install the following software:

-   Node.js
-   MongoDB
-   Git
-   VS Code (recommended)

------------------------------------------------------------------------

# 📥 Step 1: Clone Repository

``` bash
git clone <repository-url>
```

------------------------------------------------------------------------

# 📁 Step 2: Open Project

``` bash
cd ToDoApp
```

------------------------------------------------------------------------

# ⚙️ Step 3: Backend Setup

## Navigate to Backend

``` bash
cd Backend
```

## Install Dependencies

``` bash
npm install
```

------------------------------------------------------------------------

# 🔐 Step 4: Configure Environment Variables

Create `.env` file inside Backend folder:

``` env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ToDoAPP
NODE_ENV=development
```

------------------------------------------------------------------------

# ▶️ Step 5: Start Backend Server

``` bash
npm run dev
```

OR

``` bash
node server.js
```

Expected Output:

``` bash
Database Connected Successfully
Server running on port 5000
```

------------------------------------------------------------------------

# 🌐 Step 6: Access Swagger Documentation

Open browser:

``` bash
http://localhost:5000/api-docs
```

------------------------------------------------------------------------

# 🎨 Step 7: Frontend Setup

## Navigate to Frontend

``` bash
cd Frontend
```

## Install Dependencies

``` bash
npm install
```

------------------------------------------------------------------------

# ▶️ Step 8: Start Frontend

``` bash
npm start
```

Frontend will start on:

``` bash
http://localhost:3000
```

------------------------------------------------------------------------

# 🔧 Important Backend Files Explanation

## server.js

Responsible for:

-   Starting backend server
-   Loading environment variables
-   Connecting database

------------------------------------------------------------------------

## app.js

Responsible for:

-   Express app configuration
-   Middleware setup
-   Route registration
-   Swagger integration

------------------------------------------------------------------------

## db.js

Responsible for:

-   MongoDB connection setup
-   Connection error handling

------------------------------------------------------------------------

## swagger.js

Responsible for:

-   Swagger configuration
-   API documentation setup

------------------------------------------------------------------------

## todoControllers.js

Responsible for:

-   API business logic
-   CRUD operation handling
-   Validation handling
-   Response formatting
-   Filtering logic

------------------------------------------------------------------------

## Todo.js

Responsible for:

-   Main ToDo database schema
-   Mongoose model definition
-   Timestamp management

------------------------------------------------------------------------

## Counter.js

Responsible for:

-   Maintaining auto increment counter
-   Generating unique custom IDs

------------------------------------------------------------------------

## todos.js

Responsible for:

-   API route definitions
-   Swagger endpoint annotations
-   Route-controller mapping

------------------------------------------------------------------------

## updateHelper.js

Responsible for:

-   Centralized update validation
-   Ignoring invalid updates
-   Building safe update objects

------------------------------------------------------------------------

# 📌 API Summary

  Method   Endpoint                 Description
  -------- ------------------------ ------------------
  GET      `/api/todos`             Get all todos
  POST     `/api/todos`             Create todo
  PUT      `/api/todos/:id`         Update todo
  DELETE   `/api/todos/:id`         Delete todo
  DELETE   `/api/todos/clear-all`   Delete all todos

------------------------------------------------------------------------

# 🛡️ Error Handling Implemented

-   Invalid ID validation
-   Empty update prevention
-   Invalid date prevention
-   Completed task restriction
-   Database connection handling
-   Route level validations
-   Frontend API error handling
-   Frontend API success feedback
-   Delete confirmation handling

------------------------------------------------------------------------

# 📈 Current Development Status

## ✅ Completed

-   Backend REST APIs
-   MongoDB integration
-   CRUD operations
-   Business rules
-   Swagger documentation
-   Frontend API integration
-   Dashboard
-   Todo creation
-   Todo editing
-   Individual Todo deletion
-   Todo completion/status update
-   Search
-   Filters
-   Date-based filtering
-   Sorting
-   Pagination
-   API response dialogs
-   Delete confirmation dialog
-   Light/Dark mode
-   Dashboard refresh through Logo/Title

## 🚧 In Progress / Pending

-   Sidebar navigation
-   My Todos dedicated screen
-   Delete All frontend integration under My Todos
-   Calendar screen
-   Completed Todos screen
-   Statistics screen
-   Settings screen
-   Shared sidebar component across application screens

------------------------------------------------------------------------

# 📈 Future Improvements

Potential future enhancements:

-   Calendar-based Todo management
-   Dedicated Completed Todo view
-   Dedicated Statistics dashboard
-   Application Settings
-   Improved reusable component architecture
-   Additional UI/UX improvements

------------------------------------------------------------------------

# 👨‍💻 Author

### Satyam Choudhary

Built as a learning-focused Full Stack MERN project for understanding:

-   Backend architecture
-   REST APIs
-   MongoDB integration
-   Business rule implementation
-   React frontend development
-   API integration
-   Full Stack application architecture

------------------------------------------------------------------------

# 📄 License

This project is open for learning and educational purposes.
