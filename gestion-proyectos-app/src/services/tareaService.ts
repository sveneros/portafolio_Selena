
import axiosInstance from "../api/axiosinstance";
import type { Tarea, CrearTareaDTO, ActualizarTareaDTO } from "../interfaces/Tareas";

const BASE_URL = "/tareas";

export const tareaService = {
    // Obtener todas las tareas
    async getAll(): Promise<Tarea[]> {
        const response = await axiosInstance.get(BASE_URL);
        return response.data;
    },

    // Obtener tareas por proyecto
    async getByProyecto(proyectoId: number): Promise<Tarea[]> {
        const response = await axiosInstance.get(`${BASE_URL}?proyectoId=${proyectoId}`);
        return response.data;
    },

    // Obtener una tarea por ID
    async getById(id: number): Promise<Tarea> {
        const response = await axiosInstance.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    // Crear una nueva tarea
    async create(data: CrearTareaDTO): Promise<Tarea> {
        const response = await axiosInstance.post(BASE_URL, data);
        return response.data;
    },

    // Actualizar una tarea
    async update(id: number, data: ActualizarTareaDTO): Promise<Tarea> {
        const response = await axiosInstance.patch(`${BASE_URL}/${id}`, data);
        return response.data;
    },

    // Eliminar una tarea
    async remove(id: number): Promise<void> {
        await axiosInstance.delete(`${BASE_URL}/${id}`);
    },
};