'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Settings, Percent, DollarSign, Save, RefreshCw, AlertCircle } from 'lucide-react'

interface FeeConfig {
  artistCommission: number
  clientCommission: number
  platformFee: number
  minTransaction: number
  maxTransaction: number
}

export default function FeesSettingsPage() {
  const [fees, setFees] = useState<FeeConfig>({
    artistCommission: 10,
    clientCommission: 5,
    platformFee: 2.5,
    minTransaction: 100,
    maxTransaction: 100000
  })

  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    setFees({
      artistCommission: 10,
      clientCommission: 5,
      platformFee: 2.5,
      minTransaction: 100,
      maxTransaction: 100000
    })
    setHasChanges(false)
  }

  const updateFee = (key: keyof FeeConfig, value: number) => {
    setFees(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Configuración de Comisiones" subtitle="Define las tarifas y comisiones de la plataforma" />

      <div className="px-6 py-8 flex flex-col gap-6">
        
        {/* Alerta Informativa */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="text-amber-600 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-bold text-amber-800 mb-1">Importante</h3>
            <p className="text-xs text-amber-700">
              Los cambios en las comisiones afectarán únicamente a las nuevas transacciones. 
              Las transacciones existentes mantendrán las tarifas originales.
            </p>
          </div>
        </div>

        {/* Tarifas Principales */}
        <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f3f4f6]">
            <h2 className="text-lg font-bold text-[#1e1b4b] flex items-center gap-2">
              <Percent className="text-[#7c3aed]" size={20} />
              Comisiones por Transacción
            </h2>
            <p className="text-sm text-[#6b7280] mt-1">Define el porcentaje que cobra BuscArt</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Comisión Artistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Comisión Artistas</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={fees.artistCommission}
                    onChange={(e) => updateFee('artistCommission', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 pr-12 text-sm font-bold border border-gray-200 rounded-xl focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#7c3aed]">%</span>
                </div>
                <p className="text-xs text-gray-500">Porcentaje cobrado a los artistas por cada transacción</p>
              </div>

              {/* Comisión Clientes */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Comisión Clientes</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={fees.clientCommission}
                    onChange={(e) => updateFee('clientCommission', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 pr-12 text-sm font-bold border border-gray-200 rounded-xl focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#7c3aed]">%</span>
                </div>
                <p className="text-xs text-gray-500">Porcentaje cobrado a los clientes por cada transacción</p>
              </div>
            </div>

            {/* Comisión Plataforma */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Comisión Plataforma</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={fees.platformFee}
                  onChange={(e) => updateFee('platformFee', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 pr-12 text-sm font-bold border border-gray-200 rounded-xl focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#7c3aed]">%</span>
              </div>
              <p className="text-xs text-gray-500">Comisión adicional para mantenimiento de la plataforma</p>
            </div>
          </div>
        </div>

        {/* Límites de Transacción */}
        <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f3f4f6]">
            <h2 className="text-lg font-bold text-[#1e1b4b] flex items-center gap-2">
              <DollarSign className="text-[#7c3aed]" size={20} />
              Límites de Transacción
            </h2>
            <p className="text-sm text-[#6b7280] mt-1">Define los montos mínimos y máximos permitidos</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monto Mínimo */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Monto Mínimo</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={fees.minTransaction}
                  onChange={(e) => updateFee('minTransaction', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 pl-8 text-sm font-bold border border-gray-200 rounded-xl focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-500">Monto mínimo por transacción</p>
            </div>

            {/* Monto Máximo */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Monto Máximo</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={fees.maxTransaction}
                  onChange={(e) => updateFee('maxTransaction', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 pl-8 text-sm font-bold border border-gray-200 rounded-xl focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-500">Monto máximo por transacción</p>
            </div>
          </div>
        </div>

        {/* Vista Previa */}
        <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f3f4f6]">
            <h2 className="text-lg font-bold text-[#1e1b4b]">Vista Previa</h2>
            <p className="text-sm text-[#6b7280] mt-1">Ejemplo de cálculo con una transacción de $1,000</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Monto Original</span>
              <span className="text-lg font-bold text-[#1e1b4b]">$1,000.00</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Comisión Artista ({fees.artistCommission}%)</span>
              <span className="text-lg font-bold text-red-600">-${(1000 * fees.artistCommission / 100).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Comisión Cliente ({fees.clientCommission}%)</span>
              <span className="text-lg font-bold text-red-600">-${(1000 * fees.clientCommission / 100).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Comisión Plataforma ({fees.platformFee}%)</span>
              <span className="text-lg font-bold text-red-600">-${(1000 * fees.platformFee / 100).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 bg-[#f8f6ff] rounded-xl px-4">
              <span className="text-sm font-bold text-[#1e1b4b]">Total Recibido por Artista</span>
              <span className="text-xl font-bold text-[#059669]">
                ${(1000 - (1000 * (fees.artistCommission + fees.platformFee) / 100)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            <RefreshCw size={16} />
            Restablecer Valores
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-[#7c3aed] text-white text-sm font-bold rounded-xl hover:bg-[#5b21b6] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save size={16} />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
