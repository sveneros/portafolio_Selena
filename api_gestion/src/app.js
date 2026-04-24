require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { swaggerSpec, swaggerUi } = require('./config/swagger');

//Importar rutas
const usuarioRoutes = require('./routes/usuario.routes');
const proyectoRoutes = require('./routes/proyecto.routes');  
const tareaRoutes = require('./routes/tarea.routes');        

const app = express();
const PORT = process.env.PORT || 3010;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.send('HOLA MUNDO');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  Rutas de la API
app.use('/api', usuarioRoutes);
app.use('/api', proyectoRoutes);  
app.use('/api', tareaRoutes);      


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Documentación: http://localhost:${PORT}/api-docs`);
});