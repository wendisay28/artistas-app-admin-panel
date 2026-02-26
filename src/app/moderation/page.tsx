'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import {
  Shield, Check, X, AlertTriangle, Search, Image as ImageIcon,
  Flag, Ban, Clock, History, CheckCircle2, XCircle,
  ChevronRight, Sparkles, User, Hash, Calendar, MessageSquare, ZoomIn
} from 'lucide-react'

// --- Interfaces ---
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

type FilterEstado = 'todos' | 'pendiente' | 'aprobado' | 'rechazado'

// --- Datos de ejemplo ---
const imagenesReportadasData: ImagenReportada[] = [
  {
    id: 'IMG-001',
    url: 'https://images.unsplash.com/photo-1516280440614-37939bb92583?auto=format&fit=crop&q=80&w=1000',
    reportadoPor: 'usuario123',
    motivo: 'Contenido inapropiado',
    descripcion: 'La imagen viola las políticas de la plataforma.',
    fechaReporte: '20 Feb 2026',
    estado: 'pendiente',
    artistaId: 'ART-001',
    artistaNombre: 'María Reyes',
    tipoArtista: 'Cantante'
  },
  {
    id: 'IMG-002',
    url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000',
    reportadoPor: 'usuario456',
    motivo: 'Derechos de autor',
    descripcion: 'Uso de imagen sin permiso explícito.',
    fechaReporte: '19 Feb 2026',
    estado: 'pendiente',
    artistaId: 'ART-002',
    artistaNombre: 'DJ Pulso',
    tipoArtista: 'DJ'
  }
]

const motivoColor: Record<string, string> = {
  'Contenido inapropiado': 'bg-red-50 text-red-600',
  'Derechos de autor': 'bg-orange-50 text-orange-600',
  'Calidad baja': 'bg-slate-100 text-slate-500',
  'Información falsa': 'bg-yellow-50 text-yellow-700',
  'Spam': 'bg-purple-50 text-purple-600',
}

// --- Componente Principal ---
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
    const matchesSearch = img.artistaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          img.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === 'todos' || img.estado === filterEstado
    return matchesSearch && matchesEstado
  })

  const updateEstado = async (id: string, nuevoEstado: ImagenReportada['estado']) => {
    setProcessingId(id)
    await new Promise(r => setTimeout(r, 800))
    setImagenes(prev => prev.map(img => img.id === id ? { ...img, estado: nuevoEstado } : img))
    setProcessingId(null)
    setShowModal(false)
    showToast(nuevoEstado === 'aprobado' ? '✓ Imagen aprobada' : '✗ Imagen eliminada', nuevoEstado === 'aprobado' ? 'success' : 'error')
  }

  const pendientes = imagenes.filter(i => i.estado === 'pendiente').length
  const aprobadas = imagenes.filter(i => i.estado === 'aprobado').length
  const rechazadas = imagenes.filter(i => i.estado === 'rechazado').length

  const filterButtons: { label: string; value: FilterEstado; count: number }[] = [
    { label: 'Todas', value: 'todos', count: imagenes.length },
    { label: 'Pendientes', value: 'pendiente', count: pendientes },
    { label: 'Aprobadas', value: 'aprobado', count: aprobadas },
    { label: 'Rechazadas', value: 'rechazado', count: rechazadas },
  ]

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-16">
      <Header title="Moderación de Contenido" subtitle="Gestión de reportes y seguridad visual" />

      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-bounce font-bold text-sm text-white
          ${toast.type === 'success' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="px-6 py-8 flex flex-col gap-5">
        {/* Stats - Estilo Empresas */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Pendientes</span>
            <span className="text-lg font-bold text-[#1e1b4b]">{pendientes}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Aprobadas</span>
            <span className="text-lg font-bold text-[#059669]">{aprobadas}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
            <span className="text-xs text-[#6b7280] block">Rechazadas</span>
            <span className="text-lg font-bold text-[#dc2626]">{rechazadas}</span>
          </div>
        </div>

        {/* Toolbar - Botones iguales a salas-app */}
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
              placeholder="Buscar reporte..."
              className="pl-11 pr-4 py-2 text-sm bg-white border border-[#e5e7eb] rounded-xl focus:border-[#7c3aed] transition-all outline-none w-[280px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de Imágenes - Más compacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <ImageCard key={img.id} img={img} onRevisar={() => { setSelectedImage(img); setShowModal(true); }} />
          ))}
        </div>
      </div>

      {/* Modal - Mantenemos tu estructura pero afinamos detalles */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 bg-[#1e1b4b]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <div className="md:w-3/5 bg-black flex items-center justify-center relative p-4">
              <img src={selectedImage.url} alt="Preview" className="max-w-full max-h-full object-contain shadow-2xl rounded-lg" />
              <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/10">
                {selectedImage.id}
              </div>
            </div>

            <div className="md:w-2/5 flex flex-col bg-white overflow-y-auto">
              <div className="p-8 border-b border-[#f3f4f6] flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#1e1b4b]">Revisión de Imagen</h2>
                  <p className="text-[10px] text-[#7c3aed] font-black uppercase tracking-widest mt-1">Expediente de Moderación</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
              </div>

              <div className="p-8 space-y-6">
                <SectionHeader title="Detalles del Reporte" />
                <div className="space-y-3">
                  <InfoRow icon={<Flag size={14}/>} label="Motivo" value={selectedImage.motivo} isCritical />
                  <InfoRow icon={<User size={14}/>} label="Artista" value={selectedImage.artistaNombre} />
                  <InfoRow icon={<Calendar size={14}/>} label="Fecha Reporte" value={selectedImage.fechaReporte} />
                  <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-600 leading-relaxed border border-gray-100 italic">
                    "{selectedImage.descripcion}"
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#f8f6ff] border-t mt-auto flex gap-4">
                <button 
                  onClick={() => updateEstado(selectedImage.id, 'aprobado')}
                  className="flex-1 py-4 bg-[#7c3aed] text-white font-bold rounded-2xl hover:bg-[#6d28d9] transition-all flex items-center justify-center gap-2"
                >
                  <Check size={18}/> Mantener
                </button>
                <button 
                  onClick={() => updateEstado(selectedImage.id, 'rechazado')}
                  className="px-8 py-4 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-100 transition-all border border-red-100"
                >
                  <Ban size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Sub-componentes Estilizados ---

function StatCard({ icon, value, label, color, urgent }: any) {
  const colors: any = {
    amber: 'bg-[#fffbeb] text-[#d97706]',
    emerald: 'bg-[#ecfdf5] text-[#059669]',
    red: 'bg-[#fef2f2] text-[#dc2626]'
  }
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#7c3aed1a] shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#1e1b4b] leading-none">{value}</p>
        <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mt-1">{label}</p>
      </div>
      {urgent && <div className="ml-auto w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>}
    </div>
  )
}

function ImageCard({ img, onRevisar }: { img: ImagenReportada; onRevisar: () => void }) {
  return (
    <div className="group bg-white rounded-[2rem] border border-[#e5e7eb] overflow-hidden hover:shadow-2xl transition-all duration-500">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img src={img.url} alt="Reporte" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm
            ${img.estado === 'pendiente' ? 'bg-amber-100 text-amber-700' : 
              img.estado === 'aprobado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {img.estado}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-tighter">{img.motivo}</span>
          <span className="text-[9px] font-medium text-gray-400">{img.id}</span>
        </div>
        <h3 className="font-bold text-[#1e1b4b] text-sm truncate">{img.artistaNombre}</h3>
        <p className="text-[10px] text-gray-500 mt-1 mb-4 flex items-center gap-1"><Clock size={10}/> {img.fechaReporte}</p>
        <button onClick={onRevisar} className="w-full py-2.5 bg-[#f0edff] text-[#7c3aed] rounded-xl font-bold text-xs hover:bg-[#7c3aed] hover:text-white transition-all flex items-center justify-center gap-2">
          Revisar <ChevronRight size={14}/>
        </button>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value, isCritical }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white border border-gray-50 rounded-xl shadow-sm">
      <div className={`${isCritical ? 'text-red-400' : 'text-[#c4b5fd]'} mt-0.5`}>{icon}</div>
      <div>
        <p className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-wider">{label}</p>
        <p className={`text-sm font-bold ${isCritical ? 'text-red-600' : 'text-gray-700'}`}>{value}</p>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-4 bg-[#7c3aed] rounded-full" />
      <h3 className="font-bold text-[#1e1b4b] uppercase text-[10px] tracking-widest">{title}</h3>
    </div>
  )
}