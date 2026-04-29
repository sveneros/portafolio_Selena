
import { Link } from "react-router-dom";
import { Users, FolderKanban, ClipboardList, ArrowRight } from "lucide-react";

const modules = [
    {
        title: "Usuarios",
        description: "Gestiona los miembros de tu equipo, asigna roles y permisos.",
        icon: Users,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        link: "/usuarios",
        stats: "Equipo colaborativo"
    },
    {
        title: "Proyectos",
        description: "Crea y organiza proyectos, asigna responsables y establece plazos.",
        icon: FolderKanban,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
        link: "/proyectos",
        stats: "Gestión completa"
    },
    {
        title: "Tareas",
        description: "Administra tareas diarias, prioridades y seguimiento de progreso.",
        icon: ClipboardList,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        link: "/tareas",
        stats: "Pendientes"
    }
];

export default function QuickAccess() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        Acceso Rápido
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Navega rápidamente a las secciones principales de la plataforma
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {modules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Link
                                key={module.title}
                                to={module.link}
                                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 ${module.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-7 h-7 ${module.textColor}`} />
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {module.title}
                                </h3>
                                
                                <p className="text-slate-500 text-sm mb-4">
                                    {module.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-medium ${module.textColor} ${module.bgColor} px-2 py-1 rounded-full`}>
                                        {module.stats}
                                    </span>
                                    <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}