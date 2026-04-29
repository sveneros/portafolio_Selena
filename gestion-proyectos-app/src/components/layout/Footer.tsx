// src/components/layout/Footer.tsx
export default function Footer() {  
    return (
        <footer className="bg-slate-900 text-slate-400 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <p>© {new Date().getFullYear()}<span className="text-blue-400 font-semibold"> TaskFlow</span> – Plataforma de Gestión de Proyectos</p>
                <p>Node.js • Express • Prisma • PostgreSQL • React • TypeScript</p>
            </div>
        </footer>
    );
}