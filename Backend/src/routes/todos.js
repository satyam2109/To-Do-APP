const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

/**
 * @swagger
 * /todo/fetchTodo:
 *   get:
 *     summary: Get all todos with optional filters
 *     description: Retrieve todos with filtering options
 *     tags:
 *       - Todos
 *
 *     parameters:
 *       - in: query
 *         name: todoId
 *         schema:
 *           type: integer
 *         description: Filter by todo ID
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Filter by status (true/false)
 *
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by title (partial match)
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from this date (YYYY-MM-DD)
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter till this date (YYYY-MM-DD)
 *
 *     responses:
 *       200:
 *         description: Successfully fetched todos
 *         content:
 *           application/json:
 *             example:
 *               total_no_of_records: 2
 *               message: Success
 *               To_Do:
 *                 - todoId: 1
 *                   title: Learn MERN
 *                   description: Complete backend APIs
 *                   status: false
 *                   targetDate: 2026-05-20
 *                   createdAt: 2026-05-10
 *                   updatedAt: 2026-05-10
 *
 *                 - todoId: 2
 *                   title: Learn React
 *                   description: Build frontend UI
 *                   status: true
 *                   targetDate: 2026-05-25
 *                   createdAt: 2026-05-11
 *                   updatedAt: 2026-05-12
 *
 *       400:
 *         description: Invalid query parameter
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid todoId
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.get('/', todoController.getTodos);

/**
 * @swagger
 * /todo/createTodo:
 *   post:
 *     summary: Create a new todo
 *     description: Add a new todo item to the database
 *     tags:
 *       - Todos
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn MERN properly
 *               description:
 *                 type: string
 *                 example: Build backend step by step
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-10
 *
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Created Successfully
 *               Response_To_Do:
 *                 todoId: 1
 *                 title: Learn MERN properly
 *                 description: Build backend step by step
 *                 status: false
 *                 targetDate: 2026-05-10
 *                 createdAt: 2026-05-11
 *                 updatedAt: 2026-05-11
 *
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             example:
 *               message: Title is required
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/', todoController.createToDo);

/**
 * @swagger
 * /todo/updateTodo/{id}:
 *   put:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               targetDate:
 *                 type: string
 *                 format: date
 *
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Updated Successfully
 *               updatedToDo:
 *                 todoId: 1
 *                 title: Learn MERN
 *                 description: Updated backend implementation
 *                 status: true
 *                 targetDate: 2026-05-20
 *
 *       400:
 *         description: Invalid request or completed task modification
 *         content:
 *           application/json:
 *             example:
 *               message: Completed Tasks cannot be modified
 *
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             example:
 *               message: Todo not found
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.put('/:id', todoController.updateToDo);

/**
 * @swagger
 * /todo/Clear-ALL:
 *   delete:
 *     summary: Clear all todos (Reset)
 *     description: Deletes all todos from the system
 *     tags:
 *       - Todos
 *
 *     responses:
 *       200:
 *         description: All todos cleared successfully
 *         content:
 *           application/json:
 *             example:
 *               message: All todos cleared successfully
 *               deletedCount: 5
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.delete('/clear-all', todoController.deleteAllTodos);

/**
 * @swagger
 * /todo/Delete-One/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Deleted Successfully
 *               deletedToDo:
 *                 todoId: 1
 *                 title: Learn MERN
 *
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid ID!
 *
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             example:
 *               message: Todo not found
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.delete('/:id', todoController.deleteToDo);

module.exports = router;