const express = require('express'); 
const router = express.Router();
const todoController = require('../controllers/todoControllers');

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos with optional filters
 *     description: Retrieve todos with filtering options
 *     tags:
 *       - Todos
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
 *         description: List of todos
 */
router.get('/', todoController.getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Add a new todo item to the database
 *     tags: [Todos]
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
 *                 format: date-time
 *                 example: 2026-05-10
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', todoController.createToDo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
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
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */
router.put('/:id', todoController.updateToDo);

/**
 * @swagger
 * /api/todos/clear-all:
 *   delete:
 *     summary: Clear all todos (Reset)
 *     description: Deletes all todos from the system (used for UI reset)
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: All todos cleared successfully
 */
router.delete('/clear-all', todoController.deleteAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete('/:id', todoController.deleteToDo);

module.exports = router;