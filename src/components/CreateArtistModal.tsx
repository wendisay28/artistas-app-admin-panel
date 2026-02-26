'use client'

import { useState } from 'react'
import { X, Save, User, Mail, Tag, Briefcase, Instagram, Music, Globe, DollarSign, Camera, AlertCircle, Phone, Star } from 'lucide-react'

interface CreateArtistModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (artistData: any) => void
}

const categorias = ['Mariachi', 'DJ', 'Música', 'Comedia', 'Danza', 'Banda', 'Orquesta', 'Magia', 'Otros']

const especialidadesPorCategoria: Record<string, string[]> = {
  'Mariachi': ['Regional', 'Tradicional', 'Moderno', 'Romántico'],
  'DJ': ['Electrónica', 'House', 'Techno', 'Hip Hop', 'Reggaeton', 'Latina'],
  'Música': ['Rock', 'Pop', 'Jazz', 'Clásica', 'Ranchera', 'Boleros'],
  'Comedia': ['Stand-up', 'Imitación', 'Satira', 'Improvisación'],
  'Danza': ['Folclórica', 'Contemporánea', 'Ballet', 'Hip Hop', 'Salsa'],
  'Banda': ['Sinaloense', 'Duranguense', 'Norteña', 'Tropical'],
  'Orquesta': ['Sinfónica', 'Filarmónica', 'Cámara', 'Popular'],
  'Magia': ['Ilusionismo', 'Close-up', 'Mentalismo', 'Escapismo'],
  'Otros': ['Variado']
}

export default function CreateArtistModal({ isOpen, onClose, onSave }: CreateArtistModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    categoria: '',
    especialidad: '',
    descripcion: '',
    instagram: '',
    sitioWeb: '',
    tarifaMin: '',
    tarifaMax: '',
    ubicacion: '',
    experiencia: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    if (!formData.categoria) newErrors.categoria = 'La categoría es requerida'
    if (!formData.especialidad) newErrors.especialidad = 'La especialidad es requerida'
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es requerida'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const artistData = {
        ...formData,
        id: `ART-${Date.now()}`,
        calificacion: 0,
        estado: 'activo',
        verificacion: 'no_verificado',
        registro: new Date().toISOString().split('T')[0]
      }
      onSave(artistData)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        categoria: '',
        especialidad: '',
        descripcion: '',
        instagram: '',
        sitioWeb: '',
        tarifaMin: '',
        tarifaMax: '',
        ubicacion: '',
        experiencia: ''
      })
      setErrors({})
    }
  }

  const especialidades = formData.categoria ? especialidadesPorCategoria[formData.categoria] || [] : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Nuevo Artista</h2>
              <p className="text-sm text-[#6b7280]">Registra un nuevo talento en la plataforma</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información Básica</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <User size={14} />
                    Nombre Artístico *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.nombre ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Ej: María Reyes"
                  />
                  {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Mail size={14} />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="artista@ejemplo.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Globe size={14} />
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.ubicacion ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Ciudad, País"
                  />
                  {errors.ubicacion && <p className="text-xs text-red-500 mt-1">{errors.ubicacion}</p>}
                </div>
              </div>
            </div>

            {/* Información Profesional */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información Profesional</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Music size={14} />
                    Categoría *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value, especialidad: '' })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer ${
                      errors.categoria ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.categoria && <p className="text-xs text-red-500 mt-1">{errors.categoria}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Tag size={14} />
                    Especialidad *
                  </label>
                  <select
                    value={formData.especialidad}
                    onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer ${
                      errors.especialidad ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    disabled={!formData.categoria}
                  >
                    <option value="">Selecciona una especialidad</option>
                    {especialidades.map(esp => (
                      <option key={esp} value={esp}>{esp}</option>
                    ))}
                  </select>
                  {errors.especialidad && <p className="text-xs text-red-500 mt-1">{errors.especialidad}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Star size={14} />
                    Experiencia (años)
                  </label>
                  <input
                    type="number"
                    value={formData.experiencia}
                    onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="5"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Briefcase size={14} />
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all resize-none"
                    rows={3}
                    placeholder="Describe tu estilo y experiencia..."
                  />
                </div>
              </div>
            </div>

            {/* Redes y Tarifas */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Redes Sociales</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Instagram size={14} />
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="@artista"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Globe size={14} />
                    Sitio Web
                  </label>
                  <input
                    type="url"
                    value={formData.sitioWeb}
                    onChange={(e) => setFormData({ ...formData, sitioWeb: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="https://www.artista.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Tarifas</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <DollarSign size={14} />
                    Tarifa Mínima (MXN)
                  </label>
                  <input
                    type="number"
                    value={formData.tarifaMin}
                    onChange={(e) => setFormData({ ...formData, tarifaMin: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="1000"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <DollarSign size={14} />
                    Tarifa Máxima (MXN)
                  </label>
                  <input
                    type="number"
                    value={formData.tarifaMax}
                    onChange={(e) => setFormData({ ...formData, tarifaMax: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <AlertCircle size={14} />
            Los campos marcados con * son obligatorios
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save size={16} />
              Crear Artista
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
