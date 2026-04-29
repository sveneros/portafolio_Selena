import { Pencil, Trash2, Users, Key } from "lucide-react"; 
import type {Usuario} from "../../interfaces/Usuarios"
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props{
    usuarios: Usuario [];
    loading: boolean;
    onEliminar: (id: number)=>void;
    onEditar:(usuario: Usuario)=>void;
    onCambiarPassword: (usuario: Usuario) => void; 
}

export default function UsuariosTable({ 
    usuarios, 
    loading, 
    onEditar, 
    onEliminar,
    onCambiarPassword  
}: Props) {
    if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando usuarios...</div>;
    
    if (!usuarios.length) return <EmptyState icon={Users} title="Sin usuarios" description="Crea el primer usuario" />;
    
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                    <tr>
                        <th className="text-left px-5 py-3">#</th>
                        <th className="text-left px-5 py-3">Nombre</th>
                        <th className="text-left px-5 py-3">Email</th>
                        <th className="text-left px-5 py-3">Registrado</th>
                        <th className="text-left px-5 py-3">Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id} className="border-t border-slate-100">
                            <td className="px-5 py-3 text-slate-500">{index + 1}</td>
                            <td className="px-5 py-3 font-medium text-slate-800">{usuario.nombre}</td>
                            <td className="px-5 py-3 text-slate-600">{usuario.email}</td>
                            <td className="px-5 py-3 text-slate-400">
                                {new Date(usuario.createdAt).toLocaleDateString('es-BO')}
                            </td>
                            <td className="px-5 py-3">
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => onEditar(usuario)} icon={<Pencil size={14} />}>
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="ghost"  
                                        onClick={() => onCambiarPassword(usuario)} 
                                        icon={<Key size={14} />}  
                                    >
                                        Cambiar Password
                                    </Button>
                                    <Button variant="danger" onClick={() => onEliminar(usuario.id)} icon={<Trash2 size={14} />}>
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