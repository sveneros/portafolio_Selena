
import { Pencil, Trash2, CheckCircle, Clock, PlayCircle, User } from "lucide-react";
import type { Tarea, EstadoTarea } from "../../interfaces/Tareas";
import type { Proyecto } from "../../interfaces/Proyectos";
import type { Usuario } from "../../interfaces/Usuarios";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
    tareas: Tarea[];  
    loading: boolean;
    onEditar: (tarea: Tarea) => void;
    onEliminar: (id: number) => void;
    onActualizarEstado: (id: number, nuevoEstado: EstadoTarea) => Promise<void>;
    proyectos: Proyecto[];
    usuarios: Usuario[];
}

const estadoConfig = {
    pendiente: { label: "Pendiente", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    en_progreso: { label: "En Progreso", icon: PlayCircle, color: "text-blue-600 bg-blue-50" },
    completada: { label: "Completada", icon: CheckCircle, color: "text-green-600 bg-green-50" },
};

export default function TareasTable({ 
    tareas, 
    loading, 
    onEditar, 
    onEliminar, 
    onActualizarEstado, 
    proyectos, 
    usuarios 
}: Props) {
    if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando tareas...</div>;

    if (!tareas.length) return <EmptyState icon={CheckCircle} title="Sin tareas" description="Crea tu primera tarea" />;

    const getProyectoNombre = (proyectoId: number) => {
        const proyecto = proyectos.find(p => p.id === proyectoId);
        return proyecto?.nombre || `Proyecto ${proyectoId}`;
    };

    const getUsuarioNombre = (usuarioId?: number) => {
        if (!usuarioId) return "No asignado";
        const usuario = usuarios.find(u => u.id === usuarioId);
        return usuario?.nombre || `Usuario ${usuarioId}`;
    };

    const handleEstadoChange = (tareaId: number, nuevoEstado: EstadoTarea) => {
        onActualizarEstado(tareaId, nuevoEstado);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-semibold">
                        <tr>
                            <th className="text-left px-5 py-3">#</th>
                            <th className="text-left px-5 py-3">Título</th>
                            <th className="text-left px-5 py-3">Descripción</th>
                            <th className="text-left px-5 py-3">Proyecto</th>
                            <th className="text-left px-5 py-3">Asignado a</th>
                            <th className="text-left px-5 py-3">Estado</th>
                            <th className="text-left px-5 py-3">Creado</th>
                            <th className="text-left px-5 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas.map((tarea, index) => {
                            const EstadoIcon = estadoConfig[tarea.estado].icon;
                            return (
                                <tr key={tarea.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-5 py-3 text-slate-500">{index + 1}</td>
                                    <td className="px-5 py-3 font-medium text-slate-800">{tarea.titulo}</td>
                                    <td className="px-5 py-3 text-slate-600 max-w-xs truncate">
                                        {tarea.descripcion || "Sin descripción"}
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">
                                        {getProyectoNombre(tarea.proyectoId)}
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <User size={14} className="text-slate-400" />
                                            {getUsuarioNombre(tarea.usuarioId)}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${estadoConfig[tarea.estado].color}`}>
                                                <EstadoIcon size={12} />
                                                {estadoConfig[tarea.estado].label}
                                            </span>
                                            <select
                                                value={tarea.estado}
                                                onChange={(e) => handleEstadoChange(tarea.id, e.target.value as EstadoTarea)}
                                                className="text-xs border rounded-lg px-2 py-1 bg-white hover:bg-slate-50 cursor-pointer"
                                            >
                                                <option value="pendiente">📋 Pendiente</option>
                                                <option value="en_progreso">⚡ En Progreso</option>
                                                <option value="completada">✅ Completada</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-slate-400">
                                        {new Date(tarea.createdAt).toLocaleDateString('es-BO')}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <Button variant="ghost" onClick={() => onEditar(tarea)} icon={<Pencil size={14} />}>
                                                Editar
                                            </Button>
                                            <Button variant="danger" onClick={() => onEliminar(tarea.id)} icon={<Trash2 size={14} />}>
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}