'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Search, UserCheck, UserX, Shield, Edit, Trash2, 
  Mail, Calendar, Briefcase, Filter, MoreHorizontal 
} from 'lucide-react'

// --- DATOS SIMULADOS ---
const usuariosInitial = [
  { id: 1, nombre: 'Carlos Mendoza', email: 'carlos@gmail.com', rol: 'cliente', contratos: 5, registro: '2025-11-12', estado: 'activo', iniciales: 'CM' },
  { id: 2, nombre: 'Sofía Ramírez', email: 'sofia.r@hotmail.com', rol: 'cliente', contratos: 2, registro: '2025-12-01', estado: 'activo', iniciales: 'SR' },
  { id: 3, nombre: 'Lic. Torres Admin', email: 'torres@artistasapp.mx', rol: 'admin', contratos: 0, registro: '2025-10-01', estado: 'activo', iniciales: 'TA' },
  { id: 4, nombre: 'Bodas del Norte SA', email: 'contacto@bodasdelnorte.com', rol: 'empresa', contratos: 8, registro: '2025-09-15', estado: 'activo', iniciales: 'BN' },
  { id: 5, nombre: 'Pedro Loza', email: 'pedro_loza@outlook.com', rol: 'cliente', contratos: 1, registro: '2026-01-08', estado: 'inactivo', iniciales: 'PL' },
  { id: 6, nombre: 'Club Nocturno Éclat', email: 'eventos@eclat.mx', rol: 'empresa', contratos: 12, registro: '2025-08-20', estado: 'activo', iniciales: 'CE' },
  { id: 7, nombre: 'Ana Gutiérrez', email: 'ana.g@gmail.com', rol: 'cliente', contratos: 3, registro: '2026-01-22', estado: 'activo', iniciales: 'AG' },
  { id: 8, nombre: 'Hotel Marqués', email: 'eventos@hotelmarques.com.mx', rol: 'empresa', contratos: 6, registro: '2025-10-10', estado: 'activo', iniciales: 'HM' },
]

const rolConfig: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  cliente: { label: 'Cliente', bg: 'bg-cyan-50', text: 'text-cyan-700', icon: UserCheck },
  admin: { label: 'Admin', bg: 'bg-purple-50', text: 'text-purple-700', icon: Shield },
  empresa: { label: 'Empresa', bg: 'bg-indigo-50', text: 'text-indigo-700', icon: Briefcase },
}

const roles = ['Todos', 'cliente', 'empresa', 'admin']

export default function UsuariosPage() {
  const [search, setSearch] = useState('')
  const [rolActivo, setRolActivo] = useState('Todos')
  const [usuarios, setUsuarios] = useState(usuariosInitial)

  const filtered = usuarios.filter((u) => {
    const matchSearch = u.nombre.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRol = rolActivo === 'Todos' || u.rol === rolActivo
    return matchSearch && matchRol
  })

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-12">
      <Header title="Usuarios" subtitle="Control de accesos y perfiles de la plataforma" />

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Resumen de Cuentas */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.slice(1).map((rol) => {
            const count = usuarios.filter((u) => u.rol === rol).length
            const cfg = rolConfig[rol]
            return (
              <div key={rol} className="bg-white p-6 rounded-[24px] border border-slate-200/60 shadow-sm flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${cfg.bg} ${cfg.text}`}>
                  <cfg.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800">{count}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{cfg.label}s Registrados</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Toolbar de Acción */}
        <div className="bg-white p-4 rounded-[24px] border border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {roles.map((rol) => (
              <button
                key={rol}
                onClick={() => setRolActivo(rol)}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  rolActivo === rol ? 'bg-white text-[#7c3aed] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {rol === 'Todos' ? 'Todos' : rolConfig[rol].label + 's'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#7c3aed] transition-all text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de Usuarios */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
            <UserX size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No hay coincidencias</h3>
            <p className="text-slate-500 text-sm">Prueba ajustando los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((u) => {
              const cfg = rolConfig[u.rol]
              return (
                <div key={u.id} className="bg-white rounded-[28px] border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-100">
                        {u.iniciales}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 ${
                        u.estado === 'activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${u.estado === 'activo' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {u.estado}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 line-clamp-1">{u.nombre}</h4>
                    <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                      <Mail size={12} />
                      <p className="text-[11px] font-medium truncate">{u.email}</p>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="px-6 py-4 bg-slate-50/50 flex justify-between items-center border-y border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Contratos</p>
                      <p className="font-black text-slate-700">{u.contratos}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Desde</p>
                      <p className="font-bold text-slate-700 text-xs">{u.registro}</p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 flex items-center justify-between">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 ${cfg.bg} ${cfg.text}`}>
                      <cfg.icon size={12} />
                      {cfg.label}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-2 text-slate-400 hover:text-[#7c3aed] hover:bg-indigo-50 rounded-lg transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}