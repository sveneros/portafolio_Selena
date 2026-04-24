const router = require('express').Router();
const controllerProyecto = require('../controllers/proyecto.controller');

/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Obtiene todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get('/proyectos', controllerProyecto.getProyectos);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   get:
 *     summary: Obtiene un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 */
router.get('/proyectos/:id', controllerProyecto.getProyectoById);  // ✅ Sin "s" en getProyectoById

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Proyecto creado
 */
router.post('/proyectos', controllerProyecto.createProyecto);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   patch:
 *     summary: Actualiza un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *       404:
 *         description: Proyecto no encontrado
 */
router.patch('/proyectos/:id', controllerProyecto.updateProyecto);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   delete:
 *     summary: Elimina un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto eliminado
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete('/proyectos/:id', controllerProyecto.deleteProyecto);

module.exports = router;