'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Download, 
  Wallet,
  CreditCard,
  History,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

// --- Interfaces ---
interface Transaccion {
  id: string
  referencia: string
  monto: number
  metodo: 'tarjeta' | 'transferencia' | 'wallet'
  tipo: 'ingreso' | 'egreso'
  usuario: string
  concepto: string
  estado: 'completado' | 'pendiente' | 'retenido'
  fecha: string
}

const transaccionesData: Transaccion[] = [
  { id: 'TRX-9901', referencia: 'INV-2026-001', monto: 1250.00, metodo: 'tarjeta', tipo: 'ingreso', usuario: 'Corporativo Eventos', concepto: 'Reserva Mariachi Sol', estado: 'completado', fecha: '2026-02-24' },
  { id: 'TRX-9902', referencia: 'PAY-2026-042', monto: 850.00, metodo: 'transferencia', tipo: 'egreso', usuario: 'DJ Pulso', concepto: 'Liquidación Evento Electra', estado: 'completado', fecha: '2026-02-23' },
  { id: 'TRX-9903', referencia: 'INV-2026-005', monto: 2100.00, metodo: 'tarjeta', tipo: 'ingreso', usuario: 'Boda García', concepto: 'Depósito Garantía Orquesta', estado: 'retenido', fecha: '2026-02-25' },
  { id: 'TRX-9904', referencia: 'PAY-2026-045', monto: 450.00, metodo: 'wallet', tipo: 'egreso', usuario: 'Stand-up Rojas', concepto: 'Pago Comisión Referidos', estado: 'pendiente', fecha: '2026-02-25' },
]

export default function PagosPage() {
  const [transacciones] = useState<Transaccion[]>(transaccionesData)

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Pagos y Finanzas" subtitle="Control de ingresos, egresos y depósitos en garantía" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen Financiero - Estilo Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6b7280]">Balance Total</p>
                <p className="text-2xl font-bold text-[#1e1b4b] mt-1">$45,280.00</p>
                <p className="text-xs text-[#10b981] font-medium mt-2 flex items-center gap-1">
                  <TrendingUp size={12} />
                  +12% este mes
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#f0edff] flex items-center justify-center">
                <Wallet size={18} className="text-[#7c3aed]" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6b7280]">En Escrow (Retenido)</p>
                <p className="text-2xl font-bold text-[#1e1b4b] mt-1">$8,140.00</p>
                <p className="text-xs text-[#f59e0b] font-medium mt-2 flex items-center gap-1">
                  <Clock size={12} />
                  14 pagos pendientes
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#fef3c7] flex items-center justify-center">
                <Clock size={18} className="text-[#f59e0b]" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6b7280]">Total Egresos</p>
                <p className="text-2xl font-bold text-[#1e1b4b] mt-1">$12,400.00</p>
                <p className="text-xs text-[#2563eb] font-medium mt-2 flex items-center gap-1">
                  <ArrowUpRight size={12} />
                  Pagos a artistas
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center">
                <ArrowUpRight size={18} className="text-[#2563eb]" />
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Movimientos - Estilo Dashboard */}
        <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#7c3aed0a] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-[#1e1b4b]">Movimientos Recientes</h2>
              <p className="text-sm text-[#8b5cf6] mt-1">Últimas transacciones en la plataforma</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-[#7c3aed] transition-all">
                <Filter size={18} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1b4b] text-white text-sm font-bold rounded-xl hover:bg-black transition-all">
                <Download size={16} /> Exportar CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8f6ff] border-b border-[#7c3aed0a]">
                <tr className="text-xs font-semibold text-[#6b7280] uppercase tracking-[0.05em]">
                  <th className="px-6 py-3 text-left">Detalle / Usuario</th>
                  <th className="px-6 py-3 text-left">Método</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Monto</th>
                  <th className="px-6 py-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {transacciones.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f8f6ff] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${tx.tipo === 'ingreso' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                          {tx.tipo === 'ingreso' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e1b4b]">{tx.concepto}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{tx.usuario} • {tx.fecha}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <CreditCard size={14} />
                        <span className="text-xs font-bold capitalize">{tx.metodo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.estado} />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-black ${tx.tipo === 'ingreso' ? 'text-emerald-600' : 'text-[#1e1b4b]'}`}>
                        {tx.tipo === 'ingreso' ? '+' : '-'} ${tx.monto.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[10px] font-black text-[#7c3aed] uppercase hover:underline">Ver Recibo</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerta de Seguridad Financiera - Estilo Dashboard */}
        <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-amber-50 p-4 rounded-2xl">
                <AlertCircle size={24} className="text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1e1b4b]">Verificación de Fondos Requerida</h4>
                <p className="text-sm text-[#6b7280] mt-1">Hay 3 transacciones de alto valor que requieren revisión manual antes de ser liberadas.</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#7c3aed] text-white font-bold text-sm rounded-xl hover:bg-[#5b21b6] transition-all">
              Revisar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Subcomponentes ---

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    completado: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    pendiente: 'bg-blue-50 text-blue-600 border-blue-100',
    retenido: 'bg-amber-50 text-amber-600 border-amber-100'
  }
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  )
}