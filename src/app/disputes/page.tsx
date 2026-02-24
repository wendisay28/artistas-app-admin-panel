'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  AlertTriangle, 
  Scale, 
  MessageSquare, 
  Clock, 
  Check, 
  X, 
  Search, 
  Calendar,
  User,
  FileText,
  Eye,
  Gavel,
  ShieldAlert
} from 'lucide-react'

// --- INTERFACES ---
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
  evidencias: string[]
  mensajes: { id: string; autor: string; mensaje: string; fecha: string }[]
  resolucion?: { decision: string; detalles: string; resueltoPor: string; fechaResolucion: string }
}

const disputasData: Disputa[] = [
  { id: 'DSP-001', tipo: 'contrato', titulo: 'Incumplimiento de contrato - Festival Mariachi', descripcion: 'El cliente afirma que el artista no se presentó.', solicitante: { id: 'CLI-001', nombre: 'Corporativo Eventos', tipo: 'cliente' }, denunciado: { id: 'ART-001', nombre: 'María Reyes', tipo: 'artista' }, estado: 'en_revision', prioridad: 'alta', fechaCreacion: '2026-02-20', evidencias: [], mensajes: [] },
  { id: 'DSP-002', tipo: 'pago', titulo: 'Pago no recibido - Evento Corp', descripcion: 'El artista reclama el pago restante del 70%.', solicitante: { id: 'ART-002', nombre: 'DJ Pulso', tipo: 'artista' }, denunciado: { id: 'CLI-002', nombre: 'Innovatech', tipo: 'cliente' }, estado: 'pendiente', prioridad: 'media', fechaCreacion: '2026-02-21', evidencias: [], mensajes: [] },
  { id: 'DSP-004', tipo: 'contenido', titulo: 'Contenido inapropiado - Perfil', descripcion: 'Reporte de información falsa en galería.', solicitante: { id: 'USR-001', nombre: 'Usuario Verificado', tipo: 'cliente' }, denunciado: { id: 'ART-004', nombre: 'Stand-up Rojas', tipo: 'artista' }, estado: 'pendiente', prioridad: 'critica', fechaCreacion: '2026-02-22', evidencias: [], mensajes: [] }
]

const prioridadStyles: Record<string, string> = {
  critica: 'bg-red-50 text-red-600 border-red-100',
  alta: 'bg-orange-50 text-orange-600 border-orange-100',
  media: 'bg-amber-50 text-amber-600 border-amber-100',
  baja: 'bg-slate-50 text-slate-600 border-slate-100',
}

const estadoStyles: Record<string, string> = {
  pendiente: 'bg-[#fffbeb] text-[#d97706]',
  en_revision: 'bg-[#eff6ff] text-[#2563eb]',
  resuelta: 'bg-[#ecfdf5] text-[#059669]',
  rechazada: 'bg-[#fef2f2] text-[#dc2626]',
}

export default function DisputasPage() {
  const [disputas, setDisputas] = useState<Disputa[]>(disputasData)
  const [search, setSearch] = useState('')
  const [selectedDisputa, setSelectedDisputa] = useState<Disputa | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filtered = disputas.filter(d => 
    d.titulo.toLowerCase().includes(search.toLowerCase()) || 
    d.solicitante.nombre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Centro de Resolución" subtitle="Gestión de conflictos y disputas legales" />

      <div className="px-6 py-8 flex flex-col gap-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatMiniCard title="Total Disputas" value={disputas.length} icon={<Gavel size={20}/>} color="text-[#7c3aed]" bgColor="bg-[#f0edff]" />
          <StatMiniCard title="Prioridad Crítica" value={disputas.filter(d => d.prioridad === 'critica').length} icon={<ShieldAlert size={20}/>} color="text-red-600" bgColor="bg-red-50" />
          <StatMiniCard title="En Revisión" value={disputas.filter(d => d.estado === 'en_revision').length} icon={<Eye size={20}/>} color="text-blue-600" bgColor="bg-blue-50" />
          <StatMiniCard title="Pendientes" value={disputas.filter(d => d.estado === 'pendiente').length} icon={<Clock size={20}/>} color="text-amber-600" bgColor="bg-amber-50" />
        </div>

        {/* Search & Filters */}
        <div className="flex justify-between items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por ID, solicitante o título..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-xl outline-none focus:border-[#7c3aed] transition-all bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold bg-white border border-[#e5e7eb] rounded-xl text-[#6b7280] hover:bg-gray-50 transition-all">Exportar Reporte</button>
          </div>
        </div>

        {/* Tabla Estilo Lista */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-4 text-xs font-bold text-[#6b7280] uppercase tracking-wider">Disputa</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6b7280] uppercase tracking-wider">Partes Involucradas</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6b7280] uppercase tracking-wider">Prioridad</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6b7280] uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6b7280] uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-[#f8f6ff]/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111827]">{d.titulo}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-[#7c3aed] bg-[#f0edff] px-1.5 py-0.5 rounded capitalize">{d.tipo}</span>
                          <span className="text-[10px] text-[#9ca3af] font-medium">{d.id} • {d.fechaCreacion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[11px] text-[#6b7280] font-bold uppercase tracking-tighter">De: {d.solicitante.nombre}</span>
                          <span className="text-[11px] text-[#ef4444] font-bold uppercase tracking-tighter">Vs: {d.denunciado.nombre}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase border ${prioridadStyles[d.prioridad]}`}>
                        {d.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${estadoStyles[d.estado]}`}>
                        {d.estado.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setSelectedDisputa(d); setShowModal(true); }}
                          className="p-2 text-[#9ca3af] hover:text-[#7c3aed] hover:bg-white rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-[#9ca3af] hover:text-[#059669] hover:bg-white rounded-lg transition-all">
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
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${prioridadStyles[selectedDisputa.prioridad]}`}>
                    {selectedDisputa.prioridad}
                   </span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${estadoStyles[selectedDisputa.estado]}`}>
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
                <button className="flex-1 py-3 bg-white border border-[#e5e7eb] text-[#6b7280] font-bold rounded-xl hover:bg-gray-50 transition-all">
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

function StatMiniCard({ title, value, icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm flex items-center gap-4">
      <div className={`p-3 ${bgColor} ${color} rounded-xl`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-[#9ca3af] uppercase tracking-wider">{title}</p>
        <h3 className={`text-xl font-black ${color}`}>{value}</h3>
      </div>
    </div>
  )
}