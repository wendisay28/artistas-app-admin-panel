'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Search, 
  Check, 
  X, 
  Eye, 
  TrendingUp, 
  AlertCircle, 
  CalendarCheck, 
  MapPin, 
  User, 
  Clock, 
  DollarSign,
  Tag,
  BarChart3
} from 'lucide-react'

// --- INTERFACES ---
interface EventoPago {
  id: string
  titulo: string
  organizador: string
  categoria: string
  fecha: string
  hora: string
  ubicacion: string
  precio: number
  capacidad: number
  inscritos: number
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  fechaSolicitud: string
  descripcion: string
}

const eventosData: EventoPago[] = [
  { id: 'EVP-001', titulo: 'Festival de Mariachi 2026', organizador: 'Eventos del Norte S.A.', categoria: 'Música', fecha: '2026-03-25', hora: '18:00', ubicacion: 'Monterrey', precio: 350, capacidad: 500, inscritos: 234, estado: 'pendiente', fechaSolicitud: '2026-02-20', descripcion: 'Gran festival de mariachi con los mejores grupos del norte.' },
  { id: 'EVP-002', titulo: 'Concierto Rock Alt', organizador: 'Producciones Indie MX', categoria: 'Música', fecha: '2026-04-10', hora: '20:00', ubicacion: 'CDMX', precio: 280, capacidad: 300, inscritos: 156, estado: 'aprobado', fechaSolicitud: '2026-02-18', descripcion: 'Las bandas más emergentes del rock alternativo.' },
  { id: 'EVP-003', titulo: 'Stand-up Comedy Night', organizador: 'Comedia Central', categoria: 'Comedia', fecha: '2026-03-30', hora: '21:00', ubicacion: 'Guadalajara', precio: 200, capacidad: 150, inscritos: 89, estado: 'pendiente', fechaSolicitud: '2026-02-22', descripcion: 'Noche de comedia con los mejores comediantes.' }
]

const statusConfig: Record<string, { label: string; className: string }> = {
  aprobado: { label: 'Aprobado', className: 'bg-[#ecfdf5] text-[#059669]' },
  pendiente: { label: 'Pendiente', className: 'bg-[#fffbeb] text-[#d97706]' },
  rechazado: { label: 'Rechazado', className: 'bg-[#fef2f2] text-[#dc2626]' },
}

export default function EventosPagosPage() {
  const [eventos, setEventos] = useState<EventoPago[]>(eventosData)
  const [search, setSearch] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [selectedEvento, setSelectedEvento] = useState<EventoPago | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filtered = eventos.filter(ev => {
    const matchSearch = ev.titulo.toLowerCase().includes(search.toLowerCase()) || ev.organizador.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filtroEstado === 'todos' || ev.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const updateEstado = (id: string, nuevo: EventoPago['estado']) => {
    setEventos(prev => prev.map(ev => ev.id === id ? { ...ev, estado: nuevo } : ev))
    setShowModal(false)
  }

  const stats = {
    pendientes: eventos.filter(e => e.estado === 'pendiente').length,
    aprobados: eventos.filter(e => e.estado === 'aprobado').length,
    recaudado: eventos.filter(e => e.estado === 'aprobado').reduce((acc, e) => acc + (e.precio * e.inscritos), 0)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Control de Taquilla" subtitle="Validación y monitoreo de eventos comerciales" />

      <div className="px-6 py-8 flex flex-col gap-6">
        
        {/* Stats Cards - Unificadas con tu estilo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase">Ingresos Estimados</p>
                <h3 className="text-2xl font-black text-[#1e1b4b] mt-1">${stats.recaudado.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-[#f0edff] rounded-xl text-[#7c3aed]"><TrendingUp size={20} /></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase">Pendientes Acción</p>
                <h3 className="text-2xl font-black text-[#d97706] mt-1">{stats.pendientes}</h3>
              </div>
              <div className="p-3 bg-[#fffbeb] rounded-xl text-[#d97706]"><AlertCircle size={20} /></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase">Eventos Aprobados</p>
                <h3 className="text-2xl font-black text-[#059669] mt-1">{stats.aprobados}</h3>
              </div>
              <div className="p-3 bg-[#ecfdf5] rounded-xl text-[#059669]"><CalendarCheck size={20} /></div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2">
            {['todos', 'pendiente', 'aprobado', 'rechazado'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltroEstado(f)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all capitalize ${
                  filtroEstado === f ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-[#6b7280] border-[#e5e7eb] hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Buscar evento u organizador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-xl outline-none w-[280px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
            />
          </div>
        </div>

        {/* Tabla Estilo Lista */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Evento</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Ventas / Cap</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Precio</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-right text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((ev) => {
                  const perc = (ev.inscritos / ev.capacidad) * 100
                  return (
                    <tr key={ev.id} className="hover:bg-[#f8f6ff] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors">{ev.titulo}</span>
                          <span className="text-[11px] text-[#9ca3af]">{ev.organizador}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-[10px] font-bold bg-[#f0edff] text-[#7c3aed] rounded-lg uppercase tracking-tight">
                          {ev.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span className="text-[#4b5563]">{ev.inscritos} de {ev.capacidad}</span>
                            <span className="text-[#7c3aed]">{perc.toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#7c3aed] transition-all" style={{ width: `${perc}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#111827]">${ev.precio}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusConfig[ev.estado].className}`}>
                          {statusConfig[ev.estado].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button 
                            onClick={() => { setSelectedEvento(ev); setShowModal(true); }}
                            className="p-2 text-[#9ca3af] hover:text-[#7c3aed] hover:bg-white rounded-lg transition-all"
                          >
                            <Eye size={16} />
                          </button>
                          {ev.estado === 'pendiente' && (
                            <button 
                              onClick={() => updateEstado(ev.id, 'aprobado')}
                              className="p-2 text-[#9ca3af] hover:text-[#059669] hover:bg-white rounded-lg transition-all"
                            >
                              <Check size={16} />
                            </button>
                          )}
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

      {/* Modal de Detalle */}
      {showModal && selectedEvento && (
        <div className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full shadow-2xl overflow-hidden border border-[#7c3aed1a]">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#f0edff] text-[#7c3aed] rounded-2xl"><Tag size={24} /></div>
                <button onClick={() => setShowModal(false)} className="text-[#9ca3af] hover:text-[#111827]"><X size={20} /></button>
              </div>
              <h3 className="text-xl font-black text-[#1e1b4b] leading-tight">{selectedEvento.titulo}</h3>
              <p className="text-xs font-bold text-[#7c3aed] uppercase mt-1 tracking-wider">{selectedEvento.organizador}</p>
              
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#9ca3af] uppercase">Ubicación</span>
                  <span className="text-xs font-bold text-[#4b5563] flex items-center gap-1"><MapPin size={12}/> {selectedEvento.ubicacion}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#9ca3af] uppercase">Horario</span>
                  <span className="text-xs font-bold text-[#4b5563] flex items-center gap-1"><Clock size={12}/> {selectedEvento.fecha} @ {selectedEvento.hora}</span>
                </div>
              </div>

              <div className="bg-[#f9fafb] p-4 rounded-2xl mb-6 text-xs text-[#6b7280] leading-relaxed">
                {selectedEvento.descripcion}
              </div>

              {selectedEvento.estado === 'pendiente' && (
                <div className="flex gap-3">
                  <button onClick={() => updateEstado(selectedEvento.id, 'aprobado')} className="flex-1 py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#5b21b6] transition-all">Aprobar Evento</button>
                  <button onClick={() => updateEstado(selectedEvento.id, 'rechazado')} className="px-6 py-3 border border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all">Rechazar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}