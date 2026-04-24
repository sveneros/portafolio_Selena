const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API gestion de proyectos',
            version: '1.0.0',
            description: 'API REST para la gestion de proyectos',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                // ==================== USUARIOS ====================
                Usuario: {
                    type: 'object',
                    properties: {  
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Selena Veneros' },
                        email: { type: 'string', example: 'selena@example.com' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' }
                    },
                },
                crearUsuario: {
                    type: 'object',
                    required: ['nombre', 'email', 'password'],
                    properties: {  
                        nombre: { type: 'string', example: 'Selena Veneros' },
                        email: { type: 'string', example: 'selena@example.com' },
                        password: { type: 'string', example: 'Seguro123!' },
                    },
                },
                actualizarUsuario: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Selena Veneros' },
                        email: { type: 'string', example: 'selena@example.com' },
                        password: { type: 'string', example: 'Seguro123!' }
                    },
                },

                // ==================== PROYECTOS ====================
                Proyecto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Mi Proyecto' },
                        descripcion: { type: 'string', example: 'Descripción del proyecto' },
                        estado: { type: 'string', example: 'activo' },
                        createdAt: { type: 'string', format: 'date-time' },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                crearProyecto: {
                    type: 'object',
                    required: ['nombre'],
                    properties: {
                        nombre: { type: 'string', example: 'Mi Proyecto' },
                        descripcion: { type: 'string', example: 'Descripción del proyecto' },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                actualizarProyecto: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Proyecto Actualizado' },
                        descripcion: { type: 'string', example: 'Nueva descripción' },
                        estado: { type: 'string', enum: ['activo', 'completado', 'cancelado'], example: 'completado' },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },

                // ==================== TAREAS ====================
                Tarea: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Mi Tarea' },
                        descripcion: { type: 'string', example: 'Descripción de la tarea' },
                        estado: { type: 'string', example: 'pendiente' },
                        createdAt: { type: 'string', format: 'date-time' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                crearTarea: {
                    type: 'object',
                    required: ['titulo'],
                    properties: {
                        titulo: { type: 'string', example: 'Mi Tarea' },
                        descripcion: { type: 'string', example: 'Descripción de la tarea' },
                        estado: { type: 'string', enum: ['pendiente', 'en_progreso', 'completada'], example: 'pendiente' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                actualizarTarea: {
                    type: 'object',
                    properties: {
                        titulo: { type: 'string', example: 'Tarea Actualizada' },
                        descripcion: { type: 'string', example: 'Nueva descripción' },
                        estado: { type: 'string', enum: ['pendiente', 'en_progreso', 'completada'], example: 'completada' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                }
            }
        },
    },
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };