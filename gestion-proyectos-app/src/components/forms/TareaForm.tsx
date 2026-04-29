
import { useForm } from "react-hook-form";
import type { CrearTareaDTO } from "../../interfaces/Tareas";
import type { Proyecto } from "../../interfaces/Proyectos";
import type { Usuario } from "../../interfaces/Usuarios";
import Button from "../ui/Button";

interface Props {
    onSubmit: (data: CrearTareaDTO) => Promise<void>;
    onCancel: () => void;
    proyectos: Proyecto[];
    usuarios?: Usuario[];  
}

export default function TareaForm({ onSubmit, onCancel, proyectos, usuarios = [] }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<CrearTareaDTO>({
        defaultValues: {
            estado: "pendiente"
        },
        mode: "onChange",  
    });

    const campo = "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const error = "border-red-400 bg-red-50";
    const normal = "border-slate-200 bg-white";

    
    const tituloValue = watch("titulo", "");
    const descripcionValue = watch("descripcion", "");
    const proyectoIdValue = watch("proyectoId");

    
    const esFormularioValido = () => {
        const tituloValido = tituloValue.length >= 3 && tituloValue.length <= 100;
        const descripcionValida = descripcionValue.length >= 10 && descripcionValue.length <= 500;
        const proyectoValido = proyectoIdValue && proyectoIdValue > 0;
        
        return tituloValido && descripcionValida && proyectoValido;
    };

    const botonHabilitado = esFormularioValido() && !isSubmitting;

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
                        maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    })}
                    className={`${campo} ${errors.titulo ? error : normal}`}
                    placeholder="Completar informe..."
                />
                {errors.titulo && (
                    <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
                )}
                {tituloValue.length > 0 && tituloValue.length < 3 && !errors.titulo && (
                    <p className="text-amber-500 text-xs mt-1">
                        ⚠️ El título debe tener al menos 3 caracteres (actual: {tituloValue.length})
                    </p>
                )}
                {tituloValue.length >= 3 && (
                    <p className="text-green-500 text-xs mt-1">✓ Título válido</p>
                )}
            </div>

            {/* Descripción  */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción *
                </label>
                <textarea
                    {...register("descripcion", {
                        required: "La descripción es obligatoria",  // ← AÑADIDO
                        minLength: { value: 10, message: "Mínimo 10 caracteres" },
                        maxLength: { value: 500, message: "Máximo 500 caracteres" },
                    })}
                    className={`${campo} ${errors.descripcion ? error : normal}`}
                    rows={3}
                    placeholder="Describe qué debe hacer la tarea..."
                />
                {errors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                )}
                {descripcionValue.length > 0 && descripcionValue.length < 10 && !errors.descripcion && (
                    <p className="text-amber-500 text-xs mt-1">
                        ⚠️ La descripción debe tener al menos 10 caracteres
                    </p>
                )}
                {descripcionValue.length >= 10 && (
                    <p className="text-green-500 text-xs mt-1">✓ Descripción válida</p>
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
                {proyectoIdValue && proyectoIdValue > 0 && (
                    <p className="text-green-500 text-xs mt-1">✓ Proyecto seleccionado</p>
                )}
            </div>

            {/* Usuario Asignado  */}
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
                    Puedes dejar la tarea sin asignar por ahora
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
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <Button 
                    type="submit" 
                    disabled={!botonHabilitado}
                    className={!botonHabilitado ? "opacity-50 cursor-not-allowed" : ""}
                >
                    {isSubmitting ? "Guardando..." : "Crear Tarea"}
                </Button>
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
            
            {!botonHabilitado && (
                <p className="text-xs text-amber-600 text-center">
                    ⚠️ Completa todos los requisitos para habilitar el botón
                </p>
            )}
        </form>
    );
}