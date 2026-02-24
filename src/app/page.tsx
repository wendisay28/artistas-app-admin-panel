import Header from '../components/Header'
import { Mic2, FileText, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'

const stats = [
  {
    label: 'Artistas registrados',
    value: '142',
    change: '+12 este mes',
    icon: Mic2,
    color: 'text-[#7c3aed]',
    bgColor: 'bg-[#f0edff]',
  },
  {
    label: 'Contratos activos',
    value: '38',
    change: '+5 esta semana',
    icon: FileText,
    color: 'text-[#10b981]',
    bgColor: 'bg-[#d1fae5]',
  },
  {
    label: 'Usuarios registrados',
    value: '1,204',
    change: '+89 este mes',
    icon: Users,
    color: 'text-[#2563eb]',
    bgColor: 'bg-[#dbeafe]',
  },
  {
    label: 'Ingresos (MXN)',
    value: '$248,500',
    change: '+18% vs mes anterior',
    icon: DollarSign,
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#fef3c7]',
  },
]

const recentContracts = [
  { id: 'C-001', artista: 'María Reyes', cliente: 'Bodas del Norte', tipo: 'Mariachi', fecha: '2026-02-28', monto: '$12,000', estado: 'activo' },
  { id: 'C-002', artista: 'DJ Pulso', cliente: 'Club Nocturno Éclat', tipo: 'DJ', fecha: '2026-03-05', monto: '$8,500', estado: 'pendiente' },
  { id: 'C-003', artista: 'Trío Elegance', cliente: 'Hotel Marqués', tipo: 'Trío', fecha: '2026-03-10', monto: '$6,000', estado: 'activo' },
  { id: 'C-004', artista: 'Stand-up Rojas', cliente: 'Corporativo ALFA', tipo: 'Comedia', fecha: '2026-02-20', monto: '$15,000', estado: 'completado' },
  { id: 'C-005', artista: 'Ballet Folclórico', cliente: 'Feria Municipal', tipo: 'Danza', fecha: '2026-03-15', monto: '$22,000', estado: 'cancelado' },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  activo: { label: 'Activo', className: 'bg-[#ecfdf5] text-[#059669]', icon: CheckCircle },
  pendiente: { label: 'Pendiente', className: 'bg-[#fffbeb] text-[#d97706]', icon: Clock },
  completado: { label: 'Completado', className: 'bg-[#eef2ff] text-[#4f46e5]', icon: CheckCircle },
  cancelado: { label: 'Cancelado', className: 'bg-[#fef2f2] text-[#dc2626]', icon: XCircle },
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <div className="animate-fade-in">
        <Header
          title="Dashboard"
          subtitle="Vista general de la plataforma"
        />

        <div className="px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#7c3aed1a] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#6b7280]">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#1e1b4b] mt-1">{stat.value}</p>
                      <p className="text-xs text-[#10b981] font-medium mt-2 flex items-center gap-1">
                        <TrendingUp size={12} />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <Icon size={18} className={stat.color} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Contracts */}
          <div className="bg-white rounded-2xl border border-[#7c3aed1a] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#7c3aed0a] flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-[#1e1b4b]">Contratos recientes</h2>
                <p className="text-sm text-[#8b5cf6] mt-1">Últimas transacciones en la plataforma</p>
              </div>
              <a href="/contratos" className="text-sm text-[#7c3aed] hover:text-[#5b21b6] transition-colors">
                Ver todos
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f6ff] border-b border-[#7c3aed0a]">
                  <tr className="text-xs font-semibold text-[#6b7280] uppercase tracking-[0.05em]">
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Artista</th>
                    <th className="px-6 py-3 text-left">Cliente</th>
                    <th className="px-6 py-3 text-left">Tipo</th>
                    <th className="px-6 py-3 text-left">Fecha</th>
                    <th className="px-6 py-3 text-left">Monto</th>
                    <th className="px-6 py-3 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {recentContracts.map((c) => {
                    const status = statusConfig[c.estado]
                    const StatusIcon = status.icon
                    return (
                      <tr key={c.id} className="hover:bg-[#f8f6ff] transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{c.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-[#111827]">{c.artista}</td>
                        <td className="px-6 py-4 text-sm text-[#4b5563]">{c.cliente}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#f0edff] text-[#7c3aed] rounded-lg">
                            {c.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#4b5563]">{c.fecha}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-[#1e1b4b]">{c.monto}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
