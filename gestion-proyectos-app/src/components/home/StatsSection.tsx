// src/components/home/StatsSection.tsx (o src/home/StatsSection.tsx)

import { useUsuarios } from "../../hooks/useUsuarios";  // ✅ Ruta correcta
import { useProyectos } from "../../hooks/useProyectos"; // ✅ Ruta correcta
import { useTareas } from "../../hooks/useTareas";       // ✅ Ruta correcta
import { Users, FolderKanban, ClipboardList } from "lucide-react";

export default function StatsSection() {
    const { usuarios } = useUsuarios();
    const { proyectos } = useProyectos();
    const { tareas } = useTareas();

    const stats = [
        {
            title: "Usuarios",
            value: usuarios.length,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Proyectos",
            value: proyectos.length,
            icon: FolderKanban,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "Tareas",
            value: tareas.length,
            icon: ClipboardList,
            color: "text-green-600",
            bgColor: "bg-green-50"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.title}
                                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all"
                            >
                                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    <Icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <div className="text-4xl font-bold text-slate-800 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 font-medium">
                                    {stat.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}