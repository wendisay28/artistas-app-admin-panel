'use client'

import { useState, useEffect } from 'react'
import { 
  X, MapPin, Star, FileText, Mail, Phone, Play, 
  CheckCircle, Clock, XCircle, ImageIcon, AlertTriangle,
  Globe, Instagram, Share2
} from 'lucide-react'

// ─── COMPONENTE SKELETON (Carga visual) ──────────────────────────────────────
function ArtistDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Grid de fotos falso */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl" />
        ))}
      </div>
      {/* Bloque de texto falso */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        <div className="h-3 bg-gray-50 rounded-full w-full" />
        <div className="h-3 bg-gray-50 rounded-full w-2/3" />
      </div>
    </div>
  )
}

// ─── CONFIGURACIÓN DE ESTILOS ────────────────────────────────────────────────
const statusStyles = {
  activo: 'bg-[#ecfdf5] text-[#059669] ring-1 ring-emerald-200',
  'en evento': 'bg-[#eef2ff] text-[#4f46e5] ring-1 ring-indigo-200',
  inactivo: 'bg-red-50 text-red-600 ring-1 ring-red-200',
}

const statusDot = {
  activo: 'bg-emerald-400',
  'en evento': 'bg-indigo-400',
  inactivo: 'bg-red-400',
}

const verificBadge = {
  verificado: { icon: <CheckCircle size={13} />, cls: 'text-emerald-600 bg-emerald-50 ring-1 ring-emerald-200', label: 'Verificado' },
  pendiente: { icon: <Clock size={13} />, cls: 'text-amber-600 bg-amber-50 ring-1 ring-amber-200', label: 'Pendiente' },
  no_verificado: { icon: <XCircle size={13} />, cls: 'text-gray-400 bg-gray-100 ring-1 ring-gray-200', label: 'Sin verificar' },
  rechazado: { icon: <XCircle size={13} />, cls: 'text-red-500 bg-red-50 ring-1 ring-red-200', label: 'Rechazado' },
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function ArtistDetailModal({ isOpen, onClose, artist }: any) {
  const [activeTab, setActiveTab] = useState<'fotos' | 'videos' | 'blogs'>('fotos')
  const [isLoading, setIsLoading] = useState(true)

  // Simulación de carga cada vez que se abre para un nuevo artista
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, artist?.id])

  if (!isOpen) return null

  const verific = verificBadge[artist.verificacion as keyof typeof verificBadge] || verificBadge.no_verificado

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6" 
      style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-4xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
        style={{ height: '620px' }}
        onClick={e => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="px-8 py-5 border-b border-[#f3f4f6] flex justify-between items-center bg-white flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-violet-200 ${isLoading ? 'bg-gray-200 animate-pulse' : ''}`}
                 style={{ background: !isLoading ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '' }}>
              {!isLoading && artist.nombre.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-base font-black text-gray-900 tracking-tight">{artist.nombre}</h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${statusStyles[artist.estado as keyof typeof statusStyles]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[artist.estado as keyof typeof statusDot]}`} />
                  {artist.estado}
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {artist.categoria} <span className="text-gray-300 mx-1">/</span> {artist.especialidad}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* SUB-HEADER: DATOS RÁPIDOS */}
        <div className="px-8 py-3 bg-[#fafaff] border-b border-[#f3f4f6] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-500">
              <Star size={14} fill="#f59e0b" strokeWidth={0} /> {artist.calificacion} Rating
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
              <MapPin size={14} className="text-violet-400" /> {artist.ubicacion}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase ${verific.cls} px-2.5 py-1 rounded-lg`}>
              {verific.icon} {verific.label}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="px-8 flex gap-2 border-b border-gray-100 bg-white flex-shrink-0">
          {[
            { id: 'fotos', label: 'Portafolio', icon: <ImageIcon size={14} /> },
            { id: 'videos', label: 'Videos', icon: <Play size={14} /> },
            { id: 'blogs', label: 'Publicaciones', icon: <FileText size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              disabled={isLoading}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative py-4 px-4 text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'text-violet-600' : 'text-gray-400 hover:text-gray-600'
              } ${isLoading ? 'opacity-50' : ''}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {isLoading ? (
            <ArtistDetailSkeleton />
          ) : (
            <div className="animate-in fade-in duration-500">
              {activeTab === 'fotos' && (
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="aspect-[4/5] rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center group cursor-pointer hover:border-violet-200 hover:shadow-lg transition-all relative overflow-hidden">
                      <ImageIcon size={28} strokeWidth={1} className="text-gray-300 group-hover:text-violet-400 transition-colors" />
                      <span className="text-[8px] font-bold text-gray-300 group-hover:text-violet-500 mt-2 uppercase tracking-widest">Ver Obra</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="aspect-video rounded-3xl bg-[#f0edff] border border-violet-100 flex items-center justify-center group cursor-pointer relative overflow-hidden">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={18} fill="#7c3aed" strokeWidth={0} className="ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'blogs' && (
                <div className="max-w-2xl mx-auto space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-6 rounded-3xl border border-gray-100 bg-[#fafafa] hover:bg-white hover:border-violet-100 transition-all cursor-pointer group">
                      <div className="h-4 w-full bg-gray-200 rounded-lg group-hover:bg-violet-50 mb-2" />
                      <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-8 py-4 bg-gray-50 border-t border-[#f3f4f6] flex justify-between items-center flex-shrink-0" style={{ height: '75px' }}>
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-8 py-2.5 bg-[#7c3aed] text-white text-xs font-black rounded-xl hover:bg-[#6d28d9] transition-all shadow-lg shadow-violet-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}>
              <Mail size={14} /> CONTACTAR AHORA
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95">
              <Phone size={14} /> VER TELÉFONO
            </button>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-mono font-bold text-gray-300">REF: {artist.id}</span>
            <button className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-[0.15em] transition-colors">
              <AlertTriangle size={14} /> Suspender
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}