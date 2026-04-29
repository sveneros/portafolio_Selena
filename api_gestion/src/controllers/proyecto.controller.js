const prisma = require('../config/prisma'); 

const getProyectos = async (req, res, next) => { 
    try {
        const proyectos = await prisma.proyecto.findMany({  
            include: { 
                usuario: { select: { nombre: true } } 
            }
        });
        res.json(proyectos);  
    } catch (error) {
        next(error);
    }
}

const getProyectoById = async (req, res, next) => {
    try {
        const { id } = req.params;  

        const proyecto = await prisma.proyecto.findUnique({
            where: { id: Number(id) },  
            include: { 
                tareas: true, 
                usuario: { select: { nombre: true, email: true, createdAt: true } }  
            }, 
        });

        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.json(proyecto);
    } catch (error) {
        next(error);
    }
}

const createProyecto = async (req, res, next) => {
    try {
        const { nombre, descripcion, usuarioId } = req.body;

       
        if (usuarioId) {
            const existingUsuario = await prisma.user.findUnique({  
                where: { id: Number(usuarioId) },  
            });

            if (!existingUsuario) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
        }

        const proyecto = await prisma.proyecto.create({
            data: {
                nombre,
                descripcion,
                usuarioId: usuarioId ? Number(usuarioId) : undefined,
            },
            include: {
                usuario: true  
            }
        });

        res.status(201).json(proyecto);
    } catch (error) {
        next(error);
    }
};

const updateProyecto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, usuarioId } = req.body;

        const existingProyecto = await prisma.proyecto.findUnique({
            where: { id: Number(id) },  
        });

        if (!existingProyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        
        if (usuarioId) {
            const existingUsuario = await prisma.user.findUnique({  // ← Cambia "usuarios" por "user"
                where: { id: Number(usuarioId) },
            });

            if (!existingUsuario) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
        }

        const data = {};
        if (nombre !== undefined) data.nombre = nombre;
        if (descripcion !== undefined) data.descripcion = descripcion;
        if (usuarioId !== undefined) data.usuarioId = Number(usuarioId);

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se enviaron campos para actualizar' }); 
        }

        const updatedProyecto = await prisma.proyecto.update({
            where: { id: Number(id) },
            data
        });

        res.json(updatedProyecto);

    } catch (error) {
        next(error);
    }
};

const deleteProyecto = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const existingProyecto = await prisma.proyecto.findUnique({
            where: { id: parseInt(id) },
        });
        
        if (!existingProyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        
        await prisma.proyecto.delete({
            where: { id: parseInt(id) },
        });
        
        res.json({ message: 'Proyecto eliminado correctamente' });
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto };