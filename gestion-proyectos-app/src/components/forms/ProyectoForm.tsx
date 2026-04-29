
import { useForm } from "react-hook-form";
import type { CrearProyectoDTO } from "../../interfaces/Proyectos";
import Button from "../ui/Button";

interface Props {
    onSubmit: (data: CrearProyectoDTO) => Promise<void>;
    onCancel: () => void;
    usuarios?: { id: number; nombre: string }[]; 
}

export default function ProyectoForm({ onSubmit, onCancel, usuarios = [] }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CrearProyectoDTO>();

    const campo = "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const error = "border-red-400 bg-red-50";
    const normal = "border-slate-200 bg-white";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre del Proyecto *
                </label>
                <input
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                        maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    })}
                    className={`${campo} ${errors.nombre ? error : normal}`}
                    placeholder="Mi proyecto increíble"
                />
                {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción
                </label>
                <textarea
                    {...register("descripcion", {
                        maxLength: { value: 500, message: "Máximo 500 caracteres" },
                    })}
                    className={`${campo} ${errors.descripcion ? error : normal}`}
                    rows={4}
                    placeholder="Describe tu proyecto..."
                />
                {errors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Usuario Asignado *
                </label>
                <select
                    {...register("usuarioId", {
                        required: "Debes seleccionar un usuario",
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.usuarioId ? error : normal}`}
                >
                    <option value="">Seleccionar usuario</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre}
                        </option>
                    ))}
                </select>
                {errors.usuarioId && (
                    <p className="text-red-500 text-xs mt-1">{errors.usuarioId.message}</p>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Crear Proyecto"}
                </Button>
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}