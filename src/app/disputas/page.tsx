'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  AlertTriangle, 
  Scale, 
  MessageSquare, 
  Clock, 
  Check, 
  X, 
  Search, 
  Filter, 
  Calendar,
  User,
  FileText,
  Eye,
  Gavel
} from 'lucide-react'

// Interface para Disputa
interface Disputa {
  id: string
  tipo: 'contrato' | 'pago' | 'calificacion' | 'contenido'
  titulo: string
  descripcion: string
  solicitante: {
    id: string
    nombre: string
    tipo: 'artista' | 'cliente' | 'empresa'
  }
  denunciado: {
    id: string
    nombre: string
    tipo: 'artista' | 'cliente' | 'empresa'
  }
  estado: 'pendiente' | 'en_revision' | 'resuelta' | 'rechazada'
  prioridad: 'baja' | 'media' | 'alta' | 'critica'
  fechaCreacion: string
  fechaActualizacion: string
  evidencias: string[]
  mensajes: {
    id: string
    autor: string
    mensaje: string
    fecha: string
  }[]
  resolucion?: {
    decision: string
    detalles: string
    resueltoPor: string
    fechaResolucion: string
  }
}

// Datos de ejemplo
const disputasData: Disputa[] = [
  {
    id: 'DSP-001',
    tipo: 'contrato',
    titulo: 'Incumplimiento de contrato - Festival de Mariachi',
    descripcion: 'El cliente afirma que el artista no se presentó al evento programado y solicita reembolso del anticipo.',
    solicitante: {
      id: 'CLI-001',
      nombre: 'Corporativo Eventos del Norte',
      tipo: 'cliente'
    },
    denunciado: {
      id: 'ART-001',
      nombre: 'María Reyes',
      tipo: 'artista'
    },
    estado: 'en_revision',
    prioridad: 'alta',
    fechaCreacion: '2026-02-20',
    fechaActualizacion: '2026-02-22',
    evidencias: [
      '/api/placeholder/800/600',
      '/api/placeholder/600/400'
    ],
    mensajes: [
      {
        id: 'MSG-001',
        autor: 'Corporativo Eventos del Norte',
        mensaje: 'Contratamos a María Reyes para el festival del 15 de febrero, pero nunca se presentó. Solicitamos reembolso del 50% de anticipo ($5,000).',
        fecha: '2026-02-20'
      },
      {
        id: 'MSG-002',
        autor: 'María Reyes',
        mensaje: 'Me presenté al evento pero el cliente me informó que había sido cancelado 2 horas antes. No recibí ninguna notificación oficial.',
        fecha: '2026-02-21'
      }
    ]
  },
  {
    id: 'DSP-002',
    tipo: 'pago',
    titulo: 'Pago no recibido - Evento Corporativo',
    descripcion: 'El artista reclama el pago restante del 70% por un evento corporativo realizado el 10 de febrero.',
    solicitante: {
      id: 'ART-002',
      nombre: 'DJ Pulso',
      tipo: 'artista'
    },
    denunciado: {
      id: 'CLI-002',
      nombre: 'Empresa Innovatech',
      tipo: 'cliente'
    },
    estado: 'pendiente',
    prioridad: 'media',
    fechaCreacion: '2026-02-21',
    fechaActualizacion: '2026-02-21',
    evidencias: [
      '/api/placeholder/800/600'
    ],
    mensajes: [
      {
        id: 'MSG-003',
        autor: 'DJ Pulso',
        mensaje: 'Realicé el evento corporativo el 10 de febrero según lo acordado. El cliente solo pagó el 30% y se niega a pagar el resto ($14,000).',
        fecha: '2026-02-21'
      }
    ]
  },
  {
    id: 'DSP-003',
    tipo: 'calificacion',
    titulo: 'Calificación falsa - Trío Elegance',
    descripcion: 'El artista afirma que recibió una calificación de 1 estrella de manera injustificada por parte de un cliente.',
    solicitante: {
      id: 'ART-003',
      nombre: 'Trío Elegance',
      tipo: 'artista'
    },
    denunciado: {
      id: 'CLI-003',
      nombre: 'Usuario Anónimo',
      tipo: 'cliente'
    },
    estado: 'resuelta',
    prioridad: 'baja',
    fechaCreacion: '2026-02-18',
    fechaActualizacion: '2026-02-20',
    evidencias: [],
    mensajes: [
      {
        id: 'MSG-004',
        autor: 'Trío Elegance',
        mensaje: 'Recibimos una calificación de 1 estrella sin ninguna justificación. El cliente nunca contrató nuestros servicios.',
        fecha: '2026-02-18'
      }
    ],
    resolucion: {
      decision: 'favor_artista',
      detalles: 'Se verificó que el cliente nunca contrató los servicios del artista. Calificación removida.',
      resueltoPor: 'admin@buscart.com',
      fechaResolucion: '2026-02-20'
    }
  },
  {
    id: 'DSP-004',
    tipo: 'contenido',
    titulo: 'Contenido inapropiado - Perfil de Artista',
    descripcion: 'Usuario reporta que el perfil de un artista contiene información falsa y contenido engañoso.',
    solicitante: {
      id: 'USR-001',
      nombre: 'Usuario Verificado',
      tipo: 'cliente'
    },
    denunciado: {
      id: 'ART-004',
      nombre: 'Stand-up Rojas',
      tipo: 'artista'
    },
    estado: 'pendiente',
    prioridad: 'critica',
    fechaCreacion: '2026-02-22',
    fechaActualizacion: '2026-02-22',
    evidencias: [
      '/api/placeholder/800/600',
      '/api/placeholder/600/400',
      '/api/placeholder/400/300'
    ],
    mensajes: [
      {
        id: 'MSG-005',
        autor: 'Usuario Verificado',
        mensaje: 'El artista afirma tener 10 años de experiencia y haber trabajado con empresas reconocidas, pero esto es falso. Engaña a los clientes.',
        fecha: '2026-02-22'
      }
    ]
  }
]

// --- COMPONENTE STATCARD ---
function StatCard({ title, value, icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-[4rem] flex items-start justify-end p-6 opacity-40 group-hover:scale-110 transition-transform`}>
        <div className={color}>{icon}</div>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <h3 className={`text-3xl font-black ${color} mb-2`}>{value}</h3>
    </div>
  )
}

export default function DisputasPage() {
  const [disputas, setDisputas] = useState<Disputa[]>(disputasData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroPrioridad, setFiltroPrioridad] = useState('todos')
  const [selectedDisputa, setSelectedDisputa] = useState<Disputa | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredDisputas = disputas.filter(disputa => {
    const matchesSearch = 
      disputa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disputa.solicitante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disputa.denunciado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTipo = filtroTipo === 'todos' || disputa.tipo === filtroTipo
    const matchesEstado = filtroEstado === 'todos' || disputa.estado === filtroEstado
    const matchesPrioridad = filtroPrioridad === 'todos' || disputa.prioridad === filtroPrioridad
    
    return matchesSearch && matchesTipo && matchesEstado && matchesPrioridad
  })

  const stats = {
    total: disputas.length,
    pendientes: disputas.filter(d => d.estado === 'pendiente').length,
    enRevision: disputas.filter(d => d.estado === 'en_revision').length,
    criticas: disputas.filter(d => d.prioridad === 'critica').length
  }

  const getEstadoColor = (estado: Disputa['estado']) => {
    switch (estado) {
      case 'pendiente': return 'bg-amber-100 text-amber-700'
      case 'en_revision': return 'bg-blue-100 text-blue-700'
      case 'resuelta': return 'bg-green-100 text-green-700'
      case 'rechazada': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPrioridadColor = (prioridad: Disputa['prioridad']) => {
    switch (prioridad) {
      case 'critica': return 'bg-red-100 text-red-700'
      case 'alta': return 'bg-orange-100 text-orange-700'
      case 'media': return 'bg-yellow-100 text-yellow-700'
      case 'baja': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTipoIcon = (tipo: Disputa['tipo']) => {
    switch (tipo) {
      case 'contrato': return <FileText size={16} />
      case 'pago': return <AlertTriangle size={16} />
      case 'calificacion': return <Scale size={16} />
      case 'contenido': return <MessageSquare size={16} />
      default: return <AlertTriangle size={16} />
    }
  }

  const handleResolution = (disputaId: string, decision: string, detalles: string) => {
    setDisputas(prev => prev.map(d => 
      d.id === disputaId 
        ? {
            ...d,
            estado: 'resuelta',
            resolucion: {
              decision,
              detalles,
              resueltoPor: 'admin@buscart.com',
              fechaResolucion: new Date().toISOString().split('T')[0]
            },
            fechaActualizacion: new Date().toISOString().split('T')[0]
          }
        : d
    ))
    setShowDetailModal(false)
    setSelectedDisputa(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Disputas" subtitle="Gestión de conflictos y solicitudes de resolución" />

      <main className="px-6 py-8 space-y-8">
        {/* Dashboard de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="Total Disputas" 
            value={stats.total} 
            icon={<Gavel className="text-[#7c3aed]" />}
            color="text-[#7c3aed]"
            bgColor="bg-[#f0edff]"
          />
          <StatCard 
            title="Pendientes" 
            value={stats.pendientes} 
            icon={<Clock className="text-amber-500" />}
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
          <StatCard 
            title="En Revisión" 
            value={stats.enRevision} 
            icon={<Eye className="text-blue-500" />}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard 
            title="Críticas" 
            value={stats.criticas} 
            icon={<AlertTriangle className="text-red-500" />}
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white p-4 rounded-2xl border border-[#7c3aed1a] shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              <input 
                type="text" 
                placeholder="Buscar disputas..." 
                className="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all cursor-pointer"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos los tipos</option>
              <option value="contrato">Contratos</option>
              <option value="pago">Pagos</option>
              <option value="calificacion">Calificaciones</option>
              <option value="contenido">Contenido</option>
            </select>
            
            <select 
              className="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all cursor-pointer"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="en_revision">En Revisión</option>
              <option value="resuelta">Resueltas</option>
              <option value="rechazada">Rechazadas</option>
            </select>
            
            <select 
              className="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all cursor-pointer"
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
            >
              <option value="todos">Todas las prioridades</option>
              <option value="critica">Críticas</option>
              <option value="alta">Altas</option>
              <option value="media">Medias</option>
              <option value="baja">Bajas</option>
            </select>
          </div>
        </div>

        {/* Lista de Disputas */}
        <div className="space-y-4">
          {filteredDisputas.map((disputa) => (
            <div key={disputa.id} className="bg-white rounded-2xl border border-[#7c3aed1a] overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(disputa.prioridad)}`}>
                        {disputa.prioridad.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(disputa.estado)}`}>
                        {disputa.estado.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1">
                        {getTipoIcon(disputa.tipo)}
                        {disputa.tipo.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#1e1b4b] mb-2">{disputa.titulo}</h3>
                    <p className="text-[#6b7280] mb-4">{disputa.descripcion}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-[#6b7280]">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>Solicitante: <strong>{disputa.solicitante.nombre}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} />
                        <span>Denunciado: <strong>{disputa.denunciado.nombre}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Creado: {disputa.fechaCreacion}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => { setSelectedDisputa(disputa); setShowDetailModal(true); }}
                      className="p-2 text-[#6b7280] hover:text-[#7c3aed] hover:bg-[#f8f6ff] rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Detalles */}
      {showDetailModal && selectedDisputa && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_50px_-12px_rgba(124,58,237,0.25)]">
            <div className="p-6 border-b border-[#f3f4f6]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-[#1e1b4b] mb-2">{selectedDisputa.titulo}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(selectedDisputa.prioridad)}`}>
                      {selectedDisputa.prioridad.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedDisputa.estado)}`}>
                      {selectedDisputa.estado.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1">
                      {getTipoIcon(selectedDisputa.tipo)}
                      {selectedDisputa.tipo.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Descripción */}
              <div>
                <h4 className="text-lg font-bold text-[#1e1b4b] mb-2">Descripción</h4>
                <p className="text-[#6b7280]">{selectedDisputa.descripcion}</p>
              </div>

              {/* Partes Involucradas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h5 className="font-bold text-blue-700 mb-2">Solicitante</h5>
                  <p className="text-[#1e1b4b]">{selectedDisputa.solicitante.nombre}</p>
                  <p className="text-sm text-blue-600">{selectedDisputa.solicitante.tipo}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <h5 className="font-bold text-red-700 mb-2">Denunciado</h5>
                  <p className="text-[#1e1b4b]">{selectedDisputa.denunciado.nombre}</p>
                  <p className="text-sm text-red-600">{selectedDisputa.denunciado.tipo}</p>
                </div>
              </div>

              {/* Mensajes */}
              <div>
                <h4 className="text-lg font-bold text-[#1e1b4b] mb-4">Comunicación</h4>
                <div className="space-y-3">
                  {selectedDisputa.mensajes.map((mensaje) => (
                    <div key={mensaje.id} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-[#1e1b4b]">{mensaje.autor}</p>
                        <p className="text-sm text-[#6b7280]">{mensaje.fecha}</p>
                      </div>
                      <p className="text-[#6b7280]">{mensaje.mensaje}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidencias */}
              {selectedDisputa.evidencias.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#1e1b4b] mb-4">Evidencias</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDisputa.evidencias.map((evidencia, index) => (
                      <div key={index} className="bg-gray-100 rounded-xl overflow-hidden">
                        <img 
                          src={evidencia} 
                          alt={`Evidencia ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resolución */}
              {selectedDisputa.estado === 'resuelta' && selectedDisputa.resolucion && (
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="text-lg font-bold text-green-700 mb-2">Resolución</h4>
                  <p className="text-[#1e1b4b] mb-2">
                    <strong>Decisión:</strong> {selectedDisputa.resolucion.decision}
                  </p>
                  <p className="text-[#6b7280] mb-2">{selectedDisputa.resolucion.detalles}</p>
                  <p className="text-sm text-green-600">
                    Resuelto por {selectedDisputa.resolucion.resueltoPor} el {selectedDisputa.resolucion.fechaResolucion}
                  </p>
                </div>
              )}

              {/* Acciones */}
              {selectedDisputa.estado !== 'resuelta' && (
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleResolution(selectedDisputa.id, 'favor_solicitante', 'Se determinó que el solicitante tiene razón. Se tomarán medidas correctivas.')}
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    Resolver a favor del solicitante
                  </button>
                  <button 
                    onClick={() => handleResolution(selectedDisputa.id, 'favor_denunciado', 'Se determinó que el denunciado tiene razón. No se tomarán medidas.')}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    Resolver a favor del denunciado
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
