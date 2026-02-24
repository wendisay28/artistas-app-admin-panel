'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Search, 
  UserCheck, 
  Shield, 
  Briefcase, 
  Edit, 
  Trash2, 
  Mail, 
  Plus, 
  MoreVertical,
  UserPlus
} from 'lucide-react'

// --- DATOS SIMULADOS ---
const usuariosInitial = [
  { id: 'USR-001', nombre: 'Carlos Mendoza', email: 'carlos@gmail.com', rol: 'cliente', contratos: 5, registro: '2025-11-12', estado: 'activo', iniciales: 'CM' },
  { id: 'USR-002', nombre: 'Sofía Ramírez', email: 'sofia.r@hotmail.com', rol: 'cliente', contratos: 2, registro: '2025-12-01', estado: 'activo', iniciales: 'SR' },
  { id: 'USR-003', nombre: 'Lic. Torres Admin', email: 'torres@artistasapp.mx', rol: 'admin', contratos: 0, registro: '2025-10-01', estado: 'activo', iniciales: 'TA' },
  { id: 'USR-004', nombre: 'Bodas del Norte SA', email: 'contacto@bodasdelnorte.com', rol: 'empresa', contratos: 8, registro: '2025-09-15', estado: 'activo', iniciales: 'BN' },
  { id: 'USR-005', nombre: 'Pedro Loza', email: 'pedro_loza@outlook.com', rol: 'cliente', contratos: 1, registro: '2026-01-08', estado: 'inactivo', iniciales: 'PL' },
  { id: 'USR-006', nombre: 'Club Nocturno Éclat', email: 'eventos@eclat.mx', rol: 'empresa', contratos: 12, registro: '2025-08-20', estado: 'activo', iniciales: 'CE' },
]

const rolConfig: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  cliente: { label: 'Cliente', bg: 'bg-cyan-50', text: 'text-cyan-600', icon: UserCheck },
  admin: { label: 'Admin', bg: 'bg-purple-50', text: 'text-purple-600', icon: Shield },
  empresa: { label: 'Empresa', bg: 'bg-indigo-50', text: 'text-indigo-600', icon: Briefcase },
}

const rolesFiltro = ['Todos', 'cliente', 'empresa', 'admin']

export default function UsuariosPage() {
  const [search, setSearch] = useState('')
  const [rolActivo, setRolActivo] = useState('Todos')

  const filtered = usuariosInitial.filter((u) => {
    const matchSearch = u.nombre.toLowerCase().includes(search.toLowerCase()) || 
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchRol = rolActivo === 'Todos' || u.rol === rolActivo
    return matchSearch && matchRol
  })

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Usuarios" subtitle="Administra los perfiles y permisos de la plataforma" />

      <div className="px-6 py-8 flex flex-col gap-6">
        
        {/* Stats Rápidas Estilo BuscArt */}
        <div className="flex gap-4 flex-wrap">
          {rolesFiltro.slice(1).map((rol) => {
            const count = usuariosInitial.filter((u) => u.rol === rol).length
            const cfg = rolConfig[rol]
            return (
              <div key={rol} className="bg-white px-5 py-3 rounded-2xl border border-[#7c3aed1a] shadow-sm flex items-center gap-3">
                <div className={`p-2 rounded-lg ${cfg.bg} ${cfg.text}`}>
                  <cfg.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e1b4b] leading-none">{count}</p>
                  <p className="text-[10px] font-medium text-[#6b7280] uppercase mt-1">{cfg.label}s</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Toolbar de Filtros y Búsqueda */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2">
            {rolesFiltro.map((rol) => (
              <button
                key={rol}
                onClick={() => setRolActivo(rol)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                  rolActivo === rol 
                  ? 'bg-[#7c3aed] text-white border-[#7c3aed] shadow-sm' 
                  : 'bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#7c3aed]'
                }`}
              >
                {rol === 'Todos' ? 'Todos' : rolConfig[rol].label + 's'}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-xl outline-none w-[260px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-sm font-bold rounded-xl hover:bg-[#5b21b6] transition-all">
              <UserPlus size={16} />
              Invitar
            </button>
          </div>
        </div>

        {/* Tabla Estilo Lista */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Usuario</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Registro</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Contratos</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-right text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((u) => {
                  const cfg = rolConfig[u.rol]
                  return (
                    <tr key={u.id} className="hover:bg-[#f8f6ff] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-white text-xs font-bold">
                            {u.iniciales}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors">{u.nombre}</span>
                            <span className="text-[11px] text-[#9ca3af] flex items-center gap-1">
                              <Mail size={10} /> {u.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${cfg.bg} ${cfg.text}`}>
                          <cfg.icon size={12} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">{u.registro}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{u.contratos}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          u.estado === 'activo' ? 'bg-[#ecfdf5] text-[#059669]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${u.estado === 'activo' ? 'bg-[#059669]' : 'bg-gray-400'}`} />
                          {u.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="p-2 text-[#9ca3af] hover:text-[#7c3aed] hover:bg-white rounded-lg transition-all">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-[#9ca3af] hover:text-red-500 hover:bg-white rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-sm text-[#6b7280] font-medium">No se encontraron usuarios con esos criterios.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}