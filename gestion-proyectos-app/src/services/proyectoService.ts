import axiosInstance from "../api/axiosinstance";
import type { Proyecto, CrearProyectoDTO, ActualizarProyectoDTO } from "../interfaces/Proyectos";

const BASE_URL = "/proyectos";

export const proyectoService = {
    
    async getAll(): Promise<Proyecto[]> {
        const response = await axiosInstance.get(BASE_URL);
        return response.data;
    },

    
    async getById(id: number): Promise<Proyecto> {
        const response = await axiosInstance.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    
    async create(data: CrearProyectoDTO): Promise<Proyecto> {
        const response = await axiosInstance.post(BASE_URL, data);
        return response.data;
    },

   
    async update(id: number, data: ActualizarProyectoDTO): Promise<Proyecto> {
        const response = await axiosInstance.patch(`${BASE_URL}/${id}`, data);
        return response.data;
    },

    
    async remove(id: number): Promise<void> {
        await axiosInstance.delete(`${BASE_URL}/${id}`);
    },
};