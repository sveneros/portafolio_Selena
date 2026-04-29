
import { useState, useEffect, useCallback } from 'react';
import { usuarioService } from '../services/usuarioService';
import type {Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO} from '../interfaces/Usuarios';


export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      const data = await usuarioService.getAll();
      setUsuarios(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (payload: CrearUsuarioDTO) => {
    const nuevo = await usuarioService.create(payload);
    setUsuarios((prev) => [...prev, nuevo]);
    return nuevo;
  }, []);

  const actualizar = useCallback(async (id: number, payload: ActualizarUsuarioDTO) => {
    const actualizado = await usuarioService.update(id, payload);
    setUsuarios((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
    return actualizado;
  }, []);

  const eliminar = useCallback(async (id: number) => {
    await usuarioService.remove(id);
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { usuarios, loading, error, cargar, crear, actualizar, eliminar };
};