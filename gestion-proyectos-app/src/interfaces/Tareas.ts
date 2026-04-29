

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: "pendiente" | "en_progreso" | "completada";
    proyectoId: number;
    usuarioId?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface CrearTareaDTO {
    titulo: string;
    descripcion: string;
    estado?: "pendiente" | "en_progreso" | "completada";
    proyectoId: number;
    usuarioId?: number;
}

export interface ActualizarTareaDTO {
    titulo?: string;
    descripcion?: string;
    estado?: "pendiente" | "en_progreso" | "completada";
    proyectoId?: number;
    usuarioId?: number;
}

export type EstadoTarea = "pendiente" | "en_progreso" | "completada";

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
    proyectoId: number;
    usuarioId?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface ActualizarTareaDTO {
    titulo?: string;
    descripcion?: string;
    estado?: EstadoTarea;
    proyectoId?: number;
    usuarioId?: number;
}