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
  History
} from 'lucide-react'

// Interface para Imagen Reportada
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
}

// Datos de ejemplo
const imagenesReportadasData: ImagenReportada[] = [
  {
    id: 'IMG-001',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario123',
    motivo: 'Contenido inapropiado',
    descripcion: 'La imagen contiene contenido que viola las políticas de la plataforma',
    fechaReporte: '2026-02-20',
    estado: 'pendiente',
    artistaId: 'ART-001',
    artistaNombre: 'María Reyes'
  },
  {
    id: 'IMG-002',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario456',
    motivo: 'Derechos de autor',
    descripcion: 'La imagen parece ser propiedad de otro artista sin permiso',
    fechaReporte: '2026-02-19',
    estado: 'pendiente',
    artistaId: 'ART-002',
    artistaNombre: 'DJ Pulso'
  },
  {
    id: 'IMG-003',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario789',
    motivo: 'Calidad baja',
    descripcion: 'La imagen es de muy baja calidad y no representa bien al artista',
    fechaReporte: '2026-02-18',
    estado: 'aprobado',
    moderador: 'admin@buscart.com',
    fechaModificacion: '2026-02-18',
    artistaId: 'ART-003',
    artistaNombre: 'Trío Elegance'
  },
  {
    id: 'IMG-004',
    url: '/api/placeholder/400/300',
    reportadoPor: 'usuario321',
    motivo: 'Información falsa',
    descripcion: 'La imagen no corresponde con la información del perfil',
    fechaReporte: '2026-02-17',
    estado: 'rechazado',
    moderador: 'admin@buscart.com',
    fechaModificacion: '2026-02-17',
    artistaId: 'ART-004',
    artistaNombre: 'Stand-up Rojas'
  }
]

// --- COMPONENTE STATCARD ---
function StatCard({ title, value, icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-[4rem] flex items-start justify-end p-6 opacity-40 group-hover:scale-110 transition-transform`}>
        <div className={color}>{icon}</div>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <h3 className={`text-3xl font-black ${color} mb-2`}>{value}</h3>
    </div>
  )
}

export default function ModeracionPage() {
  const [imagenes, setImagenes] = useState<ImagenReportada[]>(imagenesReportadasData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [selectedImage, setSelectedImage] = useState<ImagenReportada | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredImages = imagenes.filter(img => {
    const matchesSearch = img.artistaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.reportadoPor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filtroEstado === 'todos' || img.estado === filtroEstado
    return matchesSearch && matchesEstado
  })

  const updateEstado = (id: string, nuevoEstado: ImagenReportada['estado']) => {
    setImagenes(prev => prev.map(img => img.id === id ? { 
      ...img, 
      estado: nuevoEstado, 
      fechaModificacion: new Date().toISOString().split('T')[0],
      moderador: 'admin@buscart.com'
    } : img))
    setShowDetailModal(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Moderación de Contenido" subtitle="Protege la integridad visual de BuscArt" />

      <main className="p-8 space-y-8">
        {/* Dashboard de Moderación Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Pendientes de Revisión" value={imagenes.filter(i => i.estado === 'pendiente').length} icon={<Clock className="text-amber-500"/>} color="text-amber-600" bgColor="bg-amber-50" />
          <StatCard title="Total Procesadas" value={imagenes.filter(i => i.estado !== 'pendiente').length} icon={<Check className="text-emerald-500"/>} color="text-emerald-600" bgColor="bg-emerald-50" />
          <StatCard title="Reportes Críticos" value={2} icon={<AlertTriangle className="text-red-500"/>} color="text-red-600" bgColor="bg-red-50" />
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white/70 backdrop-blur-md p-4 rounded-[24px] border border-[#7c3aed1a] flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b5cf6]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID de imagen o nombre de entidad..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-[#7c3aed1a] rounded-xl outline-none focus:ring-4 focus:ring-[#7c3aed0d] transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 bg-white border border-[#7c3aed1a] rounded-xl text-sm font-bold text-[#4c1d95] outline-none cursor-pointer"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobado">Aprobados</option>
            <option value="rechazado">Rechazados</option>
          </select>
        </div>

        {/* Grid de Evidencias */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="group bg-white rounded-[28px] border border-[#7c3aed1a] overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Preview con Badge de Reportes */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img src={img.url} alt="Evidencia" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center gap-1 animate-pulse">
                    <Flag size={10} fill="white"/> REPORTADO
                  </span>
                </div>
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md border ${
                  img.estado === 'pendiente' ? 'bg-amber-500/90 text-white border-amber-400' : 
                  img.estado === 'aprobado' ? 'bg-emerald-500/90 text-white border-emerald-400' : 'bg-slate-700/90 text-white border-slate-600'
                }`}>
                  {img.estado}
                </div>
              </div>

              {/* Info de la Tarjeta */}
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="font-extrabold text-[#1e1b4b] truncate">{img.artistaNombre}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#f8f6ff] text-[#7c3aed] rounded-md uppercase tracking-wider">{img.motivo}</span>
                    <span className="text-[10px] text-slate-400 font-medium">ID: {img.id}</span>
                  </div>
                </div>

                <button 
                  onClick={() => { setSelectedImage(img); setShowDetailModal(true); }}
                  className="w-full py-2.5 rounded-xl bg-[#f8f6ff] text-[#7c3aed] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#7c3aed] hover:text-white transition-all border border-[#7c3aed1a]"
                >
                  <Shield size={14} /> Revisar Caso
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE DETALLE */}
      {showDetailModal && selectedImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-[#1e1b4b]/60 backdrop-blur-md" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white w-full max-w-6xl h-full max-h-[800px] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            
            {/* Lado Izquierdo: Visualizador de Imagen */}
            <div className="md:w-3/5 bg-slate-900 flex items-center justify-center relative p-4">
              <img src={selectedImage.url} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
              <div className="absolute bottom-6 left-6 flex gap-3">
                 <div className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 text-white">
                    <p className="text-[10px] font-black uppercase text-white/60">Reportado el</p>
                    <p className="text-sm font-bold">{selectedImage.fechaReporte}</p>
                 </div>
              </div>
            </div>

            {/* Lado Derecho: Contexto y Reportes */}
            <div className="md:w-2/5 p-8 flex flex-col bg-white overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black text-[#1e1b4b]">Expediente de Revisión</h2>
                  <p className="text-sm text-[#8b5cf6] font-medium">Artista: {selectedImage.artistaNombre}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
              </div>

              {/* Información del Reporte */}
              <div className="flex-1 space-y-6">
                <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
                  <h4 className="text-red-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Flag size={14}/> Motivo del Reporte
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-red-50">
                      <p className="text-sm font-medium text-red-600 mb-1">Motivo:</p>
                      <p className="text-sm text-[#1e1b4b]">{selectedImage.motivo}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-red-50">
                      <p className="text-sm font-medium text-red-600 mb-1">Descripción:</p>
                      <p className="text-sm text-[#1e1b4b]">{selectedImage.descripcion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-red-50">
                      <p className="text-sm font-medium text-red-600 mb-1">Reportado por:</p>
                      <p className="text-sm text-[#1e1b4b]">{selectedImage.reportadoPor}</p>
                    </div>
                  </div>
                </div>

                {/* Información del Artista */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                  <h4 className="text-slate-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                    <ImageIcon size={14}/> Información del Artista
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-50">
                      <p className="text-sm font-medium text-slate-600 mb-1">Artista:</p>
                      <p className="text-sm text-[#1e1b4b]">{selectedImage.artistaNombre}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-50">
                      <p className="text-sm font-medium text-slate-600 mb-1">ID del Artista:</p>
                      <p className="text-sm text-[#1e1b4b]">{selectedImage.artistaId}</p>
                    </div>
                  </div>
                </div>

                {/* Footer de Acciones */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  {selectedImage.estado === 'pendiente' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => updateEstado(selectedImage.id, 'rechazado')}
                        className="py-4 bg-red-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
                      >
                        <Ban size={18}/> Eliminar
                      </button>
                      <button 
                        onClick={() => updateEstado(selectedImage.id, 'aprobado')}
                        className="py-4 bg-[#7c3aed] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-100 hover:bg-[#6d28d9] transition-all"
                      >
                        <Check size={18}/> Mantener
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><History size={10}/> Resolución Final</p>
                      <p className="text-sm font-bold text-[#1e1b4b]">Caso {selectedImage.estado}</p>
                      <p className="text-[10px] text-[#8b5cf6] mt-2">Moderado por: {selectedImage.moderador} el {selectedImage.fechaModificacion}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
