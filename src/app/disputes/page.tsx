'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Search, Eye, Check, X, Scale, 
  ShieldAlert, Clock, MapPin 
} from 'lucide-react'

// --- 1. INTERFACES PARA TYPESCRIPT ---
interface Disputa {
  id: string
  tipo: 'contrato' | 'pago' | 'calificacion' | 'contenido'
  titulo: string
  descripcion: string
  solicitante: { id: string; nombre: string; tipo: string }
  denunciado: { id: string; nombre: string; tipo: string }
  estado: 'pendiente' | 'en_revision' | 'resuelta' | 'rechazada'
  prioridad: 'baja' | 'media' | 'alta' | 'critica'
  fechaCreacion: string
}

// --- 2. DATOS DE EJEMPLO ---
const disputasData: Disputa[] = [
  { id: 'DSP-001', tipo: 'contrato', titulo: 'Incumplimiento de contrato - Festival Mariachi', descripcion: 'El cliente afirma que el artista no se presentó.', solicitante: { id: 'CLI-001', nombre: 'Corporativo Eventos', tipo: 'cliente' }, denunciado: { id: 'ART-001', nombre: 'María Reyes', tipo: 'artista' }, estado: 'en_revision', prioridad: 'alta', fechaCreacion: '2026-02-20' },
  { id: 'DSP-002', tipo: 'pago', titulo: 'Pago no recibido - Evento Corp', descripcion: 'El artista reclama el pago restante del 70%.', solicitante: { id: 'ART-002', nombre: 'DJ Pulso', tipo: 'artista' }, denunciado: { id: 'CLI-002', nombre: 'Innovatech', tipo: 'cliente' }, estado: 'pendiente', prioridad: 'media', fechaCreacion: '2026-02-21' },
  { id: 'DSP-004', tipo: 'contenido', titulo: 'Contenido inapropiado - Perfil', descripcion: 'Reporte de información falsa en galería.', solicitante: { id: 'USR-001', nombre: 'Usuario Verificado', tipo: 'cliente' }, denunciado: { id: 'ART-004', nombre: 'Stand-up Rojas', tipo: 'artista' }, estado: 'pendiente', prioridad: 'critica', fechaCreacion: '2026-02-22' }
]

const categoriasFiltro = ['Todos', 'contrato', 'pago', 'calificacion', 'contenido']

const statusConfig: Record<string, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-[#fffbeb] text-[#d97706]' },
  en_revision: { label: 'En Revisión', className: 'bg-[#eff6ff] text-[#2563eb]' },
  resuelta: { label: 'Resuelta', className: 'bg-[#ecfdf5] text-[#059669]' },
  rechazada: { label: 'Rechazada', className: 'bg-[#fef2f2] text-[#dc2626]' },
}

export default function DisputasPage() {
  const [search, setSearch] = useState('')
  const [catActiva, setCatActiva] = useState('Todos')
  const [showModal, setShowModal] = useState(false)
  const [selectedDisputa, setSelectedDisputa] = useState<Disputa | null>(null)

  const filtered = disputasData.filter((d: Disputa) => {
    const matchSearch = d.titulo.toLowerCase().includes(search.toLowerCase()) || 
                       d.id.toLowerCase().includes(search.toLowerCase())
    const matchCat = catActiva === 'Todos' || d.tipo === catActiva
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Centro de Resolución" subtitle="Gestión de conflictos y disputas legales" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen rápido (Estilo igual a Empresas) */}
        <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Total Disputas</span>
                <span className="text-lg font-bold text-[#1e1b4b]">{disputasData.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Prioridad Crítica</span>
                <span className="text-lg font-bold text-red-600 flex items-center gap-1">
                    <ShieldAlert size={16} /> {disputasData.filter((d: Disputa) => d.prioridad === 'critica').length}
                </span>
            </div>
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categoriasFiltro.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border border-[#e5e7eb] bg-white cursor-pointer transition-all capitalize ${
                  catActiva === cat ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'hover:bg-gray-50 text-[#6b7280]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar disputa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none w-[240px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-[#e5e7eb] text-[#6b7280] text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Exportar Reporte
            </button>
          </div>
        </div>

        {/* Tabla Estilo Empresas */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[#f3f4f6] text-sm text-[#6b7280] flex justify-between items-center">
            <span>{filtered.length} disputas registradas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Disputa</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Partes</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((d: Disputa) => (
                  <tr key={d.id} className="hover:bg-[#f8f6ff] transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{d.id}</td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors">{d.titulo}</span>
                            <span className="text-[10px] font-bold text-[#7c3aed] uppercase">{d.tipo}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col text-[11px]">
                            <span className="text-[#6b7280]">De: <b className="text-[#1e1b4b]">{d.solicitante.nombre}</b></span>
                            <span className="text-[#ef4444]">Vs: <b className="text-[#1e1b4b]">{d.denunciado.nombre}</b></span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            d.prioridad === 'critica' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-600'
                        }`}>
                            {d.prioridad}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[d.estado].className}`}>
                        {statusConfig[d.estado].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => { setSelectedDisputa(d); setShowModal(true); }}
                          className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#7c3aed] hover:shadow-sm transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#059669] hover:shadow-sm transition-all">
                          <Check size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      {showModal && selectedDisputa && (
        <div className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl overflow-hidden border border-[#7c3aed1a]">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                   <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-50 text-red-600 border border-red-100">
                    {selectedDisputa.prioridad}
                   </span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusConfig[selectedDisputa.estado].className}`}>
                    {selectedDisputa.estado}
                   </span>
                </div>
                <button onClick={() => setShowModal(false)} className="text-[#9ca3af] hover:text-[#111827]"><X size={20} /></button>
              </div>

              <h3 className="text-xl font-black text-[#1e1b4b] leading-tight mb-2">{selectedDisputa.titulo}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{selectedDisputa.descripcion}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-[#9ca3af] uppercase mb-1">Solicitante</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{selectedDisputa.solicitante.nombre}</p>
                  <p className="text-[11px] text-[#7c3aed] font-medium uppercase">{selectedDisputa.solicitante.tipo}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-[#9ca3af] uppercase mb-1">Denunciado</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{selectedDisputa.denunciado.nombre}</p>
                  <p className="text-[11px] text-[#ef4444] font-medium uppercase">{selectedDisputa.denunciado.tipo}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button className="flex-1 py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#5b21b6] transition-all flex items-center justify-center gap-2">
                  <Scale size={16} /> Dictaminar Fallo
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white border border-[#e5e7eb] text-[#6b7280] font-bold rounded-xl hover:bg-gray-50 transition-all">
                  Cerrar Caso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}