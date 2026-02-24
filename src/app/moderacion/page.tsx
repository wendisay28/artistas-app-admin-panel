'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import {
  Shield,
  Eye,
  Check,
  X,
  AlertTriangle,
  Search,
  Image as ImageIcon,
  Flag,
  Ban,
  Clock,
  History,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  User,
  Hash,
  Calendar,
  MessageSquare,
  ZoomIn
} from 'lucide-react'

// ── Interfaces ───────────────────────────────────────────────────────────────

interface ImagenReportada {
  id: string
  url: string
  reportadoPor: string
  motivo: string
  descripcion: string
  fechaReporte: string
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  moderador?: string
  fechaModificacion?: string
  artistaId: string
  artistaNombre: string
  tipoArtista?: string
}

// ── Datos de ejemplo ─────────────────────────────────────────────────────────

const imagenesReportadasData: ImagenReportada[] = [
  {
    id: 'IMG-001',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario123',
    motivo: 'Contenido inapropiado',
    descripcion: 'La imagen contiene contenido que viola las políticas de la plataforma y puede resultar ofensivo para otros usuarios.',
    fechaReporte: '2026-02-20',
    estado: 'pendiente',
    artistaId: 'ART-001',
    artistaNombre: 'María Reyes',
    tipoArtista: 'Cantante'
  },
  {
    id: 'IMG-002',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario456',
    motivo: 'Derechos de autor',
    descripcion: 'La imagen parece ser propiedad de otro artista sin permiso explícito de uso.',
    fechaReporte: '2026-02-19',
    estado: 'pendiente',
    artistaId: 'ART-002',
    artistaNombre: 'DJ Pulso',
    tipoArtista: 'DJ'
  },
  {
    id: 'IMG-003',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario789',
    motivo: 'Calidad baja',
    descripcion: 'La imagen es de muy baja resolución y no representa adecuadamente al artista en la plataforma.',
    fechaReporte: '2026-02-18',
    estado: 'aprobado',
    moderador: 'admin@buscart.com',
    fechaModificacion: '2026-02-18',
    artistaId: 'ART-003',
    artistaNombre: 'Trío Elegance',
    tipoArtista: 'Grupo Musical'
  },
  {
    id: 'IMG-004',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario321',
    motivo: 'Información falsa',
    descripcion: 'La imagen no corresponde con la información registrada en el perfil del artista.',
    fechaReporte: '2026-02-17',
    estado: 'rechazado',
    moderador: 'admin@buscart.com',
    fechaModificacion: '2026-02-17',
    artistaId: 'ART-004',
    artistaNombre: 'Stand-up Rojas',
    tipoArtista: 'Comediante'
  },
  {
    id: 'IMG-005',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario654',
    motivo: 'Spam',
    descripcion: 'La imagen es utilizada con fines de publicidad no autorizada dentro de la plataforma.',
    fechaReporte: '2026-02-21',
    estado: 'pendiente',
    artistaId: 'ART-005',
    artistaNombre: 'Luna Band',
    tipoArtista: 'Banda'
  }
]

type FilterEstado = 'todos' | 'pendiente' | 'aprobado' | 'rechazado'

// ── Utilidades ────────────────────────────────────────────────────────────────

const motivoColor: Record<string, string> = {
  'Contenido inapropiado': 'bg-red-50 text-red-600',
  'Derechos de autor': 'bg-orange-50 text-orange-600',
  'Calidad baja': 'bg-slate-100 text-slate-500',
  'Información falsa': 'bg-yellow-50 text-yellow-700',
  'Spam': 'bg-purple-50 text-purple-600',
}

function getMotivoStyle(motivo: string) {
  return motivoColor[motivo] ?? 'bg-slate-100 text-slate-500'
}

// ── Sub-componentes ───────────────────────────────────────────────────────────

function StatCard({ title, value, icon, colorClass, bgClass, urgent }: {
  title: string
  value: number
  icon: React.ReactNode
  colorClass: string
  bgClass: string
  urgent?: boolean
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#7c3aed1a] shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bgClass} ${colorClass} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-2xl font-black text-[#1e1b4b]">{value}</p>
        <p className="text-[11px] font-bold text-[#8b5cf6] uppercase tracking-wider">{title}</p>
      </div>
      {urgent && value > 0 && (
        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse ml-auto" />
      )}
    </div>
  )
}

function StatusBadge({ estado }: { estado: ImagenReportada['estado'] }) {
  const map = {
    pendiente: 'bg-[#f59e0b] text-white',
    aprobado: 'bg-[#10b981] text-white',
    rechazado: 'bg-[#ef4444] text-white',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow ${map[estado]}`}>
      {estado}
    </span>
  )
}

function ImageCard({ img, onRevisar }: { img: ImagenReportada; onRevisar: () => void }) {
  return (
    <div className="group bg-white rounded-[2rem] border border-[#7c3aed1a] overflow-hidden hover:shadow-xl hover:shadow-[#7c3aed10] hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={img.url}
          alt="Evidencia"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ZoomIn className="text-white drop-shadow" size={28} />
        </div>

        {/* Badge REPORTADO */}
        {img.estado === 'pendiente' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow">
            <Flag size={9} fill="white" /> REPORTADO
          </div>
        )}

        {/* Estado badge */}
        <div className="absolute top-3 right-3">
          <StatusBadge estado={img.estado} />
        </div>

        {/* Fecha en footer de imagen */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <Calendar size={10} className="text-white/70" />
          <span className="text-[10px] font-bold text-white/90">{img.fechaReporte}</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-black text-[#1e1b4b] text-sm leading-tight truncate">{img.artistaNombre}</h4>
            <span className="text-[10px] text-[#9ca3af] font-bold flex-shrink-0">{img.id}</span>
          </div>
          {img.tipoArtista && (
            <p className="text-[11px] text-[#9ca3af] font-medium mt-0.5">{img.tipoArtista}</p>
          )}
        </div>

        <div className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide ${getMotivoStyle(img.motivo)}`}>
          <Flag size={9} />
          {img.motivo}
        </div>

        <button
          onClick={onRevisar}
          className="w-full py-2.5 rounded-xl bg-[#f0edff] text-[#7c3aed] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#7c3aed] hover:text-white transition-all group/btn border border-[#7c3aed1a]"
        >
          <Shield size={14} /> Revisar Caso
          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function ModeracionPage() {
  const [imagenes, setImagenes] = useState<ImagenReportada[]>(imagenesReportadasData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState<FilterEstado>('todos')
  const [selectedImage, setSelectedImage] = useState<ImagenReportada | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const filteredImages = imagenes.filter(img => {
    const matchesSearch =
      img.artistaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.reportadoPor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === 'todos' || img.estado === filterEstado
    return matchesSearch && matchesEstado
  })

  const updateEstado = async (id: string, nuevoEstado: ImagenReportada['estado']) => {
    setProcessingId(id)
    await new Promise(r => setTimeout(r, 600))
    setImagenes(prev => prev.map(img =>
      img.id === id ? {
        ...img,
        estado: nuevoEstado,
        fechaModificacion: new Date().toISOString().split('T')[0],
        moderador: 'admin@buscart.com'
      } : img
    ))
    setProcessingId(null)
    setShowModal(false)
    setSelectedImage(null)
    showToast(
      nuevoEstado === 'aprobado' ? '✓ Imagen aprobada y mantenida en el perfil' : '✗ Imagen eliminada correctamente',
      nuevoEstado === 'aprobado' ? 'success' : 'error'
    )
  }

  const pendientes = imagenes.filter(i => i.estado === 'pendiente').length
  const procesadas = imagenes.filter(i => i.estado !== 'pendiente').length
  const criticos = imagenes.filter(i =>
    i.estado === 'pendiente' && ['Contenido inapropiado', 'Derechos de autor'].includes(i.motivo)
  ).length

  const filterButtons: { label: string; value: FilterEstado; count: number }[] = [
    { label: 'Todos', value: 'todos', count: imagenes.length },
    { label: 'Pendientes', value: 'pendiente', count: pendientes },
    { label: 'Aprobados', value: 'aprobado', count: imagenes.filter(i => i.estado === 'aprobado').length },
    { label: 'Rechazados', value: 'rechazado', count: imagenes.filter(i => i.estado === 'rechazado').length },
  ]

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-16">
      <Header title="Moderación de Contenido" subtitle="Protege la integridad visual de BuscArt" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl animate-scale-in font-bold text-sm text-white
          ${toast.type === 'success' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Pendientes de Revisión"
            value={pendientes}
            icon={<Clock size={22} />}
            colorClass="text-[#f59e0b]"
            bgClass="bg-[#fef3c7]"
            urgent={pendientes > 0}
          />
          <StatCard
            title="Total Procesadas"
            value={procesadas}
            icon={<Check size={22} />}
            colorClass="text-[#10b981]"
            bgClass="bg-[#d1fae5]"
          />
          <StatCard
            title="Reportes Críticos"
            value={criticos}
            icon={<AlertTriangle size={22} />}
            colorClass="text-[#ef4444]"
            bgClass="bg-[#fee2e2]"
            urgent={criticos > 0}
          />
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#7c3aed1a] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#7c3aed] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Buscar por artista, motivo, ID..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#f8f6ff] border border-transparent rounded-xl focus:bg-white focus:border-[#7c3aed] transition-all outline-none text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {filterButtons.map(({ label, value, count }) => (
              <button
                key={value}
                onClick={() => setFilterEstado(value)}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-wide flex items-center gap-1.5
                  ${filterEstado === value
                    ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed25]'
                    : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#ede9fe] hover:text-[#7c3aed]'}`}
              >
                {label}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${filterEstado === value ? 'bg-white/20' : 'bg-white'}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid o estado vacío */}
        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#f0edff] rounded-2xl flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-[#7c3aed]" />
            </div>
            <p className="text-[#1e1b4b] font-black text-lg">Sin resultados</p>
            <p className="text-[#9ca3af] text-sm mt-1 font-medium">Prueba con otro término o cambia el filtro.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <ImageCard
                key={img.id}
                img={img}
                onRevisar={() => { setSelectedImage(img); setShowModal(true) }}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      {showModal && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="absolute inset-0 bg-[#1e1b4b]/60 backdrop-blur-md" onClick={() => setShowModal(false)} />

          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">

            {/* ── Lado izquierdo: imagen ── */}
            <div className="md:w-3/5 bg-slate-900 flex items-center justify-center relative min-h-[260px]">
              <img
                src={selectedImage.url}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
              {/* ID overlay */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-widest">
                {selectedImage.id}
              </div>
              {/* Fecha overlay */}
              <div className="absolute bottom-5 left-5">
                <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-2xl">
                  <p className="text-[9px] font-black uppercase text-white/50 mb-0.5">Reportado el</p>
                  <p className="text-sm font-bold text-white">{selectedImage.fechaReporte}</p>
                </div>
              </div>
            </div>

            {/* ── Lado derecho: info ── */}
            <div className="md:w-2/5 flex flex-col bg-white overflow-y-auto max-h-[90vh]">

              {/* Header */}
              <div className="p-6 border-b border-[#f3f4f6] flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-[#1e1b4b] leading-tight">Expediente de Revisión</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StatusBadge estado={selectedImage.estado} />
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#f8f6ff] rounded-xl transition-colors flex-shrink-0">
                  <X size={18} className="text-[#6b7280]" />
                </button>
              </div>

              {/* Cuerpo */}
              <div className="flex-1 p-6 space-y-5 overflow-y-auto">

                {/* Motivo del reporte */}
                <Section title="Motivo del Reporte" icon={<Flag size={13} />} accentColor="red">
                  <InfoRow icon={<Flag size={13} />} label="Motivo" value={selectedImage.motivo} highlight />
                  <InfoRow icon={<MessageSquare size={13} />} label="Descripción" value={selectedImage.descripcion} />
                  <InfoRow icon={<User size={13} />} label="Reportado por" value={selectedImage.reportadoPor} />
                  <InfoRow icon={<Calendar size={13} />} label="Fecha" value={selectedImage.fechaReporte} />
                </Section>

                {/* Info del artista */}
                <Section title="Información del Artista" icon={<ImageIcon size={13} />} accentColor="purple">
                  <InfoRow icon={<User size={13} />} label="Artista" value={selectedImage.artistaNombre} />
                  <InfoRow icon={<Hash size={13} />} label="ID del Artista" value={selectedImage.artistaId} />
                  {selectedImage.tipoArtista && (
                    <InfoRow icon={<Eye size={13} />} label="Tipo" value={selectedImage.tipoArtista} />
                  )}
                </Section>

                {/* Resolución si ya fue procesado */}
                {selectedImage.estado !== 'pendiente' && (
                  <div className="bg-[#f8f6ff] p-4 rounded-2xl border border-[#7c3aed1a]">
                    <p className="text-[10px] font-black text-[#8b5cf6] uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <History size={11} /> Resolución Final
                    </p>
                    <p className="text-sm font-bold text-[#1e1b4b] capitalize">Caso {selectedImage.estado}</p>
                    <p className="text-[11px] text-[#9ca3af] mt-1">
                      Moderado por {selectedImage.moderador} · {selectedImage.fechaModificacion}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer acciones */}
              <div className="p-6 border-t border-[#f3f4f6] bg-[#f8f6ff]">
                {selectedImage.estado === 'pendiente' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateEstado(selectedImage.id, 'rechazado')}
                      disabled={processingId === selectedImage.id}
                      className="py-3.5 bg-[#ef4444] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-100 hover:bg-red-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                      {processingId === selectedImage.id
                        ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        : <Ban size={16} />}
                      Eliminar
                    </button>
                    <button
                      onClick={() => updateEstado(selectedImage.id, 'aprobado')}
                      disabled={processingId === selectedImage.id}
                      className="py-3.5 bg-[#7c3aed] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-100 hover:bg-[#6d28d9] transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                      {processingId === selectedImage.id
                        ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        : <Check size={16} />}
                      Mantener
                    </button>
                  </div>
                ) : (
                  <p className={`text-center text-sm font-black ${selectedImage.estado === 'aprobado' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {selectedImage.estado === 'aprobado' ? '✓ Imagen aprobada' : '✗ Imagen eliminada'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Helpers del modal ─────────────────────────────────────────────────────────

function Section({ title, icon, accentColor, children }: {
  title: string
  icon: React.ReactNode
  accentColor: 'red' | 'purple'
  children: React.ReactNode
}) {
  const accent = accentColor === 'red'
    ? { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', dot: 'bg-red-500' }
    : { bg: 'bg-[#f0edff]', border: 'border-[#7c3aed1a]', text: 'text-[#7c3aed]', dot: 'bg-[#7c3aed]' }

  return (
    <div className={`${accent.bg} rounded-2xl p-5 border ${accent.border}`}>
      <div className={`flex items-center gap-2 mb-4 ${accent.text}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
        <p className="text-[10px] font-black uppercase tracking-widest">{title}</p>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value, highlight }: {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="bg-white rounded-xl p-3.5 border border-white flex items-start gap-3 shadow-sm">
      <div className="text-[#c4b5fd] flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-[#9ca3af] uppercase tracking-tight mb-0.5">{label}</p>
        <p className={`text-sm font-bold leading-snug ${highlight ? 'text-[#1e1b4b]' : 'text-[#374151]'}`}>{value}</p>
      </div>
    </div>
  )
}