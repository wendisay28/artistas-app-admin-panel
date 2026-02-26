'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Search, Eye, Check, MessageCircle, 
  Clock, AlertTriangle, User, Filter,
  Trash2, Reply, Paperclip
} from 'lucide-react'

// --- 1. INTERFACES ---
interface SupportTicket {
  id: string
  userId: string
  userName: string
  userEmail: string
  subject: string
  category: 'technical' | 'payment' | 'account' | 'general' | 'dispute'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  message: string
  createdAt: string
  updatedAt: string
}

// --- 2. DATOS DE EJEMPLO ---
const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    userId: 'USR-001',
    userName: 'Carlos Mendoza',
    userEmail: 'carlos@gmail.com',
    subject: 'No puedo subir mi foto de perfil',
    category: 'technical',
    priority: 'medium',
    status: 'in_progress',
    message: 'Hola, intento subir mi foto de perfil pero me aparece un error que dice "Formato no válido".',
    createdAt: '2026-02-25',
    updatedAt: '2026-02-25',
  },
  {
    id: 'TKT-002',
    userId: 'USR-002',
    userName: 'Sofía Ramírez',
    userEmail: 'sofia.r@hotmail.com',
    subject: 'Duda sobre comisiones',
    category: 'payment',
    priority: 'low',
    status: 'open',
    message: 'Quisiera saber cuánto es la comisión que cobra BuscArt por cada contrato.',
    createdAt: '2026-02-25',
    updatedAt: '2026-02-25',
  },
  {
    id: 'TKT-004',
    userId: 'USR-004',
    userName: 'Bodas del Norte SA',
    userEmail: 'contacto@bodasdelnorte.com',
    subject: 'Disputa sobre pago no recibido',
    category: 'dispute',
    priority: 'urgent',
    status: 'open',
    message: 'Realizamos un pago el día 20 de febrero pero el artista aún no lo ha recibido.',
    createdAt: '2026-02-25',
    updatedAt: '2026-02-25',
  },
]

const categoriasFiltro = ['Todos', 'technical', 'payment', 'account', 'general', 'dispute']

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: 'Abierto', className: 'bg-[#eff6ff] text-[#2563eb]' },
  in_progress: { label: 'En Progreso', className: 'bg-[#fffbeb] text-[#d97706]' },
  resolved: { label: 'Resuelto', className: 'bg-[#ecfdf5] text-[#059669]' },
  closed: { label: 'Cerrado', className: 'bg-gray-50 text-gray-500' },
}

export default function SupportPage() {
  const [search, setSearch] = useState('')
  const [catActiva, setCatActiva] = useState('Todos')
  const [showModal, setShowModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)

  const filtered = mockTickets.filter((t) => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || 
                       t.id.toLowerCase().includes(search.toLowerCase()) ||
                       t.userName.toLowerCase().includes(search.toLowerCase())
    const matchCat = catActiva === 'Todos' || t.category === catActiva
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Soporte Técnico" subtitle="Gestión de solicitudes y atención al usuario" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen rápido (Igual a Disputas) */}
        <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Tickets Totales</span>
                <span className="text-lg font-bold text-[#1e1b4b]">{mockTickets.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Urgentes</span>
                <span className="text-lg font-bold text-red-600 flex items-center gap-1">
                    <AlertTriangle size={16} /> {mockTickets.filter(t => t.priority === 'urgent').length}
                </span>
            </div>
        </div>

        {/* Barra de herramientas (Igual a Disputas) */}
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
                {cat === 'technical' ? 'Técnico' : cat === 'payment' ? 'Pagos' : cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar ticket..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none w-[240px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
              />
            </div>
            <button className="px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-lg hover:bg-[#5b21b6] transition-colors shadow-sm shadow-[#7c3aed30]">
              Nuevo Ticket
            </button>
          </div>
        </div>

        {/* Tabla (Estilo Exacto a Empresas/Disputas) */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[#f3f4f6] text-sm text-[#6b7280] flex justify-between items-center">
            <span>{filtered.length} tickets encontrados</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Asunto</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-[#f8f6ff] transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{t.id}</td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827]">{t.userName}</span>
                            <span className="text-[11px] text-[#6b7280]">{t.userEmail}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors truncate max-w-[200px]">{t.subject}</span>
                            <span className="text-[10px] font-bold text-[#7c3aed] uppercase">{t.category}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            t.priority === 'urgent' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-600'
                        }`}>
                            {t.priority}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[t.status].className}`}>
                        {statusConfig[t.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => { setSelectedTicket(t); setShowModal(true); }}
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

      {/* Modal de Detalle (Igual a Disputas) */}
      {showModal && selectedTicket && (
        <div className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl overflow-hidden border border-[#7c3aed1a]">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${selectedTicket.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {selectedTicket.priority}
                   </span>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusConfig[selectedTicket.status].className}`}>
                    {selectedTicket.status}
                   </span>
                </div>
                <button onClick={() => setShowModal(false)} className="text-[#9ca3af] hover:text-[#111827]"><XIcon /></button>
              </div>

              <h3 className="text-xl font-black text-[#1e1b4b] leading-tight mb-2">{selectedTicket.subject}</h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                  <p className="text-sm text-[#475569] leading-relaxed italic">"{selectedTicket.message}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-[#9ca3af] uppercase mb-1">Usuario</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{selectedTicket.userName}</p>
                  <p className="text-[11px] text-[#7c3aed] font-medium">{selectedTicket.userEmail}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-[#9ca3af] uppercase mb-1">Fecha de Reporte</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{selectedTicket.createdAt}</p>
                  <p className="text-[11px] text-[#64748b] font-medium uppercase">ID: {selectedTicket.id}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button className="flex-1 py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#5b21b6] transition-all flex items-center justify-center gap-2">
                  <Reply size={16} /> Responder
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white border border-[#e5e7eb] text-[#6b7280] font-bold rounded-xl hover:bg-gray-50 transition-all">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function XIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
}