'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  X, Save, User, Mail, Tag, Briefcase, Instagram, 
  Music, Globe, DollarSign, Camera, AlertCircle, Phone, Star
} from 'lucide-react'

// ─── COMPONENTE SKELETON (Optimizado) ───────────────────────────────────────
function EditArtistSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-start gap-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
        <div className="w-28 h-28 rounded-3xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-4 pt-1">
          <div className="h-3 bg-gray-200 rounded-full w-1/4" />
          <div className="h-10 bg-gray-200 rounded-xl w-full" />
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-200 rounded-xl flex-1" />)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-2 bg-gray-100 rounded-full w-24" />
            <div className="h-10 bg-gray-100 rounded-xl w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── DATA DE CONFIGURACIÓN ──────────────────────────────────────────────────
const CATEGORIAS = ['Mariachi', 'DJ', 'Música', 'Comedia', 'Danza', 'Banda', 'Magia', 'Fotógrafo']
const ESPECIALIDADES: Record<string, string[]> = {
  Mariachi: ['Regional', 'Tradicional', 'Moderno', 'Ranchero'],
  DJ: ['Electrónica', 'House', 'Techno', 'Hip-Hop', 'Reggaetón'],
  Música: ['Boleros', 'Rock', 'Pop', 'Jazz', 'Clásica'],
  Comedia: ['Sátira', 'Stand-up', 'Imitación', 'Humor negro'],
  Danza: ['Folclórica', 'Contemporánea', 'Ballet', 'Hip-Hop', 'Salsa'],
  Banda: ['Sinaloense', 'Duranguense', 'Norteña', 'Tropical'],
  Magia: ['Ilusionismo', 'Close-up', 'Mentalismo', 'Escapismo'],
  Fotógrafo: ['Eventos', 'Retratos', 'Paisajes', 'Documental'],
}

const ESTADO_CONFIG = {
  activo: { label: 'Activo', color: 'bg-[#ecfdf5] text-[#059669] border-emerald-200' },
  'en evento': { label: 'En Evento', color: 'bg-[#eef2ff] text-[#4f46e5] border-indigo-200' },
  inactivo: { label: 'Inactivo', color: 'bg-red-50 text-red-600 border-red-200' },
}

const inputBase = 'w-full px-3.5 py-2.5 bg-white border border-[#e5e7eb] rounded-xl text-sm font-semibold text-[#111827] outline-none transition-all placeholder:text-[#d1d5db] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed15]'

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function EditArtistModal({ isOpen, onClose, artist, onSave }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanged, setHasChanged] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    ...artist,
    email: artist?.id ? `${artist.nombre.toLowerCase().replace(/\s+/g, '.')}@buscart.com` : '',
    descripcion: artist?.descripcion || `Artista de ${artist?.categoria}.`,
    instagram: '', spotify: '', sitioWeb: '',
    tarifaMin: '0', tarifaMax: '0',
    avatarUrl: null as string | null,
  })

  // Control de carga ultra rápido (300ms - punto dulce de velocidad percibida)
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Cierre seguro
  const handleSafeClose = useCallback(() => {
    if (hasChanged) {
      if (window.confirm("Tienes cambios sin guardar. ¿Deseas salir?")) onClose()
    } else {
      onClose()
    }
  }, [hasChanged, onClose])

  // Bloqueo de scroll y tecla ESC
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') handleSafeClose() }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, handleSafeClose])

  if (!isOpen) return null

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
    setHasChanged(true)
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6" 
      style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}
      onClick={handleSafeClose}
    >
      <div 
        className="relative bg-white rounded-2xl w-full max-w-4xl border border-[#f3f4f6] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150"
        style={{ height: '620px' }}
        onClick={e => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#f3f4f6] flex-shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#7c3aed] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7c3aed20]">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#111827]">Editar Perfil Artístico</h2>
              <p className="text-[10px] text-[#9ca3af] font-bold tracking-widest uppercase mt-0.5">Gestión Administrativa</p>
            </div>
          </div>
          <button onClick={handleSafeClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
          {isLoading ? (
            <EditArtistSkeleton />
          ) : (
            <div className="space-y-10 animate-in fade-in duration-300">
              
              {/* SECCIÓN 1: IDENTIDAD */}
              <div className="flex items-start gap-8 p-6 bg-[#f8f6ff] rounded-3xl border border-[#7c3aed10]">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white bg-white shadow-md flex items-center justify-center">
                    {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                    ) : (
                      <span className="text-4xl font-black text-[#7c3aed]">{formData.nombre.charAt(0)}</span>
                    )}
                    <div className="absolute inset-0 bg-[#7c3aed]/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Nombre del Artista</Label>
                    <input 
                      type="text" 
                      value={formData.nombre} 
                      onChange={e => handleChange('nombre', e.target.value)} 
                      className={`${inputBase} ${errors.nombre ? 'border-red-400 bg-red-50' : ''}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    {(Object.keys(ESTADO_CONFIG) as Array<keyof typeof ESTADO_CONFIG>).map(est => (
                      <button
                        key={est}
                        onClick={() => handleChange('estado', est)}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                          formData.estado === est ? ESTADO_CONFIG[est].color : 'bg-white text-gray-400 border-gray-100'
                        }`}
                      >
                        {ESTADO_CONFIG[est].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: CATEGORIZACIÓN */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-1.5 text-left">
                  <Label icon={<Tag size={12}/>}>Categoría</Label>
                  <select 
                    value={formData.categoria} 
                    onChange={e => {
                      const cat = e.target.value;
                      setFormData((p:any) => ({...p, categoria: cat, especialidad: ESPECIALIDADES[cat][0]}));
                      setHasChanged(true);
                    }} 
                    className={inputBase}
                  >
                    {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label icon={<Mail size={12}/>}>Email de Contacto</Label>
                  <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} className={inputBase} />
                </div>
              </div>

              {/* SECCIÓN 3: TARIFAS Y REDES */}
              <div className="grid grid-cols-2 gap-x-10">
                <div className="space-y-4">
                  <SectionLabel label="Tarifas Base (MXN)" />
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <DollarSign size={14} className="absolute left-3 top-3 text-gray-400" />
                      <input type="number" value={formData.tarifaMin} onChange={e => handleChange('tarifaMin', e.target.value)} className={`${inputBase} pl-8`} />
                    </div>
                    <div className="relative flex-1">
                      <DollarSign size={14} className="absolute left-3 top-3 text-gray-400" />
                      <input type="number" value={formData.tarifaMax} onChange={e => handleChange('tarifaMax', e.target.value)} className={`${inputBase} pl-8`} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <SectionLabel label="Enlaces Sociales" />
                  <div className="flex gap-2">
                    <SocialIn icon={<Instagram size={14}/>} value={formData.instagram} onChange={v => handleChange('instagram', v)} />
                    <SocialIn icon={<Music size={14}/>} value={formData.spotify} onChange={v => handleChange('spotify', v)} />
                    <SocialIn icon={<Globe size={14}/>} value={formData.sitioWeb} onChange={v => handleChange('sitioWeb', v)} />
                  </div>
                </div>
              </div>

              {/* BIO */}
              <div className="space-y-3">
                <SectionLabel label="Trayectoria y Biografía" />
                <textarea 
                  rows={3} 
                  value={formData.descripcion} 
                  onChange={e => handleChange('descripcion', e.target.value)}
                  className={`${inputBase} resize-none py-4`}
                />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-8 py-4 border-t border-[#f3f4f6] bg-white flex justify-between items-center flex-shrink-0" style={{ height: '75px' }}>
          <div>
            {!isLoading && hasChanged && (
              <span className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                <AlertCircle size={14} /> Cambios sin guardar
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <button onClick={handleSafeClose} className="px-6 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
              Descartar
            </button>
            <button 
              onClick={() => { onSave(formData); setHasChanged(false); onClose(); }}
              disabled={isLoading}
              className={`flex items-center gap-2 px-10 py-3 bg-[#7c3aed] text-white text-xs font-black rounded-xl shadow-lg transition-all ${isLoading ? 'opacity-50' : 'hover:bg-[#6d28d9] active:scale-95'}`}
            >
              <Save size={16} /> GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HELPERS INTERNOS ────────────────────────────────────────────────────────
function Label({ children, icon }: any) {
  return (
    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
      {icon && <span className="text-[#7c3aed]">{icon}</span>}
      {children}
    </label>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="h-[2px] w-4 bg-[#7c3aed] rounded-full" />
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
    </div>
  )
}

function SocialIn({ icon, value, onChange }: { icon: React.ReactNode; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:bg-white focus-within:border-[#7c3aed] transition-all">
      <div className="text-violet-500">{icon}</div>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent outline-none text-[11px] font-bold" placeholder="Link" />
    </div>
  )
}