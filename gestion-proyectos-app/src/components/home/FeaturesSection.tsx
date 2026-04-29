
import { 
    LayoutDashboard, 
    Shield, 
    Zap, 
    Cloud, 
    Smartphone, 
    Users, 
    CheckCircle,
    TrendingUp,
    Clock
} from "lucide-react";

const features = [
    {
        title: "Dashboard Inteligente",
        description: "Visualiza el progreso de tus proyectos y tareas en un solo lugar.",
        icon: LayoutDashboard,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        title: "Seguridad Garantizada",
        description: "Tus datos están protegidos con encriptación y respaldos automáticos.",
        icon: Shield,
        color: "text-red-600",
        bgColor: "bg-red-50"
    },
    {
        title: "Rápido y Eficiente",
        description: "Interfaz optimizada para máxima productividad sin distracciones.",
        icon: Zap,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
    },
    {
        title: "Sincronización Cloud",
        description: "Accede a tu información desde cualquier dispositivo, en cualquier lugar.",
        icon: Cloud,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50"
    },
    {
        title: "Responsive Design",
        description: "Diseño adaptado a todos los dispositivos: desktop, tablet y móvil.",
        icon: Smartphone,
        color: "text-green-600",
        bgColor: "bg-green-50"
    },
    {
        title: "Colaboración en Equipo",
        description: "Trabaja junto a tu equipo, asigna tareas y comparte progreso.",
        icon: Users,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
    }
];

const benefits = [
    { text: "Aumenta tu productividad", icon: TrendingUp },
    { text: "Reduce el estrés", icon: CheckCircle },
    { text: "Ahorra tiempo", icon: Clock },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        Características Principales
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Todo lo que necesitas para gestionar tus proyectos de manera profesional
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
                            >
                                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                                    <Icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Beneficios adicionales */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-2">
                            ¿Por qué elegir TaskFlow?
                        </h3>
                        <p className="text-blue-100">
                            Beneficios que te ayudarán a mejorar tu gestión diaria
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={benefit.text} className="flex items-center gap-2">
                                    <Icon size={20} className="text-green-300" />
                                    <span className="font-medium">{benefit.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}