'use client'

import { X, FileText, Calendar, Clock, CheckCircle, AlertCircle, MapPin, ArrowRight, Download } from 'lucide-react'

export default function ContractDetailModal({ isOpen, onClose, contract }: any) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f0edff] text-[#7c3aed] rounded-2xl flex items-center justify-center"><FileText size={24} /></div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Contrato #{contract.id}</h2>
              <p className="text-[10px] font-black text-[#9ca3af] uppercase tracking-widest">{contract.categoria}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-[#fcfcff]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="text-center flex-1">
                  <p className="text-[9px] font-black text-[#9ca3af] uppercase mb-1">Artista</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{contract.artistaNombre}</p>
                </div>
                <ArrowRight className="text-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-[9px] font-black text-[#9ca3af] uppercase mb-1">Cliente</p>
                  <p className="text-sm font-bold text-[#1e1b4b]">{contract.clienteNombre}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 grid grid-cols-2 gap-6 shadow-sm">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-[#9ca3af] uppercase">Fecha</p>
                  <p className="text-sm font-bold text-[#4b5563]">{contract.fechaEvento}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-[#9ca3af] uppercase">Ubicación</p>
                  <p className="text-sm font-bold text-[#4b5563]">{contract.ubicacion}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e1b4b] text-white p-8 rounded-[2rem] shadow-xl">
              <p className="text-[10px] font-black text-violet-300 uppercase mb-4 tracking-widest">Resumen Financiero</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm opacity-80"><span>Monto</span><span>${contract.monto.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm opacity-80"><span>Comisión</span><span>${(contract.monto * 0.1).toLocaleString()}</span></div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-xs font-bold uppercase">Total</span><span className="text-2xl font-black">${(contract.monto * 1.1).toLocaleString()}</span></div>
              </div>
              <button className="w-full mt-8 py-3 bg-[#7c3aed] text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <Download size={14} /> Factura PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}