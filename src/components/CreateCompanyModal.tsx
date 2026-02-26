'use client'

import { useState } from 'react'
import { X, Save, Building, Mail, Phone, Globe, MapPin, Briefcase, Instagram, AlertCircle, Users, Calendar } from 'lucide-react'

interface CreateCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (companyData: any) => void
}

const categorias = [
  'Galería de Arte',
  'Centro Cultural', 
  'Agencia',
  'Productora',
  'Hotel',
  'Restaurante',
  'Empresa Corporativa',
  'Evento Privado',
  'Otro'
]

export default function CreateCompanyModal({ isOpen, onClose, onSave }: CreateCompanyModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    razonSocial: '',
    email: '',
    telefono: '',
    direccion: '',
    categoria: '',
    descripcion: '',
    sitioWeb: '',
    instagram: '',
    representante: '',
    cargoRepresentante: '',
    eventosAnuales: '',
    antiguedad: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!formData.categoria) newErrors.categoria = 'La categoría es requerida'
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const companyData = {
        ...formData,
        id: `EMP-${Date.now()}`,
        tipo: 'empresa',
        estado: 'activo',
        verificacion: 'no_verificado',
        especialidad: formData.descripcion,
        eventos: formData.eventosAnuales || '0',
        ubicacion: formData.direccion
      }
      onSave(companyData)
      setFormData({
        nombre: '',
        razonSocial: '',
        email: '',
        telefono: '',
        direccion: '',
        categoria: '',
        descripcion: '',
        sitioWeb: '',
        instagram: '',
        representante: '',
        cargoRepresentante: '',
        eventosAnuales: '',
        antiguedad: ''
      })
      setErrors({})
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center">
              <Building size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Nueva Empresa</h2>
              <p className="text-sm text-[#6b7280]">Agrega una nueva empresa cliente</p>
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
                    <Building size={14} />
                    Nombre Comercial *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.nombre ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Ej: Bodas del Norte SA"
                  />
                  {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Building size={14} />
                    Razón Social
                  </label>
                  <input
                    type="text"
                    value={formData.razonSocial}
                    onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Ej: Bodas del Norte S.A. de C.V."
                  />
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
                    placeholder="contacto@empresa.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Phone size={14} />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.telefono ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="+52 123 456 7890"
                  />
                  {errors.telefono && <p className="text-xs text-red-500 mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <MapPin size={14} />
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Calle, Número, Ciudad, País"
                  />
                </div>
              </div>
            </div>

            {/* Información de Negocio */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información de Negocio</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Briefcase size={14} />
                    Categoría *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
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
                    <Briefcase size={14} />
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all resize-none"
                    rows={3}
                    placeholder="Describe el tipo de eventos que organizas..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                      <Calendar size={14} />
                      Eventos anuales
                    </label>
                    <input
                      type="number"
                      value={formData.eventosAnuales}
                      onChange={(e) => setFormData({ ...formData, eventosAnuales: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                      placeholder="12"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                      <Calendar size={14} />
                      Antigüedad (años)
                    </label>
                    <input
                      type="number"
                      value={formData.antiguedad}
                      onChange={(e) => setFormData({ ...formData, antiguedad: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                      placeholder="5"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Representante */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Representante</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Users size={14} />
                    Nombre del Representante
                  </label>
                  <input
                    type="text"
                    value={formData.representante}
                    onChange={(e) => setFormData({ ...formData, representante: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Briefcase size={14} />
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={formData.cargoRepresentante}
                    onChange={(e) => setFormData({ ...formData, cargoRepresentante: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Ej: Gerente de Eventos"
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Presencia Digital</h3>
              
              <div className="space-y-3">
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
                    placeholder="https://www.empresa.com"
                  />
                </div>

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
                    placeholder="@empresa"
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
              Crear Empresa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
