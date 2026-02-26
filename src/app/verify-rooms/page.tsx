'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Shield, Eye, Check, X, Search, MapPin, User, 
  Ban, Building2, Phone, Mail, FileText,
  ExternalLink, Download, AlertTriangle, Clock,
  ChevronRight, Sparkles, CheckCircle2, XCircle, Tag
} from 'lucide-react'

// --- 1. INTERFACES ---
interface SalaVerificacion {
  id: string
  nombre: string
  tipo: string
  direccion: string
  propietario: string
  email: string
  telefono: string
  estado: 'pendiente' | 'verificada' | 'rechazada'
  fotos: string[]
  documentos: string[]
  fechaSolicitud?: string
  capacidad?: string
  descripcion?: string
}

type FilterEstado = 'todos' | 'pendiente' | 'verificada' | 'rechazada'

// --- 2. DATOS DE EJEMPLO ---
const salasPendientesData: SalaVerificacion[] = [
  {
    id: 'SAL-001',
    nombre: 'Salón Imperial',
    tipo: 'Salón de Eventos',
    direccion: 'Av. Principal #123, CDMX',
    propietario: 'Carlos Rodríguez',
    email: 'carlos@salonimperial.com',
    telefono: '+52 55 1234 5678',
    estado: 'pendiente',
    fotos: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000'],
    documentos: ['Identificación oficial', 'Licencia de funcionamiento'],
    fechaSolicitud: '20 Feb 2026',
    capacidad: '250 personas',
    descripcion: 'Espacio amplio con acabados de lujo ideal para bodas y graduaciones.'
  },
  {
    id: 'SAL-002',
    nombre: 'Terraza Jardín',
    tipo: 'Espacio Exterior',
    direccion: 'Calle Flores #456, Guadalajara',
    propietario: 'María González',
    email: 'maria@terrazajardin.com',
    telefono: '+52 33 8765 4321',
    estado: 'pendiente',
    fotos: ['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000'],
    documentos: ['Permiso municipal', 'Seguro de responsabilidad civil'],
    fechaSolicitud: '21 Feb 2026',
    capacidad: '120 personas',
    descripcion: 'Terraza con vista panorámica y áreas verdes.'
  }
]

const statusConfig: Record<string, { label: string; className: string }> = {
  verificada: { label: 'Verificada', className: 'bg-[#ecfdf5] text-[#059669]' },
  pendiente: { label: 'Pendiente', className: 'bg-[#fffbeb] text-[#d97706]' },
  rechazada: { label: 'Rechazada', className: 'bg-[#fef2f2] text-[#dc2626]' },
}

// --- 3. COMPONENTE PRINCIPAL ---
export default function VerificarSalasPage() {
  const [salas, setSalas] = useState<SalaVerificacion[]>(salasPendientesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState<FilterEstado>('todos')
  const [selectedSala, setSelectedSala] = useState<SalaVerificacion | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const filteredSalas = salas.filter(sala => {
    const matchSearch = sala.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sala.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter = filterEstado === 'todos' || sala.estado === filterEstado
    return matchSearch && matchFilter
  })

  const handleUpdateEstado = async (id: string, nuevoEstado: 'verificada' | 'rechazada') => {
    setProcessingId(id)
    await new Promise(r => setTimeout(r, 800))
    setSalas(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
    setProcessingId(null)
    setShowModal(false)
    showToast(
      nuevoEstado === 'verificada' ? '✓ Sala verificada con éxito' : '✗ Solicitud rechazada',
      nuevoEstado === 'verificada' ? 'success' : 'error'
    )
  }

  const pendientes = salas.filter(s => s.estado === 'pendiente').length
  const verificadas = salas.filter(s => s.estado === 'verificada').length
  const rechazadas = salas.filter(s => s.estado === 'rechazada').length

  const filterButtons: { label: string; value: FilterEstado; count: number }[] = [
    { label: 'Todas', value: 'todos', count: salas.length },
    { label: 'Pendientes', value: 'pendiente', count: pendientes },
    { label: 'Verificadas', value: 'verificada', count: verificadas },
    { label: 'Rechazadas', value: 'rechazada', count: rechazadas },
  ]

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-16">
      <Header 
        title="Verificación de Salas" 
        subtitle="Auditoría de espacios y validación de documentos legales" 
      />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-bounce font-bold text-sm text-white
          ${toast.type === 'success' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="px-6 py-8 flex flex-col gap-5">
        {/* Resumen rápido (Estilo Empresas) */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Pendientes</span>
            <span className="text-lg font-bold text-[#1e1b4b]">{pendientes}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Verificadas</span>
            <span className="text-lg font-bold text-[#059669]">{verificadas}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Rechazadas</span>
            <span className="text-lg font-bold text-[#dc2626]">{rechazadas}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filterButtons.map(({ label, value, count }) => (
              <button
                key={value}
                onClick={() => setFilterEstado(value)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border border-[#e5e7eb] bg-white cursor-pointer transition-all ${
                  filterEstado === value ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'hover:bg-gray-50 text-[#6b7280]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={16} />
            <input
              type="text"
              placeholder="Buscar sala..."
              className="pl-11 pr-4 py-2 text-sm bg-white border border-[#e5e7eb] rounded-xl focus:border-[#7c3aed] transition-all outline-none w-[280px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSalas.map((sala) => (
            <SalaCard key={sala.id} sala={sala} onRevisar={() => { setSelectedSala(sala); setShowModal(true); }} />
          ))}
        </div>
      </div>

      {/* Modal de Detalle */}
      {showModal && selectedSala && (
        <div className="fixed inset-0 bg-[#1e1b4b]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            <div className="p-8 border-b border-[#f3f4f6] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#f0edff] text-[#7c3aed] rounded-2xl"><Shield size={24} /></div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e1b4b]">{selectedSala.nombre}</h2>
                  <p className="text-xs text-[#9ca3af] font-bold uppercase tracking-widest">{selectedSala.id}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>

            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <SectionTitle>Datos de Contacto</SectionTitle>
                <div className="grid gap-4">
                  <InfoBlock icon={<User size={16}/>} label="Propietario" value={selectedSala.propietario} />
                  <InfoBlock icon={<Mail size={16}/>} label="Email" value={selectedSala.email} />
                  <InfoBlock icon={<Phone size={16}/>} label="Teléfono" value={selectedSala.telefono} />
                  <InfoBlock icon={<MapPin size={16}/>} label="Ubicación" value={selectedSala.direccion} />
                </div>
              </div>
              <div className="space-y-6">
                <SectionTitle>Documentación</SectionTitle>
                <div className="grid gap-2">
                  {selectedSala.documentos.map((doc, i) => (
                    <div key={i} className="p-3 bg-[#f8f6ff] rounded-xl border border-[#7c3aed1a] flex justify-between items-center text-sm font-medium">
                      <span className="flex items-center gap-2"><FileText size={14} className="text-[#7c3aed]"/> {doc}</span>
                      <Download size={14} className="text-[#9ca3af] cursor-pointer hover:text-[#7c3aed]"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedSala.estado === 'pendiente' && (
              <div className="p-8 bg-[#f8f6ff] border-t flex gap-4">
                <button 
                  onClick={() => handleUpdateEstado(selectedSala.id, 'verificada')}
                  className="flex-1 py-4 bg-[#10b981] text-white font-bold rounded-2xl hover:bg-[#059669] transition-all flex items-center justify-center gap-2"
                >
                  {processingId ? 'Procesando...' : <Check size={20}/>} Aprobar Sala
                </button>
                <button 
                  onClick={() => handleUpdateEstado(selectedSala.id, 'rechazada')}
                  className="px-8 py-4 border border-red-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all"
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// --- 4. SUB-COMPONENTES INTERNOS ---
function StatCard({ icon, value, label, color, urgent }: any) {
  const colors: any = {
    amber: 'bg-[#fffbeb] text-[#d97706]',
    emerald: 'bg-[#ecfdf5] text-[#059669]',
    red: 'bg-[#fef2f2] text-[#dc2626]'
  }
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#1e1b4b]">{value}</p>
        <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">{label}</p>
      </div>
      {urgent && <div className="ml-auto w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>}
    </div>
  )
}

function SalaCard({ sala, onRevisar }: { sala: SalaVerificacion; onRevisar: () => void }) {
  return (
    <div className="group bg-white rounded-[2rem] border border-[#e5e7eb] overflow-hidden hover:shadow-2xl transition-all duration-500">
      <div className="aspect-video relative overflow-hidden">
        <img src={sala.fotos[0]} alt={sala.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusConfig[sala.estado].className}`}>
            {sala.estado}
          </span>
        </div>
      </div>
      <div className="p-6">
        <span className="text-[10px] font-bold text-[#7c3aed] uppercase">{sala.tipo}</span>
        <h3 className="font-bold text-[#1e1b4b] text-lg mb-4">{sala.nombre}</h3>
        <div className="space-y-2 mb-6 text-xs text-[#6b7280]">
          <div className="flex items-center gap-2"><MapPin size={14}/> {sala.direccion}</div>
          <div className="flex items-center gap-2"><User size={14}/> {sala.propietario}</div>
        </div>
        <button onClick={onRevisar} className="w-full py-3 bg-[#f0edff] text-[#7c3aed] rounded-xl font-bold text-sm hover:bg-[#7c3aed] hover:text-white transition-all flex items-center justify-center gap-2">
          Revisar Expediente <ChevronRight size={16}/>
        </button>
      </div>
    </div>
  )
}

function SectionTitle({ children }: any) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-1 w-4 bg-[#7c3aed] rounded-full" />
      <h3 className="font-bold text-[#1e1b4b] uppercase text-[11px] tracking-widest">{children}</h3>
    </div>
  )
}

function InfoBlock({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[#c4b5fd] mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-[#9ca3af] uppercase">{label}</p>
        <p className="text-sm font-bold text-[#4b5563]">{value}</p>
      </div>
    </div>
  )
}