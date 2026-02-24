'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  CalendarCheck, 
  DollarSign, 
  Eye, 
  Check, 
  X, 
  Search, 
  Clock, 
  MapPin, 
  User,
  TrendingUp,
  AlertCircle,
  Users,
  Tag
} from 'lucide-react'

// --- INTERFACES ---
interface EventoPago {
  id: string
  titulo: string
  organizador: string
  categoria: string
  fecha: string
  hora: string
  ubicacion: string
  precio: number
  capacidad: number
  inscritos: number
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  fechaSolicitud: string
  descripcion: string
}

// --- DATA DE EJEMPLO ---
const eventosData: EventoPago[] = [
  {
    id: 'EVP-001',
    titulo: 'Festival de Mariachi 2026',
    organizador: 'Eventos del Norte S.A. de C.V.',
    categoria: 'Música',
    fecha: '2026-03-25',
    hora: '18:00',
    ubicacion: 'Auditorio Municipal, Monterrey',
    precio: 350,
    capacidad: 500,
    inscritos: 234,
    estado: 'pendiente',
    fechaSolicitud: '2026-02-20',
    descripcion: 'Gran festival de mariachi con los mejores grupos del norte.'
  },
  {
    id: 'EVP-002',
    titulo: 'Concierto de Rock Alternativo',
    organizador: 'Producciones Indie MX',
    categoria: 'Música',
    fecha: '2026-04-10',
    hora: '20:00',
    ubicacion: 'Foro Indie, CDMX',
    precio: 280,
    capacidad: 300,
    inscritos: 156,
    estado: 'aprobado',
    fechaSolicitud: '2026-02-18',
    descripcion: 'Las bandas más emergentes del rock alternativo.'
  },
  {
    id: 'EVP-003',
    titulo: 'Stand-up Comedy Night',
    organizador: 'Comedia Central',
    categoria: 'Comedia',
    fecha: '2026-03-30',
    hora: '21:00',
    ubicacion: 'Club de la Comedia, Guadalajara',
    precio: 200,
    capacidad: 150,
    inscritos: 89,
    estado: 'pendiente',
    fechaSolicitud: '2026-02-22',
    descripcion: 'Noche de comedia con los mejores comediantes del país.'
  }
]

export default function EventosPagosPage() {
  const [eventos, setEventos] = useState<EventoPago[]>(eventosData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [selectedEvento, setSelectedEvento] = useState<EventoPago | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // FILTRADO
  const filteredEventos = eventos.filter(evento => {
    const matchesSearch = 
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.organizador.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filtroEstado === 'todos' || evento.estado === filtroEstado
    return matchesSearch && matchesEstado
  })

  // ACCIONES
  const updateEstado = (id: string, nuevoEstado: EventoPago['estado']) => {
    setEventos(prev => prev.map(ev => ev.id === id ? { ...ev, estado: nuevoEstado } : ev))
    setShowDetailModal(false)
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val)

  // ESTADÍSTICAS
  const stats = {
    total: eventos.length,
    pendientes: eventos.filter(e => e.estado === 'pendiente').length,
    ingresosEstimados: eventos.filter(e => e.estado === 'aprobado').reduce((acc, e) => acc + (e.precio * e.inscritos), 0)
  }

  return (
    <div className="min-h-screen bg-[#fafaff] pb-12">
      <Header 
        title="Control de Taquilla" 
        subtitle="Validación de eventos comerciales y monitoreo de ingresos" 
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* DASHBOARD DE ESTADO COMERCIAL */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Ingresos en Taquilla" 
            value={formatCurrency(stats.ingresosEstimados)} 
            icon={<TrendingUp size={24} />} 
            trend="+12% vs mes anterior"
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard 
            title="Solicitudes Pendientes" 
            value={stats.pendientes} 
            icon={<AlertCircle size={24} />} 
            trend="Requieren acción inmediata"
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
          <StatCard 
            title="Eventos Registrados" 
            value={stats.total} 
            icon={<CalendarCheck size={24} />} 
            trend="Total histórico"
            color="text-indigo-600"
            bgColor="bg-indigo-50"
          />
        </div>

        {/* BARRA DE HERRAMIENTAS */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-1/2 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por evento u organizador..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all font-medium text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {['todos', 'pendiente', 'aprobado', 'rechazado'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltroEstado(f)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border capitalize ${
                  filtroEstado === f 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* LISTADO DE EVENTOS */}
        <div className="grid grid-cols-1 gap-4">
          {filteredEventos.map((evento) => (
            <EventoRow 
              key={evento.id} 
              evento={evento} 
              onViewDetail={() => { setSelectedEvento(evento); setShowDetailModal(true); }}
              onUpdateStatus={updateEstado}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      </main>

      {/* MODAL DE DETALLE PROFESIONAL */}
      {showDetailModal && selectedEvento && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="relative h-32 bg-indigo-600 p-8">
              <button onClick={() => setShowDetailModal(false)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all">
                <X size={20} />
              </button>
              <h3 className="text-white text-2xl font-black">Detalle del Evento</h3>
              <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest mt-1">ID: {selectedEvento.id}</p>
            </div>

            <div className="p-10 -mt-8 bg-white rounded-t-[2.5rem] relative">
              <div className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shadow-inner">
                  <Tag size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800 leading-tight">{selectedEvento.titulo}</h4>
                  <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">{selectedEvento.categoria}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <DetailBox icon={<User />} label="Organizador" value={selectedEvento.organizador} />
                <DetailBox icon={<MapPin />} label="Lugar" value={selectedEvento.ubicacion} />
                <DetailBox icon={<Clock />} label="Fecha y Hora" value={`${selectedEvento.fecha} @ ${selectedEvento.hora}`} />
                <DetailBox icon={<DollarSign />} label="Precio Unitario" value={formatCurrency(selectedEvento.precio)} />
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-10 text-sm text-slate-600 leading-relaxed font-medium">
                {selectedEvento.descripcion}
              </div>

              {selectedEvento.estado === 'pendiente' && (
                <div className="flex gap-4">
                  <button 
                    onClick={() => updateEstado(selectedEvento.id, 'aprobado')}
                    className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3"
                  >
                    <Check size={22} /> APROBAR EVENTO
                  </button>
                  <button 
                    onClick={() => updateEstado(selectedEvento.id, 'rechazado')}
                    className="px-8 py-4 bg-white text-red-600 border-2 border-red-50 font-black rounded-2xl hover:bg-red-50 transition-all"
                  >
                    RECHAZAR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- SUBCOMPONENTES ---

function EventoRow({ evento, onViewDetail, onUpdateStatus, formatCurrency }: any) {
  const perc = (evento.inscritos / evento.capacidad) * 100
  const isHighOccupancy = perc > 80

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-indigo-200 transition-all">
      <div className="flex-1 flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${evento.estado === 'pendiente' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
          <CalendarCheck size={28} />
        </div>
        <div>
          <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{evento.titulo}</h4>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{evento.organizador}</p>
        </div>
      </div>

      <div className="flex items-center gap-12 shrink-0">
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Precio</p>
          <p className="font-black text-emerald-600">{formatCurrency(evento.precio)}</p>
        </div>

        <div className="w-40">
          <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 text-slate-400">
            <span>{evento.inscritos} Ventas</span>
            <span className={isHighOccupancy ? 'text-orange-500' : 'text-indigo-500'}>{perc.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${isHighOccupancy ? 'bg-orange-500' : 'bg-indigo-500'}`} 
              style={{ width: `${perc}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onViewDetail} className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Eye size={20} />
          </button>
          {evento.estado === 'pendiente' && (
            <button onClick={() => onUpdateStatus(evento.id, 'aprobado')} className="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm">
              <Check size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend, color, bgColor }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-[4rem] flex items-start justify-end p-6 opacity-40 group-hover:scale-110 transition-transform`}>
        <div className={color}>{icon}</div>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <h3 className={`text-3xl font-black ${color} mb-2`}>{value}</h3>
      <p className="text-[10px] font-bold text-slate-400">{trend}</p>
    </div>
  )
}

function DetailBox({ icon, label, value }: any) {
  return (
    <div className="flex gap-4">
      <div className="text-indigo-400 mt-1 shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">{label}</p>
        <p className="text-slate-700 font-bold text-sm leading-tight">{value}</p>
      </div>
    </div>
  )
}