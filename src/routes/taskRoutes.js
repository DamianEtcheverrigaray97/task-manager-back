const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la tarea.
 *         title:
 *           type: string
 *           description: El título de la tarea.
 *         description:
 *           type: string
 *           description: La descripción de la tarea.
 *         completed:
 *           type: boolean
 *           description: El estado de la tarea (completada o pendiente).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea.
 *       example:
 *         id: 64fb6c7d6b72891548f3e97a
 *         title: "Comprar leche"
 *         description: "Comprar 2 litros de leche en el supermercado"
 *         completed: false
 *         createdAt: "2024-12-28T15:30:00.000Z"
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 */
const validateCreateTask = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isString().withMessage('El título debe ser un texto')
        .isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('completed')
        .optional()
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
];

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado (true para completadas, false para pendientes).
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
const validateGetTasks = [
    query('completed').optional().isBoolean().withMessage('El parámetro completed debe ser un valor booleano'),
];

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea específica
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a buscar.
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada.
 */
const validateGetTaskById = [
    param('id').isMongoId().withMessage('El ID de la tarea no es válido'),
];

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       404:
 *         description: Tarea no encontrada.
 */
const validateUpdateTask = [
    param('id').isMongoId().withMessage('El ID de la tarea no es válido'),
    body('title')
        .optional()
        .isString().withMessage('El título debe ser un texto')
        .isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('completed')
        .optional()
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
];

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar.
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 */
const validateDeleteTask = [
    param('id').isMongoId().withMessage('El ID de la tarea no es válido'),
];

/**
 * Función para manejar los errores de validación
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * Endpoints con validaciones
 */
router.post('/', validateCreateTask, handleValidationErrors, createTask);
router.get('/', validateGetTasks, handleValidationErrors, getTasks);
router.get('/:id', validateGetTaskById, handleValidationErrors, getTaskById);
router.put('/:id', validateUpdateTask, handleValidationErrors, updateTask);
router.delete('/:id', validateDeleteTask, handleValidationErrors, deleteTask);

module.exports = router;
