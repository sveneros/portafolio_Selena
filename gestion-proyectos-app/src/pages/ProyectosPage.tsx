
import { useState, useEffect } from "react";
import type { CrearProyectoDTO, ActualizarProyectoDTO, Proyecto } from "../interfaces/Proyectos";
import type { Usuario } from "../interfaces/Usuarios";
import { useProyectos } from "../hooks/useProyectos";
import { usuarioService } from "../services/usuarioService";
import ProyectoForm from "../components/forms/ProyectoForm";
import EditarProyectoForm from "../components/forms/EditarProyectoForm";
import ProyectosTable from "../components/tables/ProyectosTable";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default function ProyectosPage() {
    const { proyectos, loading, error, crear, actualizar, eliminar } = useProyectos();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [showCrear, setShowCrear] = useState(false);
    const [seleccionado, setSeleccionado] = useState<Proyecto | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                
                const data = await usuarioService.getAll();
                setUsuarios(data);
            } catch (err) {
                console.error("Error cargando usuarios:", err);
            }
        };
        cargarUsuarios();
    }, []);

    const handleCrear = async (data: CrearProyectoDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowCrear(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleActualizar = async (data: ActualizarProyectoDTO) => {
        if (!seleccionado) return;
        try {
            setFormError(null);
            await actualizar(seleccionado.id, data);
            setSeleccionado(null);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleEliminar = async (id: number) => {
        if (confirm("¿Confirmas eliminar este proyecto?")) {
            try {
                await eliminar(id);
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    
    const usuariosMap = usuarios.reduce((map, user) => {
        map[user.id] = user.nombre;
        return map;
    }, {} as Record<number, string>);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Proyectos</h1>
                    <p className="text-slate-500 text-sm mt-1">{proyectos.length} proyecto(s) registrado(s)</p>
                </div>
                <Button onClick={() => setShowCrear(true)}>Nuevo Proyecto</Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            <ProyectosTable
                proyectos={proyectos}
                loading={loading}
                onEditar={(p) => {
                    setFormError(null);
                    setSeleccionado(p);
                }}
                onEliminar={handleEliminar}
                usuarios={usuariosMap}
            />

            {/* Modal: Crear */}
            <Modal open={showCrear} onClose={() => setShowCrear(false)} title="Nuevo Proyecto">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
                <ProyectoForm
                    onSubmit={handleCrear}
                    onCancel={() => setShowCrear(false)}
                    usuarios={usuarios}
                />
            </Modal>

            {/* Modal: Editar */}
            <Modal open={!!seleccionado} onClose={() => setSeleccionado(null)} title="Editar Proyecto">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
                {seleccionado && (
                    <EditarProyectoForm
                        proyecto={seleccionado}
                        onSubmit={handleActualizar}
                        onCancel={() => setSeleccionado(null)}
                        usuarios={usuarios}
                    />
                )}
            </Modal>
        </div>
    );
}