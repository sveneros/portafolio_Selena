import { useForm } from "react-hook-form";
import type { Tarea, ActualizarTareaDTO } from "../../interfaces/Tareas";
import type { Proyecto } from "../../interfaces/Proyectos";
import type { Usuario } from "../../interfaces/Usuarios";  // ← IMPORTAR Usuario
import Button from "../ui/Button";

interface Props {
    tareas: Tarea;
    onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
    onCancel: () => void;
    proyectos: Proyecto[];
    usuarios?: Usuario[];  
}

export default function EditarTareaForm({ 
    tareas, 
    onSubmit, 
    onCancel, 
    proyectos,
    usuarios = []  
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ActualizarTareaDTO>({
        defaultValues: {
            titulo: tareas.titulo,
            descripcion: tareas.descripcion,
            estado: tareas.estado,
            proyectoId: tareas.proyectoId,
            usuarioId: tareas.usuarioId,  
        },
    });

    const campo = "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const error = "border-red-400 bg-red-50";
    const normal = "border-slate-200 bg-white";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Título */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Título *
                </label>
                <input
                    {...register("titulo", {
                        required: "El título es obligatorio",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                    })}
                    className={`${campo} ${errors.titulo ? error : normal}`}
                />
                {errors.titulo && (
                    <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
                )}
            </div>

            {/* Descripción  */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción *
                </label>
                <textarea
                    {...register("descripcion", {
                        required: "La descripción es obligatoria",  // ← AÑADIR required
                        minLength: { value: 10, message: "Mínimo 10 caracteres" },  // ← AÑADIR
                    })}
                    className={`${campo} ${errors.descripcion ? error : normal}`}
                    rows={3}
                />
                {errors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                )}
            </div>

            {/* Proyecto */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Proyecto *
                </label>
                <select
                    {...register("proyectoId", {
                        required: "Debes seleccionar un proyecto",
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.proyectoId ? error : normal}`}
                >
                    <option value="">Seleccionar proyecto</option>
                    {proyectos.map(proyecto => (
                        <option key={proyecto.id} value={proyecto.id}>
                            {proyecto.nombre}
                        </option>
                    ))}
                </select>
                {errors.proyectoId && (
                    <p className="text-red-500 text-xs mt-1">{errors.proyectoId.message}</p>
                )}
            </div>

            {/* Usuario Asignado (opcional)  */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Asignar a Usuario <span className="text-slate-400 text-xs">(opcional)</span>
                </label>
                <select
                    {...register("usuarioId", {
                        valueAsNumber: true,
                        required: false,
                    })}
                    className={`${campo} ${normal}`}
                >
                    <option value="">Sin asignar</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                    Puedes dejar la tarea sin asignar
                </p>
            </div>

            {/* Estado */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Estado
                </label>
                <select
                    {...register("estado")}
                    className={`${campo} ${normal}`}
                >
                    <option value="pendiente">📋 Pendiente</option>
                    <option value="en_progreso">⚡ En Progreso</option>
                    <option value="completada">✅ Completada</option>
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Actualizar Tarea"}
                </Button>
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}