'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  X, Shield, CheckCircle2, XCircle, ExternalLink,
  Download, User, Calendar, Hash, FileCheck,
  Landmark, ZoomIn, RotateCcw,
} from 'lucide-react'

// ─── COMPONENTE SKELETON (Visual de carga) ───────────────────────────────────
function KYCSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-100 rounded w-24" />
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-100 rounded" />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex gap-6 px-6">
        {/* Left Column - Document Viewer */}
        <div className="flex-1 space-y-4" style={{ width: '60%' }}>
          <div className="h-96 bg-gray-100 rounded-xl" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex-1 h-20 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="h-3 bg-gray-100 rounded w-20" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-50 rounded-lg" />
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-3 bg-gray-100 rounded w-24" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-9 bg-gray-50 rounded-lg border border-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="h-20 bg-gray-50 border-t border-gray-100" />
    </div>
  )
}

// ─── TIPOS ───────────────────────────────────────────────────────────────────
interface KYCUser {
  id: string
  nombre: string
  verificacion: 'pendiente' | 'verificado' | 'rechazado' | 'no_verificado'
  aprobadoPor?: string
  fechaAprobacion?: string
  motivoRechazo?: string
}

interface KYCModalProps {
  isOpen: boolean
  onClose: () => void
  user: KYCUser
}

// ─── CONSTANTES ──────────────────────────────────────────────────────────────
const REJECTION_REASONS = [
  'Documento ilegible',
  'Selfie no coincide',
  'RUT vencido',
  'Imagen borrosa',
  'Documento falso',
  'Info incorrecta',
]

const CHECKLIST_ITEMS = [
  'Cédula frontal legible',
  'Cédula reverso legible',
  'Selfie coincide con documento',
  'RUT vigente y válido',
]

const DOCUMENTS = [
  {
    id: 'front',
    label: 'Cédula Frontal',
    sublabel: 'Lado A',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?q=80&w=800',
  },
  {
    id: 'back',
    label: 'Cédula Reverso',
    sublabel: 'Lado B',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1589156226687-a48ba9795ee3?q=80&w=800',
  },
  {
    id: 'selfie',
    label: 'Selfie con Cédula',
    sublabel: 'Verificación facial',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
  },
  {
    id: 'rut',
    label: 'RUT',
    sublabel: 'Documento legal',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    filename: 'RUT_Septiembre_2025.pdf',
  },
]

const statusConfig = {
  pendiente: {
    label: 'Pendiente',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: true,
    modalBorder: 'border-amber-200',
  },
  no_verificado: {
    label: 'Sin verificar',
    badge: 'bg-gray-100 text-gray-500 border border-gray-200',
    dot: false,
    modalBorder: 'border-[#e5e7eb]',
  },
  verificado: {
    label: 'Verificado',
    badge: 'bg-[#ecfdf5] text-[#059669] border border-emerald-200',
    dot: false,
    modalBorder: 'border-emerald-200',
  },
  rechazado: {
    label: 'Rechazado',
    badge: 'bg-red-50 text-red-600 border border-red-200',
    dot: false,
    modalBorder: 'border-red-200',
  },
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function KYCModal({ isOpen, onClose, user }: KYCModalProps) {
  const [activeDoc, setActiveDoc] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectionText, setRejectionText] = useState('')
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Control de carga (200ms - más rápido pero visible)
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen, user.id])

  // Atajos de teclado para navegación
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveDoc((prev) => (prev + 1) % DOCUMENTS.length)
      setZoomed(false)
    }
    if (e.key === 'ArrowLeft') {
      setActiveDoc((prev) => (prev - 1 + DOCUMENTS.length) % DOCUMENTS.length)
      setZoomed(false)
    }
    if (e.key === 'Escape' && !isRejecting) onClose()
  }, [isRejecting, onClose])

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const isPending = user.verificacion === 'pendiente' || user.verificacion === 'no_verificado'
  const isVerified = user.verificacion === 'verificado'
  const isRejectedState = user.verificacion === 'rechazado'
  const currentDoc = DOCUMENTS[activeDoc]
  const status = statusConfig[user.verificacion]
  const allChecked = checkedItems.length === CHECKLIST_ITEMS.length

  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  const toggleChecklist = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" 
         style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }} 
         onClick={!isRejecting ? onClose : undefined}>

      <div
        className={`relative bg-white rounded-2xl w-full max-w-4xl border shadow-2xl shadow-[#7c3aed15] flex flex-col overflow-hidden transition-all ${status.modalBorder}`}
        style={{ height: '620px' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center shadow-md shadow-[#7c3aed30]">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#111827]">{user.nombre}</h2>
                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${status.badge}`}>
                  {status.dot && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                  {status.label}
                </span>
              </div>
              <p className="text-[10px] text-[#9ca3af] font-medium tracking-widest uppercase mt-0.5">
                Verificación KYC · {user.id}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#6b7280] transition-all">
            <X size={18} />
          </button>
        </div>

        {/* ── BODY ── */}
        {isLoading ? (
          <KYCSkeleton />
        ) : (
          <div className="flex flex-1 overflow-hidden">

            {/* ─── COL IZQUIERDA: VISOR ─── */}
            <div className="flex flex-col border-r border-[#f3f4f6] flex-shrink-0" style={{ width: '60%' }}>
              
              <div className="flex-1 relative bg-[#f8f6ff] m-4 mb-3 rounded-xl overflow-hidden flex items-center justify-center group" style={{ minHeight: 0 }}>
                {currentDoc.type === 'image' ? (
                  <>
                    <img
                      src={currentDoc.src!}
                      alt={currentDoc.label}
                      className="max-w-full max-h-full object-contain rounded-lg select-none"
                      style={{
                        transform: zoomed ? 'scale(1.8)' : 'scale(1)',
                        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                        cursor: zoomed ? 'zoom-out' : 'zoom-in',
                      }}
                      onClick={() => setZoomed(!zoomed)}
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setZoomed(!zoomed)} className="p-2 rounded-lg bg-white text-[#7c3aed] shadow-lg border border-[#e5e7eb]">
                        <ZoomIn size={14} />
                      </button>
                      {zoomed && (
                        <button onClick={() => setZoomed(false)} className="p-2 rounded-lg bg-white text-[#6b7280] shadow-lg border border-[#e5e7eb]">
                          <RotateCcw size={14} />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#f8f6ff] rounded-xl overflow-hidden">
                    {/* iframe para previsualización del PDF */}
                    <iframe
                      src={currentDoc.src!}
                      className="w-full h-full border-0 rounded-lg"
                      title="Previsualización del RUT"
                      style={{
                        transform: zoomed ? 'scale(1.2)' : 'scale(1)',
                        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                        cursor: zoomed ? 'zoom-out' : 'zoom-in',
                      }}
                      onClick={() => setZoomed(!zoomed)}
                    />
                    
                    {/* Controles de zoom para PDF */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setZoomed(!zoomed)} className="p-2 rounded-lg bg-white text-[#7c3aed] shadow-lg border border-[#e5e7eb]">
                        <ZoomIn size={14} />
                      </button>
                      {zoomed && (
                        <button onClick={() => setZoomed(false)} className="p-2 rounded-lg bg-white text-[#6b7280] shadow-lg border border-[#e5e7eb]">
                          <RotateCcw size={14} />
                        </button>
                      )}
                      <button className="p-2 rounded-lg bg-white text-[#7c3aed] shadow-lg border border-[#e5e7eb] hover:bg-[#f0edff]">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg border border-[#e5e7eb] shadow-sm">
                  <p className="text-[10px] font-black text-[#1e1b4b] uppercase tracking-widest">{currentDoc.label}</p>
                  <p className="text-[9px] text-[#9ca3af]">{currentDoc.sublabel}</p>
                </div>
              </div>

              {/* Thumbnails con navegación */}
              <div className="flex gap-2 px-4 pb-4">
                {DOCUMENTS.map((doc, i) => (
                  <button
                    key={doc.id}
                    onClick={() => { setActiveDoc(i); setZoomed(false) }}
                    className={`flex-1 rounded-xl overflow-hidden transition-all border-2 ${activeDoc === i ? 'border-[#7c3aed] scale-[1.02]' : 'border-[#e5e7eb]'}`}
                  >
                    <div className="aspect-[4/3] bg-[#f9fafb] flex items-center justify-center overflow-hidden relative">
                      {doc.type === 'image' ? (
                        <img src={doc.src!} className={`w-full h-full object-cover ${activeDoc !== i && 'grayscale brightness-90'}`} />
                      ) : (
                        <div className="relative w-full h-full bg-[#f8f6ff] flex items-center justify-center">
                          {/* Simulación de documento PDF */}
                          <div className="w-3/4 h-4/5 bg-white rounded shadow-sm border border-[#e5e7eb] flex flex-col items-center justify-center">
                            <div className="w-8 h-8 bg-[#7c3aed] rounded flex items-center justify-center mb-1">
                              <Landmark size={14} className="text-white" />
                            </div>
                            <div className="w-10 h-0.5 bg-gray-300 rounded mb-0.5"></div>
                            <div className="w-8 h-0.5 bg-gray-200 rounded mb-0.5"></div>
                            <div className="w-9 h-0.5 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={`text-[8px] font-bold uppercase py-1 bg-white ${activeDoc === i ? 'text-[#7c3aed]' : 'text-[#9ca3af]'}`}>{doc.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ─── COL DERECHA: INFO + ACCIONES ─── */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
                <div>
                  <SectionLabel label="Datos del artista" />
                  <div className="mt-3 bg-[#f9fafb] rounded-xl border border-[#f3f4f6] divide-y divide-[#f3f4f6]">
                    <MetaRow icon={<User size={12} />} label="Nombre" value={user.nombre} />
                    <MetaRow icon={<Hash size={12} />} label="ID" value={user.id} />
                    <MetaRow icon={<Hash size={12} />} label="Nº Documento" value="1020304050" />
                    <MetaRow icon={<Calendar size={12} />} label="Enviado el" value="24 Feb 2026" />
                  </div>
                </div>

                {isPending && (
                  <div>
                    <SectionLabel label="Lista de revisión técnica" />
                    <div className="mt-3 space-y-2">
                      {CHECKLIST_ITEMS.map(item => (
                        <label 
                          key={item} 
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${checkedItems.includes(item) ? 'bg-emerald-50 border-emerald-100' : 'bg-[#f9fafb] border-[#f3f4f6] hover:bg-white'}`}
                        >
                          <input 
                            type="checkbox" 
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleChecklist(item)}
                            className="w-4 h-4 rounded border-[#d1d5db] text-[#7c3aed] focus:ring-[#7c3aed]" 
                          />
                          <span className={`text-xs font-medium ${checkedItems.includes(item) ? 'text-emerald-700' : 'text-[#6b7280]'}`}>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {(isVerified || isRejectedState) && (
                  <div className={`rounded-xl p-4 border ${isVerified ? 'bg-[#ecfdf5] border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isVerified ? <CheckCircle2 size={15} className="text-[#059669]" /> : <XCircle size={15} className="text-red-500" />}
                      <span className={`text-xs font-bold uppercase tracking-wider ${isVerified ? 'text-[#059669]' : 'text-red-600'}`}>
                        {isVerified ? 'Artista verificado' : 'Solicitud rechazada'}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      {isVerified ? `Validado exitosamente por el equipo de BuscArt.` : `Motivo: ${user.motivoRechazo || 'Incumplimiento de requisitos.'}`}
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER ACCIONES */}
              <div className="px-5 py-4 border-t border-[#f3f4f6] bg-white h-[120px] flex flex-col justify-center">
                {isPending && !isRejecting && (
                  <div className="space-y-2">
                    <button 
                      disabled={!allChecked}
                      className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm ${allChecked ? 'bg-[#059669] text-white hover:bg-[#047857]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      <FileCheck size={14} /> {allChecked ? 'Aprobar artista' : 'Complete la lista'}
                    </button>
                    <button onClick={() => setIsRejecting(true)} className="w-full py-2 rounded-xl text-xs font-bold uppercase text-red-400 hover:bg-red-50 transition-all">
                      Rechazar solicitud
                    </button>
                  </div>
                )}

                {isPending && isRejecting && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {REJECTION_REASONS.map(reason => (
                        <button
                          key={reason}
                          onClick={() => toggleChip(reason)}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase border transition-all ${selectedChips.includes(reason) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={rejectionText}
                        onChange={e => setRejectionText(e.target.value)}
                        placeholder="Nota adicional..."
                        className="flex-1 px-3 py-2 rounded-lg text-xs border border-red-100 bg-red-50/30 outline-none focus:border-red-300"
                      />
                      <button className="px-4 py-2 rounded-lg text-xs font-black text-white bg-red-600 hover:bg-red-700 disabled:opacity-50">CONFIRMAR</button>
                      <button onClick={() => setIsRejecting(false)} className="p-2 rounded-lg bg-gray-100 text-gray-400"><X size={14} /></button>
                    </div>
                  </div>
                )}

                {!isPending && (
                  <p className="text-xs text-[#9ca3af] text-center">
                    Expediente cerrado. <span className="text-[#7c3aed] font-bold hover:underline cursor-pointer">Reabrir caso</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MICRO COMPONENTES ────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-1 rounded-full bg-[#7c3aed]" />
      <span className="text-[10px] font-black text-[#6b7280] uppercase tracking-[0.2em]">{label}</span>
    </div>
  )
}

function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-2 text-[#9ca3af]">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-xs font-bold text-[#374151]">{value}</span>
    </div>
  )
}