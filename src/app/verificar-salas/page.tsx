'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Shield, Eye, Check, X, Search, MapPin, User, 
  Calendar, Ban, Building2, Phone, Mail, FileText,
  ExternalLink, Download, AlertTriangle
} from 'lucide-react'

// INTERFACES Y DATOS
interface SalaVerificacion {
  id: string
  nombre: string
  tipo: string
  direccion: string
  propietario: string
  email: string
  telefono: string
  estado: 'pendiente' | 'verificada' | 'rechazada'
  fotos: string[]
  documentos: string[]
}

const salasPendientesData: SalaVerificacion[] = [
  {
    id: 'SAL-001',
    nombre: 'Salón Imperial',
    tipo: 'Salón de Eventos',
    direccion: 'Av. Principal #123, CDMX',
    propietario: 'Carlos Rodríguez',
    email: 'carlos@salonimperial.com',
    telefono: '+52 55 1234 5678',
    estado: 'pendiente',
    fotos: ['/api/placeholder/400/300'],
    documentos: ['Identificación oficial', 'Comprobante de domicilio', 'Licencia de funcionamiento']
  },
  {
    id: 'SAL-002',
    nombre: 'Terraza Jardín',
    tipo: 'Espacio Exterior',
    direccion: 'Calle Flores #456, Guadalajara',
    propietario: 'María González',
    email: 'maria@terrazajardin.com',
    telefono: '+52 33 8765 4321',
    estado: 'pendiente',
    fotos: ['/api/placeholder/400/300'],
    documentos: ['Identificación oficial', 'Permiso municipal', 'Seguro de responsabilidad civil']
  }
]

export default function VerificarSalasPage() {
  const [salas, setSalas] = useState<SalaVerificacion[]>(salasPendientesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSala, setSelectedSala] = useState<SalaVerificacion | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredSalas = salas.filter(sala =>
    sala.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sala.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateEstado = (id: string, nuevoEstado: SalaVerificacion['estado']) => {
    setSalas(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
    setShowModal(false)
    setSelectedSala(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header 
        title="Verificación de Salas" 
        subtitle="Auditoría de espacios y validación de documentos legales" 
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#7c3aed1a] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#f59e0b] flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e1b4b]">{salas.filter(s => s.estado === 'pendiente').length}</p>
              <p className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider">Pendientes de Revisión</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#7c3aed1a] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#d1fae5] text-[#10b981] flex items-center justify-center">
              <Check size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e1b4b]">{salas.filter(s => s.estado === 'verificada').length}</p>
              <p className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider">Salas Verificadas</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#7c3aed1a] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#fee2e2] text-[#ef4444] flex items-center justify-center">
              <Ban size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e1b4b]">{salas.filter(s => s.estado === 'rechazada').length}</p>
              <p className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider">Solicitudes Rechazadas</p>
            </div>
          </div>
        </div>

        {/* Toolbar de Búsqueda */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#7c3aed1a] shadow-sm">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#7c3aed] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, ID o propietario..." 
              className="w-full pl-12 pr-4 py-3 bg-[#f8f6ff] border border-transparent rounded-xl focus:bg-white focus:border-[#7c3aed] transition-all outline-none text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-[#6b7280] bg-[#f3f4f6] rounded-lg hover:bg-[#e5e7eb] transition-colors">Exportar Reporte</button>
          </div>
        </div>

        {/* Grid de Salas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSalas.map((sala) => (
            <div key={sala.id} className="group bg-white rounded-[2rem] border border-[#7c3aed1a] overflow-hidden hover:shadow-xl hover:shadow-[#7c3aed10] transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={sala.fotos[0]} alt={sala.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4">
                   <StatusBadge estado={sala.estado} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-[#1e1b4b] text-lg leading-tight">{sala.nombre}</h3>
                  <span className="text-[10px] font-black bg-[#f8f6ff] text-[#8b5cf6] px-2 py-1 rounded-md uppercase">{sala.tipo}</span>
                </div>
                <p className="text-sm text-[#6b7280] flex items-center gap-1.5 mb-6 font-medium">
                  <MapPin size={14} className="text-[#7c3aed]" /> {sala.direccion}
                </p>
                
                <button 
                  onClick={() => { setSelectedSala(sala); setShowModal(true); }}
                  className="w-full py-3 bg-[#f0edff] text-[#7c3aed] rounded-xl font-bold text-sm hover:bg-[#7c3aed] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Revisar Expediente <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE DETALLE */}
      {showModal && selectedSala && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-[0_25px_50px_-12px_rgba(124,58,237,0.25)] border border-white/20 animate-scale-in">
            {/* Cabecera */}
            <div className="p-8 border-b border-[#f3f4f6] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#7c3aed] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#7c3aed25]">
                  <Shield size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1e1b4b]">Expediente de Verificación</h2>
                  <p className="text-[#6b7280] font-bold text-xs uppercase tracking-[0.2em]">ID de registro: {selectedSala.id}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 hover:bg-[#f8f6ff] rounded-2xl transition-colors">
                <X size={24} className="text-[#6b7280]" />
              </button>
            </div>

            <div className="overflow-y-auto p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Columna Izquierda: Info y Documentos */}
                <div className="lg:col-span-7 space-y-10">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-1 w-8 bg-[#7c3aed] rounded-full" />
                      <h3 className="font-black text-[#1e1b4b] uppercase tracking-widest text-xs">Datos de la Entidad</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                      <InfoBlock icon={<Building2 />} label="Nombre Legal" value={selectedSala.nombre} />
                      <InfoBlock icon={<User />} label="Representante" value={selectedSala.propietario} />
                      <InfoBlock icon={<Mail />} label="Correo Electrónico" value={selectedSala.email} />
                      <InfoBlock icon={<Phone />} label="Línea Directa" value={selectedSala.telefono} />
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-1 w-8 bg-[#7c3aed] rounded-full" />
                      <h3 className="font-black text-[#1e1b4b] uppercase tracking-widest text-xs">Documentos de Soporte</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedSala.documentos.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[#f8f6ff] rounded-2xl border border-[#7c3aed1a] group hover:border-[#7c3aed40] transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <FileText className="text-[#7c3aed]" size={20} />
                            </div>
                            <span className="text-sm font-bold text-[#4b5563]">{doc}</span>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2 text-[#9ca3af] hover:text-[#7c3aed]"><Eye size={16}/></button>
                             <button className="p-2 text-[#9ca3af] hover:text-[#7c3aed]"><Download size={16}/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Columna Derecha: Fotos */}
                <div className="lg:col-span-5 space-y-6">
                   <div className="flex items-center gap-2 mb-6">
                      <div className="h-1 w-8 bg-[#7c3aed] rounded-full" />
                      <h3 className="font-black text-[#1e1b4b] uppercase tracking-widest text-xs">Inspección Visual</h3>
                    </div>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSala.fotos.map((foto: any, i: number) => (
                      <div key={i} className="relative group/img rounded-2xl overflow-hidden aspect-square border border-[#7c3aed1a]">
                        <img src={foto} alt="Evidencia" className="w-full h-full object-cover" />
                        <button className="absolute inset-0 bg-[#7c3aed]/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                           <ExternalLink className="text-white" size={24} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#f0edff] p-4 rounded-2xl border border-[#7c3aed21]">
                    <p className="text-[11px] text-[#7c3aed] font-bold leading-relaxed">
                      💡 Asegúrese de que las fotos coincidan con la dirección registrada y muestren el equipo técnico mencionado en la descripción.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer de Decisiones */}
            <div className="p-8 bg-[#f8f6ff] border-t border-[#7c3aed1a] flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => handleUpdateEstado(selectedSala.id, 'verificada')}
                className="flex-[2] py-4 bg-[#10b981] text-white font-black rounded-2xl hover:bg-[#059669] shadow-xl shadow-[#10b98125] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                <Check size={20} /> Aprobar y Habilitar en Mapa
              </button>
              <button 
                onClick={() => handleUpdateEstado(selectedSala.id, 'rechazada')}
                className="flex-1 py-4 bg-white text-[#dc2626] border border-[#fecaca] font-black rounded-2xl hover:bg-[#fef2f2] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                <Ban size={20} /> Denegar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ estado }: { estado: string }) {
  const styles = {
    pendiente: 'bg-[#f59e0b] shadow-[#f59e0b25] text-white',
    verificada: 'bg-[#10b981] shadow-[#10b98125] text-white',
    rechazada: 'bg-[#ef4444] shadow-[#ef444425] text-white'
  }
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${styles[estado as keyof typeof styles]}`}>
      {estado}
    </span>
  )
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-[#9ca3af] mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-[#6b7280] uppercase tracking-tighter mb-0.5">{label}</p>
        <p className="text-[#4b5563] font-bold text-sm leading-snug">{value}</p>
      </div>
    </div>
  )
}