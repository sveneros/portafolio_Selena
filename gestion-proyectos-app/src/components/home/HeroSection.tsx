
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
           
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-sm font-medium">Gestión de Proyectos Profesional</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        Organiza tus <span className="text-blue-400">Proyectos</span>
                        <br />
                        y <span className="text-purple-400">Tareas</span> en un solo lugar
                    </h1>
                    
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        TaskFlow te ayuda a gestionar equipos, proyectos y tareas de manera eficiente.
                        Todo lo que necesitas para mantener tu productividad al máximo.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/proyectos"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                        >
                            Comenzar Ahora
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            to="/tareas"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all"
                        >
                            Ver Tareas
                        </Link>
                    </div>
                </div>

                {/* Stats simples */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-400">100%</div>
                        <div className="text-slate-400 text-sm">Organización</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-400">24/7</div>
                        <div className="text-slate-400 text-sm">Disponibilidad</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-400">Gratis</div>
                        <div className="text-slate-400 text-sm">Sin costo</div>
                    </div>
                </div>
            </div>
        </section>
    );
}