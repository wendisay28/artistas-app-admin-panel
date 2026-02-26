'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Megaphone, Edit, Eye, Upload, Calendar, Target, 
  Zap, X, Check, ExternalLink, MousePointer2, Image as LucideImage 
} from 'lucide-react'

// --- Interfaces ---
interface Banner {
  id: string
  posicion: 'principal' | 'secundario' | 'terciario'
  titulo: string
  descripcion: string
  imagen: string
  enlace: string
  estado: 'activo' | 'inactivo' | 'programado'
  fechaInicio?: string
  fechaFin?: string
  clicks: number
  impresiones: number
  ctr: number
  creado: string
}

// --- Datos de Ejemplo ---
const bannersData: Banner[] = [
  {
    id: 'B-001',
    posicion: 'principal',
    titulo: 'Festival de Mariachi 2026',
    descripcion: 'Los mejores grupos de mariachi del norte en un solo evento profesional.',
    imagen: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000',
    enlace: '/eventos/festival-mariachi-2026',
    estado: 'activo',
    clicks: 1250,
    impresiones: 15420,
    ctr: 8.11,
    creado: '2026-01-15'
  },
  {
    id: 'B-002',
    posicion: 'secundario',
    titulo: 'DJ Pulso - Noche Electrónica',
    descripcion: 'Promoción especial para el lanzamiento del nuevo tour.',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
    enlace: '/artists/dj-pulso',
    estado: 'activo',
    clicks: 890,
    impresiones: 12300,
    ctr: 7.24,
    creado: '2026-01-20'
  }
]

export default function PublicidadPage() {
  const [banners, setBanners] = useState<Banner[]>(bannersData)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  
  const stats = {
    total: banners.length,
    activos: banners.filter(b => b.estado === 'activo').length,
    totalClicks: banners.reduce((acc, b) => acc + b.clicks, 0),
    avgCTR: banners.length > 0 ? (banners.reduce((acc, b) => acc + b.ctr, 0) / banners.length).toFixed(2) : 0
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-16">
      <Header title="Publicidad" subtitle="Campañas y Banners Promocionales" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Estadísticas - Estilo Users con iconos */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Megaphone size={16} />
            </div>
            <div>
              <span className="text-xs text-[#6b7280] block">Total Banners</span>
              <span className="text-lg font-bold text-[#1e1b4b]">{stats.total}</span>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Zap size={16} />
            </div>
            <div>
              <span className="text-xs text-[#6b7280] block">Activos</span>
              <span className="text-lg font-bold text-[#059669]">{stats.activos}</span>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <MousePointer2 size={16} />
            </div>
            <div>
              <span className="text-xs text-[#6b7280] block">Clicks</span>
              <span className="text-lg font-bold text-[#1e1b4b]">{stats.totalClicks.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Target size={16} />
            </div>
            <div>
              <span className="text-xs text-[#6b7280] block">CTR</span>
              <span className="text-lg font-bold text-[#1e1b4b]">{stats.avgCTR}%</span>
            </div>
          </div>
        </div>

        {/* Header de sección y Acción */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#1e1b4b] flex items-center gap-2">
            Inventario de Banners 
            <span className="text-xs font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">{banners.length}</span>
          </h2>
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 bg-[#7c3aed] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#7c3aed30] hover:bg-[#6d28d9] transition-all flex items-center gap-2"
          >
            <Upload size={16} /> Nuevo Banner
          </button>
        </div>

        {/* Lista de Banners - Más compacto */}
        <div className="grid grid-cols-1 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="group bg-white rounded-2xl border border-[#7c3aed10] hover:border-[#7c3aed40] p-4 transition-all flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md">
              
              <div className="w-full md:w-48 h-28 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
                <img src={banner.imagen} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Eye className="text-white" size={20} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                    banner.posicion === 'principal' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {banner.posicion}
                  </span>
                  <span className={`text-[9px] font-bold uppercase ${banner.estado === 'activo' ? 'text-emerald-500' : 'text-gray-400'}`}>
                    • {banner.estado}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1e1b4b] truncate">{banner.titulo}</h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">{banner.descripcion}</p>
                <div className="flex items-center gap-3 mt-3">
                   <a href={banner.enlace} target="_blank" className="text-[10px] font-bold text-[#7c3aed] flex items-center gap-1 hover:underline">
                     <ExternalLink size={10}/> Ver Enlace
                   </a>
                </div>
              </div>

              {/* Solución al error de cssConflict: usamos hidden md:flex */}
              <div className="hidden lg:flex gap-8 px-6 border-x border-gray-50">
                <Metric mini label="Clicks" value={banner.clicks} />
                <Metric mini label="Impresiones" value={banner.impresiones} />
                <Metric mini label="CTR" value={`${banner.ctr}%`} highlight />
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingBanner(banner)}
                  className="p-2.5 text-gray-400 hover:text-[#7c3aed] hover:bg-[#f0edff] rounded-xl transition-all"
                >
                  <Edit size={18} />
                </button>
                <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {(showModal || editingBanner) && (
        <div className="fixed inset-0 bg-[#1e1b4b]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-xl w-full p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#1e1b4b]">
                  {editingBanner ? 'Editar Banner' : 'Configurar Banner'}
                </h3>
                <p className="text-xs text-gray-400 font-medium">Completa los detalles de la campaña</p>
              </div>
              <button 
                onClick={() => { setShowModal(false); setEditingBanner(null); }} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Ubicación</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all appearance-none">
                    <option>Principal</option>
                    <option>Secundario</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Estado</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all appearance-none">
                    <option>Activo</option>
                    <option>Programado</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Título de Campaña</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all" defaultValue={editingBanner?.titulo} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">URL Imagen</label>
                <div className="relative">
                  {/* Corregido: Usando LucideImage en lugar de ImageIcon */}
                  <LucideImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all" defaultValue={editingBanner?.imagen} />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowModal(false); setEditingBanner(null); }} 
                  className="flex-1 py-4 text-gray-400 font-bold text-sm hover:bg-gray-50 rounded-2xl transition-all"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-[2] py-4 bg-[#7c3aed] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#7c3aed30] hover:bg-[#6d28d9] transition-all flex items-center justify-center gap-2">
                  <Check size={18} /> {editingBanner ? 'Guardar Cambios' : 'Crear Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const colors: any = {
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600'
  }
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#7c3aed0a] flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-xl font-bold text-[#1e1b4b] leading-none">{value}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{label}</p>
      </div>
    </div>
  )
}

function Metric({ label, value, highlight, mini }: any) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">{label}</p>
      <p className={`font-bold ${mini ? 'text-sm' : 'text-lg'} ${highlight ? 'text-[#10b981]' : 'text-[#1e1b4b]'}`}>
        {value}
      </p>
    </div>
  )
}