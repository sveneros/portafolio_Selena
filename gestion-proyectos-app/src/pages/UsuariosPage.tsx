import type {  ActualizarUsuarioDTO, ActualizarUsuarioPasswordDTO, CrearUsuarioDTO, Usuario } from "../interfaces/Usuarios";
import { useState } from "react";
import { usuarioService } from "../services/usuarioService";
import UsuarioForm from "../components/forms/UsuarioForm";
import EditarUsuarioForm from "../components/forms/EditarUsuarioForm";
import CambiarPasswordForm from "../components/forms/PasswordForm";


import Modal from "../components/ui/Modal";
import UsuariosTable from "../components/tables/UsuariosTable";
import Button from "../components/ui/Button";
import { useUsuarios } from "../hooks/useUsuarios";

export default function UsuariosPage() {
    const { usuarios, loading, error, crear, actualizar, eliminar} = useUsuarios();
    const [seleccionado, setSeleccionado] = useState<Usuario | null>(null);
    const [showCrear, setShowCrear] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
const [cambiandoPassword, setCambiandoPassword] = useState<Usuario | null>(null);
  

    const handleCrear = async (data: CrearUsuarioDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowCrear(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleActualizar = async (data: ActualizarUsuarioDTO) => {
        if (!seleccionado) return;
        try {
            setFormError(null);
            await actualizar(seleccionado.id, data);
            setSeleccionado(null);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleCambiarPassword = async (data: ActualizarUsuarioPasswordDTO) => {
    if (!cambiandoPassword) return;
    try {
        setFormError(null);
        
        await actualizar(cambiandoPassword.id, data as any);
        setCambiandoPassword(null);
        alert("✓ Contraseña actualizada correctamente");
    } catch (err: any) {
        setFormError(err.message);
    }
};

    const handleEliminar = async (id: number) => {
    if (confirm('¿Confirmas eliminar usuario?')) {
        try {
            await eliminar(id);
        } catch (err: any) {
            alert(err.message);
        }
    }
}
        

   return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Usuarios</h1>
                <p className="text-slate-500 text-sm mt-1">{usuarios.length} usuario(s) registrado(s)</p>
            </div>
            <Button onClick={() => setShowCrear(true)}>Nuevo Usuario</Button>
        </div>

        {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
                {error}
            </div>
        )}

        <UsuariosTable
            usuarios={usuarios}
            loading={loading}
            onEditar={(u) => {
                setFormError(null);
                setSeleccionado(u);
            }}
            onEliminar={handleEliminar}
            onCambiarPassword={(u) => setCambiandoPassword(u)} 
            
        />

        {/* Modal: Crear */}
        <Modal open={showCrear} onClose={() => setShowCrear(false)} title="Crear Usuario">
            {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
            {<UsuarioForm onSubmit={handleCrear} onCancel={() => setShowCrear(false)} />}
        </Modal>

        {/* Modal: Editar */}
        <Modal open={!!seleccionado} onClose={() => setSeleccionado(null)} title="Editar Usuario">
            {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
            {seleccionado && (
                 <EditarUsuarioForm
                     usuario={seleccionado}
                     onSubmit={handleActualizar}
                     onCancel={() => setSeleccionado(null)}
                 />
            )}
        </Modal>
        <Modal open={!!cambiandoPassword} onClose={() => setCambiandoPassword(null)} title="Cambiar Contraseña">
    {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
    {cambiandoPassword && (
        <CambiarPasswordForm
            usuario={cambiandoPassword}
            onSubmit={handleCambiarPassword}
            onCancel={() => setCambiandoPassword(null)}
        />
    )}
</Modal>
    </div>
);
}