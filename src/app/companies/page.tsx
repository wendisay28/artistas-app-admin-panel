'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link' 
import { 
  Building, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  X, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Clock,
  MoreVertical
} from 'lucide-react'

// --- INTERFACES ---
interface Empresa {
  id: string
  nombre: string
  rfc: string
  email: string
  telefono: string
  direccion: string
  estado: 'pendiente' | 'verificado' | 'suspendido'
  fechaRegistro: string
  usuario: string
  contraseña: string
}

const empresasData: Empresa[] = [
  {
    id: '1',
    nombre: 'Galería Arte Moderno',
    rfc: 'GAM200101ABC',
    email: 'contacto@galeriamoderno.com',
    telefono: '+52 55 1234 5678',
    direccion: 'Ciudad de México, CDMX',
    estado: 'verificado',
    fechaRegistro: '2024-01-15',
    usuario: 'galeriamoderno',
    contraseña: 'Arte2024!'
  },
  // ... más datos
]

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasData)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const togglePassword = (id: string) => setShowPassword(prev => ({ ...prev, [id]: !prev[id] }))

  const copyCredentials = (empresa: Empresa) => {
    navigator.clipboard.writeText(`Usuario: ${empresa.usuario}\nPass: ${empresa.contraseña}`)
    setCopiedId(empresa.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#fafaff]">
      <Header 
        title="Directorio de Empresas" 
        subtitle="Administración de socios comerciales y control de accesos" 
      />

      <main className="p-8 max-w-7xl mx-auto space-y-6">
        {/* BARRA DE BÚSQUEDA Y ACCIÓN */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, RFC o correo..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link 
            href="/companies/create"
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus size={20} strokeWidth={3} /> REGISTRAR EMPRESA
          </Link>
        </div>

        {/* TABLA DE EMPRESAS */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Identidad</th>
                  <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Estado</th>
                  <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Acceso Seguro</th>
                  <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {empresas.map((empresa) => (
                  <tr key={empresa.id} className="group hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-sm">
                          <Building size={24} />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base">{empresa.nombre}</p>
                          <p className="text-xs font-bold text-slate-400 tracking-tight">{empresa.rfc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <StatusBadge estado={empresa.estado} />
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-3 bg-white border border-slate-100 p-2 rounded-xl">
                        <p className="text-xs font-mono font-bold text-slate-700">{empresa.usuario}</p>
                        <button onClick={() => togglePassword(empresa.id)} className="text-indigo-400">
                          {showPassword[empresa.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => copyCredentials(empresa)} className="p-3 bg-slate-50 rounded-xl">
                        {copiedId === empresa.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

    </div>
  )
}

function StatusBadge({ estado }: { estado: Empresa['estado'] }) {
  const configs = {
    verificado: { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: ShieldCheck, label: 'Verificado' },
    pendiente: { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock, label: 'Pendiente' },
    suspendido: { color: 'bg-slate-100 text-slate-500 border-slate-200', icon: ShieldAlert, label: 'Suspendido' },
  }
  const config = configs[estado]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-black text-[10px] uppercase tracking-wider ${config.color}`}>
      <Icon size={14} strokeWidth={2.5} /> {config.label}
    </span>
  )
}