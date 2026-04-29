
import { useForm } from "react-hook-form";
import type { Usuario } from "../../interfaces/Usuarios";
import Button from "../ui/Button";

interface Props {
  usuario: Usuario;
  onSubmit: (data: { password: string }) => Promise<void>;
  onCancel: () => void;
}

export default function CambiarPasswordForm({ usuario, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<{ password: string }>({
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  const validarPassword = (value: string) => {
    if (!value) return "La contraseña es obligatoria";
    
    const numeros = (value.match(/\d/g) || []).length;
    if (numeros < 3) return "Debe contener al menos 3 números";
    if (!/[A-Z]/.test(value)) return "Debe contener al menos una mayúscula";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Debe contener al menos un signo";
    if (value.length < 8) return "Mínimo 8 caracteres";
    
    return true;
  };

  const campo = "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Usuario:</strong> {usuario.nombre} ({usuario.email})
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nueva Contraseña *
        </label>
        <input
          {...register("password", {
            required: "La contraseña es obligatoria",
            validate: validarPassword,
          })}
          type="password"
          className={`${campo} ${errors.password ? error : normal}`}
          placeholder="••••••••"
        />
        
        {passwordValue.length > 0 && (
          <div className="mt-2 bg-slate-50 p-2 rounded-md border border-slate-200">
            <p className="text-xs font-medium text-slate-600 mb-1">Requisitos:</p>
            <ul className="text-xs space-y-0.5">
              <li className={passwordValue.length >= 8 ? "text-green-600" : "text-red-500"}>
                {passwordValue.length >= 8 ? "✓" : "✗"} Mínimo 8 caracteres
              </li>
              <li className={(passwordValue.match(/\d/g) || []).length >= 3 ? "text-green-600" : "text-red-500"}>
                {(passwordValue.match(/\d/g) || []).length >= 3 ? "✓" : "✗"} Al menos 3 números
              </li>
              <li className={/[A-Z]/.test(passwordValue) ? "text-green-600" : "text-red-500"}>
                {/[A-Z]/.test(passwordValue) ? "✓" : "✗"} Al menos una mayúscula
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? "text-green-600" : "text-red-500"}>
                {/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? "✓" : "✗"} Al menos un signo
              </li>
            </ul>
          </div>
        )}
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}