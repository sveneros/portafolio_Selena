
import { useState, useEffect } from "react";
import { tareaService } from "../services/tareaService";
import type { Tarea, CrearTareaDTO, ActualizarTareaDTO } from "../interfaces/Tareas";

export function useTareas() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarTareas = async () => {
        try {
            setLoading(true);
            const data = await tareaService.getAll();
            setTareas(data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al cargar tareas");
        } finally {
            setLoading(false);
        }
    };

    const crear = async (data: CrearTareaDTO) => {
        try {
            const nuevaTarea = await tareaService.create(data);
            setTareas(prev => [nuevaTarea, ...prev]);
            return nuevaTarea;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al crear tarea");
            throw err;
        }
    };

    const actualizar = async (id: number, data: ActualizarTareaDTO) => {
        try {
            const tareaActualizada = await tareaService.update(id, data);
            setTareas(prev => prev.map(t => t.id === id ? tareaActualizada : t));
            return tareaActualizada;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al actualizar tarea");
            throw err;
        }
    };

    const eliminar = async (id: number) => {
        try {
            await tareaService.remove(id);
            setTareas(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Error al eliminar tarea");
            throw err;
        }
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    return {
        tareas,
        loading,
        error,
        crear,
        actualizar,
        eliminar,
        recargar: cargarTareas,
    };
}