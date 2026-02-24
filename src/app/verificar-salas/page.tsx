'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Shield, Eye, Check, X, Search, MapPin, User, 
  Ban, Building2, Phone, Mail, FileText,
  ExternalLink, Download, AlertTriangle, Clock,
  ChevronRight, Sparkles, CheckCircle2, XCircle
} from 'lucide-react'

// INTERFACES Y DATOS
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
}

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
    fotos: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    documentos: ['Identificación oficial', 'Comprobante de domicilio', 'Licencia de funcionamiento'],
    fechaSolicitud: '20 Feb 2026',
    capacidad: '250 personas'
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
    fotos: ['/api/placeholder/400/300'],
    documentos: ['Identificación oficial', 'Permiso municipal', 'Seguro de responsabilidad civil'],
    fechaSolicitud: '21 Feb 2026',
    capacidad: '120 personas'
  },
  {
    id: 'SAL-003',
    nombre: 'Casa Colonial',
    tipo: 'Espacio Cultural',
    direccion: 'Centro Histórico #89, Oaxaca',
    propietario: 'Roberto Vásquez',
    email: 'r.vasquez@casacolonial.mx',
    telefono: '+52 951 456 7890',
    estado: 'verificada',
    fotos: ['/api/placeholder/400/300'],
    documentos: ['Identificación oficial', 'Licencia de funcionamiento'],
    fechaSolicitud: '15 Feb 2026',
    capacidad: '80 personas'
  },
  {
    id: 'SAL-004',
    nombre: 'Loft Urbano',
    tipo: 'Espacio Creativo',
    direccion: 'Col. Roma #220, CDMX',
    propietario: 'Sofía Méndez',
    email: 'sofia@lofturbano.mx',
    telefono: '+52 55 9876 5432',
    estado: 'rechazada',
    fotos: ['/api/placeholder/400/300'],
    documentos: ['Identificación oficial'],
    fechaSolicitud: '18 Feb 2026',
    capacidad: '40 personas'
  }
]

type FilterEstado = 'todos' | 'pendiente' | 'verificada' | 'rechazada'

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
      sala.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sala.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter = filterEstado === 'todos' || sala.estado === filterEstado
    return matchSearch && matchFilter
  })

  const handleUpdateEstado = async (id: string, nuevoEstado: SalaVerificacion['estado']) => {
    setProcessingId(id)
    // Simula latencia de red para mejor UX
    await new Promise(r => setTimeout(r, 600))
    setSalas(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
    setProcessingId(null)
    setShowModal(false)
    setSelectedSala(null)
    showToast(
      nuevoEstado === 'verificada' ? '✓ Sala verificada y habilitada en el mapa' : '✗ Solicitud rechazada correctamente',
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
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl animate-scale-in font-bold text-sm text-white transition-all
          ${toast.type === 'success' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            icon={<AlertTriangle size={22} />}
            value={pendientes}
            label="Pendientes de Revisión"
            color="amber"
            urgent={pendientes > 0}
          />
          <StatCard
            icon={<Check size={22} />}
            value={verificadas}
            label="Salas Verificadas"
            color="emerald"
          />
          <StatCard
            icon={<Ban size={22} />}
            value={rechazadas}
            label="Solicitudes Rechazadas"
            color="red"
          />
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#7c3aed1a] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#7c3aed] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre, ID o propietario..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f6ff] border border-transparent rounded-xl focus:bg-white focus:border-[#7c3aed] transition-all outline-none text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros por estado */}
          <div className="flex gap-2 flex-wrap">
            {filterButtons.map(({ label, value, count }) => (
              <button
                key={value}
                onClick={() => setFilterEstado(value)}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-wide flex items-center gap-1.5
                  ${filterEstado === value
                    ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed25]'
                    : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#ede9fe] hover:text-[#7c3aed]'
                  }`}
              >
                {label}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black
                  ${filterEstado === value ? 'bg-white/20' : 'bg-white'}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Salas */}
        {filteredSalas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#f0edff] rounded-2xl flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-[#7c3aed]" />
            </div>
            <p className="text-[#1e1b4b] font-black text-lg">Sin resultados</p>
            <p className="text-[#9ca3af] text-sm mt-1 font-medium">Prueba con otro término o cambia el filtro.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSalas.map((sala) => (
              <SalaCard
                key={sala.id}
                sala={sala}
                onRevisar={() => { setSelectedSala(sala); setShowModal(true) }}
              />
            ))}
          </div>
        )}
      </main>

      {/* MODAL DE DETALLE */}
      {showModal && selectedSala && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="bg-white rounded-[2.5rem] max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-[0_25px_50px_-12px_rgba(124,58,237,0.25)] border border-white/20 animate-scale-in">

            {/* Header del modal */}
            <div className="p-7 border-b border-[#f3f4f6] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#7c3aed25]">
                  <Shield size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#1e1b4b]">Expediente de Verificación</h2>
                  <p className="text-[#9ca3af] font-bold text-[11px] uppercase tracking-[0.2em] mt-0.5">
                    {selectedSala.id} · Solicitado el {selectedSala.fechaSolicitud}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge estado={selectedSala.estado} />
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-[#f8f6ff] rounded-xl transition-colors"
                >
                  <X size={20} className="text-[#6b7280]" />
                </button>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Columna izquierda */}
                <div className="lg:col-span-7 space-y-8">
                  <SectionTitle>Datos de la Entidad</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoBlock icon={<Building2 size={16} />} label="Nombre Legal" value={selectedSala.nombre} />
                    <InfoBlock icon={<User size={16} />} label="Representante" value={selectedSala.propietario} />
                    <InfoBlock icon={<Mail size={16} />} label="Correo Electrónico" value={selectedSala.email} />
                    <InfoBlock icon={<Phone size={16} />} label="Línea Directa" value={selectedSala.telefono} />
                    <InfoBlock icon={<MapPin size={16} />} label="Dirección" value={selectedSala.direccion} />
                    {selectedSala.capacidad && (
                      <InfoBlock icon={<User size={16} />} label="Capacidad" value={selectedSala.capacidad} />
                    )}
                  </div>

                  <div className="pt-2">
                    <SectionTitle>Documentos de Soporte</SectionTitle>
                    <div className="space-y-2.5 mt-5">
                      {selectedSala.documentos.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-[#f8f6ff] rounded-2xl border border-[#7c3aed1a] hover:border-[#7c3aed40] transition-colors group/doc"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl shadow-sm">
                              <FileText className="text-[#7c3aed]" size={16} />
                            </div>
                            <span className="text-sm font-bold text-[#4b5563]">{doc}</span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover/doc:opacity-100 transition-opacity">
                            <button className="p-2 text-[#9ca3af] hover:text-[#7c3aed] rounded-lg hover:bg-white transition-all">
                              <Eye size={15} />
                            </button>
                            <button className="p-2 text-[#9ca3af] hover:text-[#7c3aed] rounded-lg hover:bg-white transition-all">
                              <Download size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="lg:col-span-5 space-y-5">
                  <SectionTitle>Inspección Visual</SectionTitle>
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    {selectedSala.fotos.map((foto, i) => (
                      <div
                        key={i}
                        className="relative group/img rounded-2xl overflow-hidden aspect-square border border-[#7c3aed1a]"
                      >
                        <img src={foto} alt={`Evidencia ${i + 1}`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                        <button className="absolute inset-0 bg-[#7c3aed]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="text-white drop-shadow" size={22} />
                        </button>
                      </div>
                    ))}
                    {/* Placeholder si solo hay una foto */}
                    {selectedSala.fotos.length === 1 && (
                      <div className="rounded-2xl aspect-square border-2 border-dashed border-[#7c3aed30] flex items-center justify-center text-[#c4b5fd]">
                        <span className="text-xs font-bold text-center px-2">Sin más fotos</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#f0edff] p-4 rounded-2xl border border-[#7c3aed21]">
                    <p className="text-[11px] text-[#7c3aed] font-bold leading-relaxed">
                      💡 Verifica que las fotos coincidan con la dirección registrada y muestren el equipo técnico mencionado en la descripción.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer de decisiones */}
            {selectedSala.estado === 'pendiente' ? (
              <div className="p-6 bg-[#f8f6ff] border-t border-[#7c3aed1a] flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => handleUpdateEstado(selectedSala.id, 'verificada')}
                  disabled={processingId === selectedSala.id}
                  className="flex-[2] py-4 bg-[#10b981] text-white font-black rounded-2xl hover:bg-[#059669] shadow-xl shadow-[#10b98115] transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {processingId === selectedSala.id ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                  ) : (
                    <Check size={18} />
                  )}
                  Aprobar y Habilitar en Mapa
                </button>
                <button
                  onClick={() => handleUpdateEstado(selectedSala.id, 'rechazada')}
                  disabled={processingId === selectedSala.id}
                  className="flex-1 py-4 bg-white text-[#dc2626] border border-[#fecaca] font-black rounded-2xl hover:bg-[#fef2f2] transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Ban size={18} /> Denegar Solicitud
                </button>
              </div>
            ) : (
              <div className="p-6 bg-[#f8f6ff] border-t border-[#7c3aed1a] flex items-center justify-center gap-2">
                <span className={`text-sm font-bold ${selectedSala.estado === 'verificada' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {selectedSala.estado === 'verificada' ? '✓ Esta sala ya fue verificada' : '✗ Esta solicitud fue rechazada'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sub-componentes ──────────────────────────────────────────────────────────

function StatCard({ icon, value, label, color, urgent }: {
  icon: React.ReactNode
  value: number
  label: string
  color: 'amber' | 'emerald' | 'red'
  urgent?: boolean
}) {
  const palette = {
    amber: { bg: 'bg-[#fef3c7]', text: 'text-[#f59e0b]', ring: urgent ? 'ring-2 ring-[#f59e0b30]' : '' },
    emerald: { bg: 'bg-[#d1fae5]', text: 'text-[#10b981]', ring: '' },
    red: { bg: 'bg-[#fee2e2]', text: 'text-[#ef4444]', ring: '' },
  }
  const p = palette[color]
  return (
    <div className={`bg-white p-5 rounded-2xl border border-[#7c3aed1a] flex items-center gap-4 shadow-sm ${p.ring} transition-all`}>
      <div className={`w-12 h-12 rounded-xl ${p.bg} ${p.text} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-[#1e1b4b]">{value}</p>
        <p className="text-[11px] font-bold text-[#8b5cf6] uppercase tracking-wider">{label}</p>
      </div>
      {urgent && value > 0 && (
        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
      )}
    </div>
  )
}

function SalaCard({ sala, onRevisar }: { sala: SalaVerificacion; onRevisar: () => void }) {
  return (
    <div className="group bg-white rounded-[2rem] border border-[#7c3aed1a] overflow-hidden hover:shadow-xl hover:shadow-[#7c3aed10] hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={sala.fotos[0]} alt={sala.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <StatusBadge estado={sala.estado} />
        </div>
        {sala.fechaSolicitud && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <Clock size={11} className="text-white/70" />
            <span className="text-[10px] font-bold text-white/90">{sala.fechaSolicitud}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-black text-[#1e1b4b] text-base leading-tight">{sala.nombre}</h3>
          <span className="text-[10px] font-black bg-[#f8f6ff] text-[#8b5cf6] px-2 py-1 rounded-lg uppercase ml-2 flex-shrink-0">{sala.tipo}</span>
        </div>
        <p className="text-xs text-[#6b7280] flex items-center gap-1 mb-1 font-medium">
          <MapPin size={12} className="text-[#7c3aed] flex-shrink-0" /> {sala.direccion}
        </p>
        <p className="text-xs text-[#9ca3af] flex items-center gap-1 mb-5 font-medium">
          <User size={12} className="text-[#9ca3af] flex-shrink-0" /> {sala.propietario}
        </p>

        <button
          onClick={onRevisar}
          className="w-full py-2.5 bg-[#f0edff] text-[#7c3aed] rounded-xl font-bold text-sm hover:bg-[#7c3aed] hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
        >
          Revisar Expediente
          <ChevronRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    pendiente: 'bg-[#f59e0b] text-white',
    verificada: 'bg-[#10b981] text-white',
    rechazada: 'bg-[#ef4444] text-white',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${styles[estado]}`}>
      {estado}
    </span>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-[3px] w-6 bg-gradient-to-r from-[#7c3aed] to-[#2563eb] rounded-full" />
      <h3 className="font-black text-[#1e1b4b] uppercase tracking-widest text-[11px]">{children}</h3>
    </div>
  )
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[#c4b5fd] mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-[#9ca3af] uppercase tracking-tight mb-0.5">{label}</p>
        <p className="text-[#374151] font-bold text-sm leading-snug">{value}</p>
      </div>
    </div>
  )
}