const routes = require('express').Router();
const controllerTarea = require('../controllers/tarea.controller'); 

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
routes.get('/tareas', controllerTarea.getTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
routes.get('/tareas/:id', controllerTarea.getTareaById);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Mi tarea"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la tarea"
 *               estado:
 *                 type: string
 *                 example: "pendiente"
 *               proyectoId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tarea creada
 *       400:
 *         description: Datos inválidos
 */
routes.post('/tareas', controllerTarea.createTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualiza una tarea parcialmente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completada]
 *               proyectoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
routes.patch('/tareas/:id', controllerTarea.updateTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
routes.delete('/tareas/:id', controllerTarea.deleteTarea);

module.exports = routes;