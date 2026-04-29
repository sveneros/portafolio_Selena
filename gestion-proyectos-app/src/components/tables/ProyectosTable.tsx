
import { Pencil, Trash2, FolderOpen } from "lucide-react";
import type { Proyecto } from "../../interfaces/Proyectos";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
    proyectos: Proyecto[];
    loading: boolean;
    onEditar: (proyecto: Proyecto) => void;
    onEliminar: (id: number) => void;
    usuarios?: Record<number, string>; 
}

export default function ProyectosTable({ proyectos, loading, onEditar, onEliminar, usuarios = {} }: Props) {
    if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando proyectos...</div>;

    if (!proyectos.length) return <EmptyState icon={FolderOpen} title="Sin proyectos" description="Crea tu primer proyecto" />;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                    <tr>
                        <th className="text-left px-5 py-3">#</th>
                        <th className="text-left px-5 py-3">Nombre</th>
                        <th className="text-left px-5 py-3">Descripción</th>
                        <th className="text-left px-5 py-3">Usuario</th>
                        <th className="text-left px-5 py-3">Creado</th>
                        <th className="text-left px-5 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proyectos.map((proyecto, index) => (
                        <tr key={proyecto.id} className="border-t border-slate-100">
                            <td className="px-5 py-3 text-slate-500">{index + 1}</td>
                            <td className="px-5 py-3 font-medium text-slate-800">{proyecto.nombre}</td>
                            <td className="px-5 py-3 text-slate-600 max-w-xs truncate">
                                {proyecto.descripcion || "Sin descripción"}
                            </td>
                            <td className="px-5 py-3 text-slate-600">
                                {usuarios[proyecto.usuarioId] || `Usuario ${proyecto.usuarioId}`}
                            </td>
                            <td className="px-5 py-3 text-slate-400">
                                {new Date(proyecto.createdAt).toLocaleDateString('es-BO')}
                            </td>
                            <td className="px-5 py-3">
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => onEditar(proyecto)} icon={<Pencil size={14} />}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => onEliminar(proyecto.id)} icon={<Trash2 size={14} />}>
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}