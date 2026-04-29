import axiosInstance from "../api/axiosinstance.ts";
import type { CrearUsuarioDTO, Usuario } from "../interfaces/Usuarios";
import type { ActualizarUsuarioDTO } from "../interfaces/Usuarios";

export const usuarioService = {
    getAll: async (): Promise<Usuario[]> => {
        const { data } = await axiosInstance.get<Usuario[]>("/usuarios");
        return data;
    },
    
    getById: async (id: number): Promise<Usuario> => {
        const { data } = await axiosInstance.get<Usuario>(`/usuarios/${id}`);
        return data;
    },
    
    create: async (payload: CrearUsuarioDTO): Promise<Usuario> => {
        const { data } = await axiosInstance.post<Usuario>("/usuarios", payload);
        return data;
    },
    
    update: async (id: number, payload: ActualizarUsuarioDTO): Promise<Usuario> => {
        const { data } = await axiosInstance.patch<Usuario>(`/usuarios/${id}`, payload);
        return data;
    },
    
    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/usuarios/${id}`);
    },
};