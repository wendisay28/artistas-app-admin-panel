'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Megaphone, Edit, Eye, Upload, Calendar, Clock, Target, Zap, Image as ImageIcon, X, Check } from 'lucide-react'

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
  actualizado: string
}

const bannersData: Banner[] = [
  {
    id: 'B-001',
    posicion: 'principal',
    titulo: 'Festival de Mariachi 2026',
    descripcion: 'Los mejores grupos de mariachi del norte en un solo evento',
    imagen: '/api/placeholder/800/400',
    enlace: '/eventos/festival-mariachi-2026',
    estado: 'activo',
    clicks: 1250,
    impresiones: 15420,
    ctr: 8.11,
    creado: '2026-01-15',
    actualizado: '2026-02-20'
  },
  {
    id: 'B-002',
    posicion: 'secundario',
    titulo: 'DJ Pulso - Noche Electrónica',
    descripcion: 'La mejor música electrónica con el DJ más reconocido',
    imagen: '/api/placeholder/600/300',
    enlace: '/artistas/dj-pulso',
    estado: 'activo',
    clicks: 890,
    impresiones: 12300,
    ctr: 7.24,
    creado: '2026-01-20',
    actualizado: '2026-02-18'
  },
  {
    id: 'B-003',
    posicion: 'terciario',
    titulo: 'Trío Elegance',
    descripcion: 'Música romántica para tus momentos especiales',
    imagen: '/api/placeholder/400/200',
    enlace: '/artistas/trio-elegance',
    estado: 'programado',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-03-31',
    clicks: 0,
    impresiones: 0,
    ctr: 0,
    creado: '2026-02-10',
    actualizado: '2026-02-10'
  },
  {
    id: 'B-004',
    posicion: 'secundario',
    titulo: 'Stand-up Comedy Night',
    descripcion: 'Ríe hasta no poder con los mejores comediantes',
    imagen: '/api/placeholder/600/300',
    enlace: '/eventos/stand-up-comedy',
    estado: 'inactivo',
    clicks: 450,
    impresiones: 8900,
    ctr: 5.06,
    creado: '2026-01-25',
    actualizado: '2026-02-15'
  }
]

export default function PublicidadPage() {
  const [banners, setBanners] = useState<Banner[]>(bannersData)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    posicion: 'secundario' as Banner['posicion'],
    titulo: '',
    descripcion: '',
    imagen: '',
    enlace: '',
    estado: 'activo' as Banner['estado'],
    fechaInicio: '',
    fechaFin: ''
  })

  const filteredBanners = banners.filter(banner => {
    if (editingBanner) return banner.id === editingBanner.id
    return true
  })

  const stats = {
    total: banners.length,
    activos: banners.filter(b => b.estado === 'activo').length,
    totalClicks: banners.reduce((acc, b) => acc + b.clicks, 0),
    totalImpresiones: banners.reduce((acc, b) => acc + b.impresiones, 0),
    avgCTR: banners.length > 0 ? banners.reduce((acc, b) => acc + b.ctr, 0) / banners.length : 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingBanner) {
      setBanners(prev => prev.map(b => 
        b.id === editingBanner.id 
          ? { ...b, ...formData, actualizado: new Date().toISOString().split('T')[0] }
          : b
      ))
    } else {
      const newBanner: Banner = {
        id: `B-${String(banners.length + 1).padStart(3, '0')}`,
        ...formData,
        clicks: 0,
        impresiones: 0,
        ctr: 0,
        creado: new Date().toISOString().split('T')[0],
        actualizado: new Date().toISOString().split('T')[0]
      }
      setBanners(prev => [...prev, newBanner])
    }
    
    setShowModal(false)
    setEditingBanner(null)
    setFormData({
      posicion: 'secundario',
      titulo: '',
      descripcion: '',
      imagen: '',
      enlace: '',
      estado: 'activo',
      fechaInicio: '',
      fechaFin: ''
    })
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      posicion: banner.posicion,
      titulo: banner.titulo,
      descripcion: banner.descripcion,
      imagen: banner.imagen,
      enlace: banner.enlace,
      estado: banner.estado,
      fechaInicio: banner.fechaInicio || '',
      fechaFin: banner.fechaFin || ''
    })
    setShowModal(true)
  }

  const getEstadoColor = (estado: Banner['estado']) => {
    switch (estado) {
      case 'activo': return 'bg-emerald-100 text-emerald-700'
      case 'inactivo': return 'bg-red-100 text-red-700'
      case 'programado': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPosicionColor = (posicion: Banner['posicion']) => {
    switch (posicion) {
      case 'principal': return 'bg-purple-100 text-purple-700'
      case 'secundario': return 'bg-blue-100 text-blue-700'
      case 'terciario': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Publicidad" subtitle="Gestiona banners y campañas promocionales" />

      <main className="px-6 py-8 space-y-8">
        {/* Dashboard de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6b7280]">Total Banners</span>
              <Megaphone className="text-[#7c3aed]" size={20} />
            </div>
            <p className="text-2xl font-bold text-[#1e1b4b]">{stats.total}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6b7280]">Activos</span>
              <Zap className="text-[#10b981]" size={20} />
            </div>
            <p className="text-2xl font-bold text-[#1e1b4b]">{stats.activos}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6b7280]">Total Clicks</span>
              <Target className="text-[#2563eb]" size={20} />
            </div>
            <p className="text-2xl font-bold text-[#1e1b4b]">{stats.totalClicks.toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6b7280]">CTR Promedio</span>
              <Eye className="text-[#f59e0b]" size={20} />
            </div>
            <p className="text-2xl font-bold text-[#1e1b4b]">{stats.avgCTR.toFixed(2)}%</p>
          </div>
        </div>

        {/* Botón de Crear */}
        <div className="flex justify-end">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Upload size={18} />
            Crear Banner
          </button>
        </div>

        {/* Lista de Banners */}
        <div className="space-y-6">
          {filteredBanners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl border border-[#7c3aed1a] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Preview del Banner */}
                  <div className="lg:w-1/3">
                    <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                      <img 
                        src={banner.imagen} 
                        alt={banner.titulo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPosicionColor(banner.posicion)}`}>
                          {banner.posicion}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(banner.estado)}`}>
                          {banner.estado}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información del Banner */}
                  <div className="lg:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1e1b4b] mb-2">{banner.titulo}</h3>
                      <p className="text-[#6b7280] mb-4">{banner.descripcion}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-[#6b7280]">Clicks:</span>
                          <span className="font-medium text-[#1e1b4b] ml-1">{banner.clicks.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[#6b7280]">Impresiones:</span>
                          <span className="font-medium text-[#1e1b4b] ml-1">{banner.impresiones.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[#6b7280]">CTR:</span>
                          <span className="font-medium text-[#10b981] ml-1">{banner.ctr.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {banner.estado === 'programado' && (
                      <div className="flex items-center gap-2 text-sm text-[#f59e0b]">
                        <Calendar size={16} />
                        <span>Programado: {banner.fechaInicio} - {banner.fechaFin}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                      <div className="text-xs text-[#6b7280]">
                        <span>Creado: {banner.creado}</span>
                        <span className="mx-2">•</span>
                        <span>Actualizado: {banner.actualizado}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(banner)}
                          className="p-2 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f8f6ff] rounded-lg transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-[#6b7280] hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Creación/Edición */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_50px_-12px_rgba(124,58,237,0.25)]">
            <div className="p-6 border-b border-[#f3f4f6] flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#1e1b4b]">
                {editingBanner ? 'Editar Banner' : 'Crear Nuevo Banner'}
              </h3>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setEditingBanner(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Posición</label>
                  <select 
                    value={formData.posicion}
                    onChange={(e) => setFormData({...formData, posicion: e.target.value as Banner['posicion']})}
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  >
                    <option value="principal">Principal</option>
                    <option value="secundario">Secundario</option>
                    <option value="terciario">Terciario</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Estado</label>
                  <select 
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value as Banner['estado']})}
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="programado">Programado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Título</label>
                <input 
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Descripción</label>
                <textarea 
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">URL de la Imagen</label>
                <input 
                  type="url"
                  value={formData.imagen}
                  onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Enlace</label>
                <input 
                  type="url"
                  value={formData.enlace}
                  onChange={(e) => setFormData({...formData, enlace: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                  placeholder="https://ejemplo.com/destino"
                  required
                />
              </div>

              {formData.estado === 'programado' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Fecha Inicio</label>
                    <input 
                      type="date"
                      value={formData.fechaInicio}
                      onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                      className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Fecha Fin</label>
                    <input 
                      type="date"
                      value={formData.fechaFin}
                      onChange={(e) => setFormData({...formData, fechaFin: e.target.value})}
                      className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6 border-t border-[#e5e7eb]">
                <button 
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingBanner(null)
                  }}
                  className="px-6 py-2 border border-[#e5e7eb] text-[#6b7280] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Check size={18} />
                  {editingBanner ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
