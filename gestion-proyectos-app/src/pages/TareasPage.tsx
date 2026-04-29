import { useState, useEffect } from "react";
import type { CrearTareaDTO, ActualizarTareaDTO, Tarea } from "../interfaces/Tareas";
import type { Proyecto } from "../interfaces/Proyectos";
import type { Usuario } from "../interfaces/Usuarios";
import { useTareas } from "../hooks/useTareas";
import { proyectoService } from "../services/proyectoService";
import { usuarioService } from "../services/usuarioService";
import TareaForm from "../components/forms/TareaForm";
import EditarTareaForm from "../components/forms/EditarTareaForm";
import TareasTable from "../components/tables/TareasTable";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default function TareasPage() {
    const { tareas, loading, error, crear, actualizar, eliminar } = useTareas();
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [showCrear, setShowCrear] = useState(false);
    const [seleccionado, setSeleccionado] = useState<Tarea | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    // Cargar proyectos para el select
    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                const data = await proyectoService.getAll();
                setProyectos(data);
            } catch (err) {
                console.error("Error cargando proyectos:", err);
            }
        };
        cargarProyectos();
    }, []);

    // Cargar usuarios para "Asignado a"
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

    const handleCrear = async (data: CrearTareaDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowCrear(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleActualizar = async (data: ActualizarTareaDTO) => {
        if (!seleccionado) return;
        try {
            setFormError(null);
            await actualizar(seleccionado.id, data);
            setSeleccionado(null);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleActualizarEstado = async (id: number, nuevoEstado: "pendiente" | "en_progreso" | "completada") => {
    try {
        await actualizar(id, { estado: nuevoEstado });
    } catch (err: any) {
        alert(err.message);
    }
};

    const handleEliminar = async (id: number) => {
        if (confirm("¿Confirmas eliminar esta tarea?")) {
            try {
                await eliminar(id);
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Tareas</h1>
                    <p className="text-slate-500 text-sm mt-1">{tareas.length} tarea(s) registrada(s)</p>
                </div>
                <Button onClick={() => setShowCrear(true)}>Nueva Tarea</Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            <TareasTable
                tareas={tareas}
                loading={loading}
                onEditar={(t: Tarea) => {
                    setFormError(null);
                    setSeleccionado(t);
                }}
                onEliminar={handleEliminar}
                onActualizarEstado={handleActualizarEstado}
                proyectos={proyectos}
                usuarios={usuarios}
            />

            {/* Modal: Crear */}
            <Modal open={showCrear} onClose={() => setShowCrear(false)} title="Nueva Tarea">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
                <TareaForm
                    onSubmit={handleCrear}
                    onCancel={() => setShowCrear(false)}
                    proyectos={proyectos}
                    usuarios={usuarios}
                />
            </Modal>

            {/* Modal: Editar */}
            <Modal open={!!seleccionado} onClose={() => setSeleccionado(null)} title="Editar Tarea">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
                {seleccionado && (
                    <EditarTareaForm
                        tareas={seleccionado}
                        onSubmit={handleActualizar}
                        onCancel={() => setSeleccionado(null)}
                        proyectos={proyectos}
                        usuarios={usuarios}
                    />
                )}
            </Modal>
        </div>
    );
}