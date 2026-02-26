'use client'

import { useState } from 'react'
import { X, Plus, User, Building, FileText, Users } from 'lucide-react'

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (type: string) => void
}

const createOptions = [
  {
    type: 'artista',
    label: 'Nuevo Artista',
    description: 'Registrar un nuevo talento en la plataforma',
    icon: User,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    type: 'empresa',
    label: 'Nueva Empresa',
    description: 'Agregar una nueva empresa cliente',
    icon: Building,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    type: 'contrato',
    label: 'Nuevo Contrato',
    description: 'Crear un nuevo contrato de servicio',
    icon: FileText,
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    type: 'usuario',
    label: 'Nuevo Usuario',
    description: 'Agregar un nuevo usuario al sistema',
    icon: Users,
    color: 'bg-orange-50 text-orange-600 border-orange-200'
  }
]

export default function CreateModal({ isOpen, onClose, onCreate }: CreateModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleCreate = () => {
    if (selectedType) {
      onCreate(selectedType)
      onClose()
      setSelectedType(null)
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
              <Plus size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Crear Nuevo</h2>
              <p className="text-sm text-[#6b7280]">Selecciona el tipo de elemento que deseas crear</p>
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
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {createOptions.map((option) => {
              const Icon = option.icon
              const isSelected = selectedType === option.type
              
              return (
                <button
                  key={option.type}
                  onClick={() => setSelectedType(option.type)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-[#7c3aed] bg-[#7c3aed08]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg border ${option.color} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1e1b4b] mb-1">{option.label}</h3>
                      <p className="text-sm text-[#6b7280]">{option.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-[#6b7280]">
            {selectedType ? `Seleccionado: ${createOptions.find(o => o.type === selectedType)?.label}` : 'Selecciona una opción para continuar'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              disabled={!selectedType}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                selectedType
                  ? 'bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus size={16} />
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
