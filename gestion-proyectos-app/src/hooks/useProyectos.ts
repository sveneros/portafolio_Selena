import { useState, useEffect } from "react";
import { proyectoService } from "../services/proyectoService";
import type { Proyecto, CrearProyectoDTO, ActualizarProyectoDTO } from "../interfaces/Proyectos";

export function useProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    const cargarProyectos = async () => {
        try {
            setLoading(true);
            const data = await proyectoService.getAll(); // ← getAll
            setProyectos(data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al cargar proyectos");
        } finally {
            setLoading(false);
        }
    };

    
    const crear = async (data: CrearProyectoDTO) => {
        try {
            const nuevoProyecto = await proyectoService.create(data); // ← create
            setProyectos(prev => [nuevoProyecto, ...prev]);
            return nuevoProyecto;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al crear proyecto");
            throw err;
        }
    };

    const actualizar = async (id: number, data: ActualizarProyectoDTO) => {
        try {
            const proyectoActualizado = await proyectoService.update(id, data); // ← update
            setProyectos(prev => prev.map(p => p.id === id ? proyectoActualizado : p));
            return proyectoActualizado;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al actualizar proyecto");
            throw err;
        }
    };

   
    const eliminar = async (id: number) => {
        try {
            await proyectoService.remove(id); // ← remove
            setProyectos(prev => prev.filter(p => p.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al eliminar proyecto");
            throw err;
        }
    };

    useEffect(() => {
        cargarProyectos();
    }, []);

    return {
        proyectos,
        loading,
        error,
        crear,
        actualizar,
        eliminar,
        recargar: cargarProyectos,
    };
}