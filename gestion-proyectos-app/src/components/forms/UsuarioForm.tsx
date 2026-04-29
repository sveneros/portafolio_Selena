import { useForm } from "react-hook-form";
import type { CrearUsuarioDTO } from "../../interfaces/Usuarios";
import Button from "../ui/Button";

interface Props {
  onSubmit: (data: CrearUsuarioDTO) => Promise<void>;
  onCancel: () => void;
}

export default function UsuarioForm({ onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, 
    watch,
  } = useForm<CrearUsuarioDTO>({
    mode: "onChange", 
  });

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  const nombreValue = watch("nombre", "");
  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const validarNombre = (value: string) => {
    if (!value) return "El nombre es obligatorio";
    if (value.length < 3) return "El nombre debe tener al menos 3 caracteres";
    if (value.length > 50) return "El nombre no puede tener más de 50 caracteres";
    return true;
  };

  const validarEmail = (value: string) => {
    if (!value) return "El email es obligatorio";
    if (!value.includes("@")) return "El email debe contener un @";
    const [localPart, domain] = value.split("@");
    if (!localPart || !domain) return "Formato de email inválido";
    if (!domain.includes(".")) return "El email debe contener un punto después del @";
    if (localPart.length < 1) return "El email debe tener un nombre de usuario";
    return true;
  };

  const validarPassword = (value: string) => {
    if (!value) return "La contraseña es obligatoria";
    
    const numeros = (value.match(/\d/g) || []).length;
    if (numeros < 3) return "Debe contener al menos 3 números";
    
    if (!/[A-Z]/.test(value)) return "Debe contener al menos una mayúscula";
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Debe contener al menos un signo (!@#$%^&* etc.)";
    
    if (value.length < 8) return "Mínimo 8 caracteres";
    
    return true;
  };

  
  const esFormularioValido = () => {
    const nombreValido = nombreValue.length >= 3 && nombreValue.length <= 50;
    const emailValido = emailValue.includes("@") && emailValue.split("@")[1]?.includes(".");
    const numeros = (passwordValue.match(/\d/g) || []).length;
    const passwordValido = 
      passwordValue.length >= 8 &&
      numeros >= 3 &&
      /[A-Z]/.test(passwordValue) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
    
    return nombreValido && emailValido && passwordValido;
  };

  const botonHabilitado = esFormularioValido() && !isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/*  Nombre */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nombre *
        </label>
        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
            validate: validarNombre,
          })}
          className={`${campo} ${errors.nombre ? error : normal}`}
          placeholder="Juan Pérez"
        />
        {errors.nombre && (nombreValue.length < 3 || !nombreValue) && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
        {nombreValue.length > 0 && nombreValue.length < 3 && !errors.nombre && (
          <p className="text-amber-500 text-xs mt-1">
            ⚠️ El nombre debe tener al menos 3 caracteres (actual: {nombreValue.length})
          </p>
        )}
        {nombreValue.length >= 3 && (
          <p className="text-green-500 text-xs mt-1">✓ Nombre válido</p>
        )}
      </div>

      {/*  Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email *
        </label>
        <input
          {...register("email", {
            required: "El email es obligatorio",
            validate: validarEmail,
          })}
          type="email"
          className={`${campo} ${errors.email ? error : normal}`}
          placeholder="juan@email.com"
        />
        {errors.email && (!emailValue.includes("@") || !emailValue) && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
        {emailValue.length > 0 && !emailValue.includes("@") && !errors.email && (
          <p className="text-amber-500 text-xs mt-1">
            ⚠️ El email debe contener un @ (ejemplo: usuario@dominio.com)
          </p>
        )}
        {emailValue.includes("@") && !emailValue.split("@")[1]?.includes(".") && emailValue.length > 0 && !errors.email && (
          <p className="text-amber-500 text-xs mt-1">
            ⚠️ El email debe tener un punto después del @ (ejemplo: usuario@dominio.com)
          </p>
        )}
        {emailValue.includes("@") && emailValue.split("@")[1]?.includes(".") && emailValue.length > 0 && (
          <p className="text-green-500 text-xs mt-1">✓ Email válido</p>
        )}
      </div>

      {/*  Contraseña */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Contraseña *
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
        
        {/* Requisitos contraseña */}
        <div className="mt-2 space-y-1">
          {passwordValue.length > 0 && (
            <div className="bg-slate-50 p-2 rounded-md border border-slate-200">
              <p className="text-xs font-medium text-slate-600 mb-1">Requisitos de contraseña:</p>
              <ul className="text-xs space-y-0.5">
                <li className={passwordValue.length >= 8 ? "text-green-600" : "text-red-500"}>
                  {passwordValue.length >= 8 ? "✓" : "✗"} Mínimo 8 caracteres
                </li>
                <li className={(passwordValue.match(/\d/g) || []).length >= 3 ? "text-green-600" : "text-red-500"}>
                  {(passwordValue.match(/\d/g) || []).length >= 3 ? "✓" : "✗"} Al menos 3 números (actual: {(passwordValue.match(/\d/g) || []).length})
                </li>
                <li className={/[A-Z]/.test(passwordValue) ? "text-green-600" : "text-red-500"}>
                  {/[A-Z]/.test(passwordValue) ? "✓" : "✗"} Al menos una mayúscula
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? "text-green-600" : "text-red-500"}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? "✓" : "✗"} Al menos un signo (!@#$%^&* etc.)
                </li>
              </ul>
            </div>
          )}
          
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
          
          {passwordValue.length >= 8 && 
           (passwordValue.match(/\d/g) || []).length >= 3 && 
           /[A-Z]/.test(passwordValue) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) && (
            <p className="text-green-500 text-xs mt-1">✓ Contraseña segura</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button 
          type="submit" 
          disabled={!botonHabilitado}
          className={!botonHabilitado ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isSubmitting ? "Guardando..." : "Crear Usuario"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
      
      {!botonHabilitado && (
        <p className="text-xs text-amber-600 text-center">
          ⚠️ Completa todos los requisitos para habilitar el botón de envío
        </p>
      )}
    </form>
  );
}