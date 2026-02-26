'use client'

import { useState } from 'react'
import { X, Save, FileText, Calendar, DollarSign, MapPin, User, Building, Clock, AlertCircle } from 'lucide-react'

interface CreateContractModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (contractData: any) => void
}

const artistas = [
  { id: 'ART-001', nombre: 'María Reyes', categoria: 'Mariachi' },
  { id: 'ART-002', nombre: 'DJ Pulso', categoria: 'DJ' },
  { id: 'ART-003', nombre: 'Trío Elegance', categoria: 'Música' },
  { id: 'ART-004', nombre: 'Stand-up Rojas', categoria: 'Comedia' },
  { id: 'ART-005', nombre: 'Ballet Folclórico', categoria: 'Danza' }
]

const empresas = [
  { id: 'EMP-001', nombre: 'Bodas del Norte SA' },
  { id: 'EMP-002', nombre: 'Club Nocturno Éclat' },
  { id: 'EMP-003', nombre: 'Hotel Marqués' },
  { id: 'EMP-004', nombre: 'Corporativo ALFA' },
  { id: 'EMP-005', nombre: 'Feria Municipal' }
]

export default function CreateContractModal({ isOpen, onClose, onSave }: CreateContractModalProps) {
  const [formData, setFormData] = useState({
    artistaId: '',
    clienteId: '',
    fechaEvento: '',
    horaEvento: '',
    duracion: '',
    ubicacion: '',
    monto: '',
    anticipo: '',
    descripcion: '',
    tipoServicio: '',
    estado: 'pendiente'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.artistaId) newErrors.artistaId = 'El artista es requerido'
    if (!formData.clienteId) newErrors.clienteId = 'El cliente es requerido'
    if (!formData.fechaEvento) newErrors.fechaEvento = 'La fecha del evento es requerida'
    if (!formData.horaEvento) newErrors.horaEvento = 'La hora del evento es requerida'
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es requerida'
    if (!formData.monto) newErrors.monto = 'El monto es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const artista = artistas.find(a => a.id === formData.artistaId)
      const cliente = empresas.find(c => c.id === formData.clienteId)
      
      const contractData = {
        ...formData,
        id: `C-${Date.now()}`,
        artista: artista?.nombre || '',
        cliente: cliente?.nombre || '',
        tipo: artista?.categoria || '',
        fecha: formData.fechaEvento,
        estado: formData.estado
      }
      onSave(contractData)
      setFormData({
        artistaId: '',
        clienteId: '',
        fechaEvento: '',
        horaEvento: '',
        duracion: '',
        ubicacion: '',
        monto: '',
        anticipo: '',
        descripcion: '',
        tipoServicio: '',
        estado: 'pendiente'
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
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Nuevo Contrato</h2>
              <p className="text-sm text-[#6b7280]">Crea un nuevo contrato de servicio</p>
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
            {/* Información del Contrato */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información del Contrato</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <User size={14} />
                    Artista *
                  </label>
                  <select
                    value={formData.artistaId}
                    onChange={(e) => setFormData({ ...formData, artistaId: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer ${
                      errors.artistaId ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                  >
                    <option value="">Selecciona un artista</option>
                    {artistas.map(artista => (
                      <option key={artista.id} value={artista.id}>
                        {artista.nombre} - {artista.categoria}
                      </option>
                    ))}
                  </select>
                  {errors.artistaId && <p className="text-xs text-red-500 mt-1">{errors.artistaId}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Building size={14} />
                    Cliente *
                  </label>
                  <select
                    value={formData.clienteId}
                    onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer ${
                      errors.clienteId ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                  >
                    <option value="">Selecciona un cliente</option>
                    {empresas.map(empresa => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.clienteId && <p className="text-xs text-red-500 mt-1">{errors.clienteId}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <FileText size={14} />
                    Tipo de Servicio
                  </label>
                  <input
                    type="text"
                    value={formData.tipoServicio}
                    onChange={(e) => setFormData({ ...formData, tipoServicio: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Ej: Serenata, Evento corporativo"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <FileText size={14} />
                    Descripción del Servicio
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all resize-none"
                    rows={3}
                    placeholder="Describe los detalles del servicio..."
                  />
                </div>
              </div>
            </div>

            {/* Información del Evento */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información del Evento</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                      <Calendar size={14} />
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={formData.fechaEvento}
                      onChange={(e) => setFormData({ ...formData, fechaEvento: e.target.value })}
                      className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                        errors.fechaEvento ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                      }`}
                    />
                    {errors.fechaEvento && <p className="text-xs text-red-500 mt-1">{errors.fechaEvento}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                      <Clock size={14} />
                      Hora *
                    </label>
                    <input
                      type="time"
                      value={formData.horaEvento}
                      onChange={(e) => setFormData({ ...formData, horaEvento: e.target.value })}
                      className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                        errors.horaEvento ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                      }`}
                    />
                    {errors.horaEvento && <p className="text-xs text-red-500 mt-1">{errors.horaEvento}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Clock size={14} />
                    Duración
                  </label>
                  <input
                    type="text"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="Ej: 3 horas, 2 sets de 45 min"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <MapPin size={14} />
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.ubicacion ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Dirección completa del evento"
                  />
                  {errors.ubicacion && <p className="text-xs text-red-500 mt-1">{errors.ubicacion}</p>}
                </div>
              </div>
            </div>

            {/* Información Financiera */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información Financiera</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <DollarSign size={14} />
                    Monto Total *
                  </label>
                  <input
                    type="number"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.monto ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="10000"
                    min="0"
                  />
                  {errors.monto && <p className="text-xs text-red-500 mt-1">{errors.monto}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <DollarSign size={14} />
                    Anticipo
                  </label>
                  <input
                    type="number"
                    value={formData.anticipo}
                    onChange={(e) => setFormData({ ...formData, anticipo: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all"
                    placeholder="3000"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <AlertCircle size={14} />
                    Estado Inicial
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] transition-all cursor-pointer"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="activo">Activo</option>
                    <option value="completado">Completado</option>
                  </select>
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
              Crear Contrato
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
