'use client'

import { useState } from 'react'
import { X, Save, User, Mail, Shield, Briefcase, AlertCircle, CheckCircle } from 'lucide-react'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: any) => void
}

const roles = [
  { value: 'cliente', label: 'Cliente', description: 'Usuarios que contratan servicios' },
  { value: 'empresa', label: 'Empresa', description: 'Cuentas corporativas' },
  { value: 'admin', label: 'Administrador', description: 'Acceso completo al sistema' }
]

export default function CreateUserModal({ isOpen, onClose, onSave }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'cliente',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!formData.rol) newErrors.rol = 'El rol es requerido'
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        ...formData,
        id: `USR-${Date.now()}`,
        contratos: 0,
        registro: new Date().toISOString().split('T')[0],
        estado: 'activo',
        iniciales: formData.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        verificacion: 'no_verificado'
      }
      onSave(userData)
      setFormData({
        nombre: '',
        email: '',
        rol: 'cliente',
        telefono: '',
        direccion: '',
        password: '',
        confirmPassword: ''
      })
      setErrors({})
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Nuevo Usuario</h2>
              <p className="text-sm text-[#6b7280]">Agrega un nuevo usuario al sistema</p>
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
          <div className="space-y-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información Básica</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <User size={14} />
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.nombre ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Ej: Carlos Mendoza"
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
                    placeholder="usuario@ejemplo.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Shield size={14} />
                    Rol *
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer ${
                      errors.rol ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                  {errors.rol && <p className="text-xs text-red-500 mt-1">{errors.rol}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Briefcase size={14} />
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
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                  <Briefcase size={14} />
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

            {/* Información de Acceso */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Información de Acceso</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Shield size={14} />
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-3 py-2 pr-10 text-sm border rounded-lg outline-none transition-all ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <X size={16} /> : <CheckCircle size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-1">
                    <Shield size={14} />
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-[#e5e7eb] focus:border-[#7c3aed]'
                    }`}
                    placeholder="Repite la contraseña"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Resumen del Rol */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Rol Seleccionado: {roles.find(r => r.value === formData.rol)?.label}
                  </h4>
                  <p className="text-xs text-blue-700">
                    {roles.find(r => r.value === formData.rol)?.description}
                  </p>
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
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
