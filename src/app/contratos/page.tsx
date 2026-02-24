// src/app/contratos/page.tsx
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Plus, Search, CheckCircle, Clock, XCircle, Eye, Edit } from 'lucide-react'

const contratos = [
  { id: 'C-001', artista: 'María Reyes', cliente: 'Bodas del Norte SA', tipo: 'Mariachi', fechaEvento: '2026-02-28', monto: '$12,000', estado: 'activo', ubicacion: 'Monterrey' },
  { id: 'C-002', artista: 'DJ Pulso', cliente: 'Club Nocturno Éclat', tipo: 'DJ', fechaEvento: '2026-03-05', monto: '$8,500', estado: 'pendiente', ubicacion: 'Guadalajara' },
  { id: 'C-003', artista: 'Trío Elegance', cliente: 'Hotel Marqués', tipo: 'Trío', fechaEvento: '2026-03-10', monto: '$6,000', estado: 'activo', ubicacion: 'CDMX' },
  { id: 'C-004', artista: 'Stand-up Rojas', cliente: 'Corporativo ALFA', tipo: 'Comedia', fechaEvento: '2026-02-20', monto: '$15,000', estado: 'completado', ubicacion: 'CDMX' },
  { id: 'C-005', artista: 'Ballet Folclórico', cliente: 'Feria Municipal', tipo: 'Danza', fechaEvento: '2026-03-15', monto: '$22,000', estado: 'cancelado', ubicacion: 'Oaxaca' },
]

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  activo: { label: 'Activo', className: 'bg-[#ecfdf5] text-[#059669]', icon: CheckCircle },
  pendiente: { label: 'Pendiente', className: 'bg-[#fffbeb] text-[#d97706]', icon: Clock },
  completado: { label: 'Completado', className: 'bg-[#eef2ff] text-[#4f46e5]', icon: CheckCircle },
  cancelado: { label: 'Cancelado', className: 'bg-[#fef2f2] text-[#dc2626]', icon: XCircle },
}

const estadosFiltro = ['Todos', 'activo', 'pendiente', 'completado', 'cancelado']

export default function ContratosPage() {
  const [search, setSearch] = useState('')
  const [estadoActivo, setEstadoActivo] = useState('Todos')

  const filtered = contratos.filter((c) => {
    const matchSearch = c.artista.toLowerCase().includes(search.toLowerCase()) ||
                        c.cliente.toLowerCase().includes(search.toLowerCase()) ||
                        c.id.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estadoActivo === 'Todos' || c.estado === estadoActivo
    return matchSearch && matchEstado
  })

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Contratos" subtitle="Administra todos los contratos de la plataforma" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen de estados */}
        <div className="flex gap-3 flex-wrap">
          {estadosFiltro.slice(1).map((est) => {
            const count = contratos.filter((c) => c.estado === est).length
            const cfg = statusConfig[est]
            return (
              <div key={est} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.className}`}>
                <cfg.icon size={12} />
                {cfg.label}: {count}
              </div>
            )
          })}
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2">
            {estadosFiltro.map((est) => (
              <button
                key={est}
                onClick={() => setEstadoActivo(est)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border border-[#e5e7eb] bg-white cursor-pointer transition-all capitalize ${
                  estadoActivo === est ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'hover:bg-gray-50'
                }`}
              >
                {est === 'Todos' ? 'Todos' : statusConfig[est].label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar contrato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none w-[220px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-lg border-none cursor-pointer hover:bg-[#5b21b6] transition-colors">
              <Plus size={16} />
              Nuevo contrato
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[#f3f4f6] text-sm text-[#6b7280]">
            {filtered.length} contratos encontrados
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">ID</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Artista</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Cliente</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Tipo</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Fecha evento</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Monto</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Estado</th>
                  <th className="bg-[#f9fafb] px-6 py-3 text-left text-xs uppercase text-[#6b7280] tracking-[0.05em]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const status = statusConfig[c.estado]
                  return (
                    <tr key={c.id}>
                      <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{c.id}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{c.artista}</td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">{c.cliente}</td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">{c.tipo}</td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">{c.fechaEvento}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{c.monto}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                          <status.icon size={12} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-md border-none bg-transparent text-[#9ca3af] cursor-pointer transition-all hover:bg-[#f3f4f6] hover:text-[#7c3aed]">
                            <Eye size={15} />
                          </button>
                          <button className="p-1.5 rounded-md border-none bg-transparent text-[#9ca3af] cursor-pointer transition-all hover:bg-[#f3f4f6] hover:text-[#7c3aed]">
                            <Edit size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}