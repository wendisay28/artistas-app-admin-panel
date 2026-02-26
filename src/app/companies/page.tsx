'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Plus, Search, MapPin, Eye, Edit, Building, MoreVertical, Briefcase, CheckCircle, Shield } from 'lucide-react'
import VerificationBadge from '@/components/VerificationBadge'
import KYCModal from '@/components/KYCModal'
import EditArtistModal from '@/components/EditArtistModal'

// Datos de ejemplo para Empresas (siguiendo tu estructura de Artistas)
interface Empresa {
  id: string
  nombre: string
  categoria: string
  especialidad: string
  eventos: string
  estado: 'activo' | 'inactivo'
  ubicacion: string
  verificacion: 'verificado' | 'pendiente' | 'no_verificado' | 'rechazado'
  tipo: 'empresa'
  email?: string
  telefono?: string
  direccion?: string
  representante?: string
  descripcion?: string
  instagram?: string
  sitioWeb?: string
  tarifaMin?: string
  tarifaMax?: string
}

const empresas: Empresa[] = [
  { id: 'EMP-001', nombre: 'Galería Central', categoria: 'Galería de Arte', especialidad: 'Exposiciones', eventos: '12', estado: 'activo', ubicacion: 'Bogotá', verificacion: 'verificado', tipo: 'empresa' },
  { id: 'EMP-002', nombre: 'Teatro Colón', categoria: 'Centro Cultural', especialidad: 'Artes Escénicas', eventos: '45', estado: 'activo', ubicacion: 'Bogotá', verificacion: 'verificado', tipo: 'empresa' },
  { id: 'EMP-003', nombre: 'Agencia Vision', categoria: 'Agencia', especialidad: 'Representación', eventos: '8', estado: 'activo', ubicacion: 'Medellín', verificacion: 'verificado', tipo: 'empresa' },
  { id: 'EMP-004', nombre: 'Museo Moderno', categoria: 'Galería de Arte', especialidad: 'Contemporáneo', eventos: '30', estado: 'activo', ubicacion: 'Cali', verificacion: 'verificado', tipo: 'empresa' },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  activo: { label: 'Activo', className: 'bg-[#ecfdf5] text-[#059669]' },
  inactivo: { label: 'Inactivo', className: 'bg-[#fef2f2] text-[#dc2626]' },
}

const categoriasFiltro = ['Todos', 'Galería de Arte', 'Centro Cultural', 'Agencia']

export default function EmpresasPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [catActiva, setCatActiva] = useState('Todos')
  
  // Estado para modales
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)
  const [viewingEmpresa, setViewingEmpresa] = useState<Empresa | null>(null)
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)

  const filtered = empresas.filter((e) => {
    const matchSearch = e.nombre.toLowerCase().includes(search.toLowerCase()) ||
                        e.id.toLowerCase().includes(search.toLowerCase())
    const matchCat = catActiva === 'Todos' || e.categoria === catActiva
    return matchSearch && matchCat
  })

  // Manejadores de acciones (igual que en artists)
  const handleViewDetails = (empresa: Empresa) => {
    setViewingEmpresa(empresa)
    // Aquí podrías abrir un modal con galería de imágenes del sitio
    console.log('Viendo detalles de:', empresa.nombre)
  }

  const handleEdit = (empresa: Empresa) => {
    setEditingEmpresa(empresa)
  }

  const handleVerification = (empresa: Empresa) => {
    setSelectedEmpresa(empresa)
  }

  const handleSaveEdit = (data: any) => {
    console.log('Guardando cambios:', data)
    setEditingEmpresa(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Directorio de Empresas" subtitle="Gestiona las instituciones y aliados de la red" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen rápido (Estilo Artistas) */}
        <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Empresas Aliadas</span>
                <span className="text-lg font-bold text-[#1e1b4b]">{empresas.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Sedes Activas</span>
                <span className="text-lg font-bold text-[#7c3aed] flex items-center gap-1">
                    <MapPin size={16} /> {empresas.filter(e => e.estado === 'activo').length}
                </span>
            </div>
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categoriasFiltro.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border border-[#e5e7eb] bg-white cursor-pointer transition-all ${
                  catActiva === cat ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'hover:bg-gray-50 text-[#6b7280]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none w-[240px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
              />
            </div>
            <button 
              onClick={() => router.push('/companies/create')}
              className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-lg hover:bg-[#5b21b6] transition-colors"
            >
              <Plus size={16} />
              Nueva Empresa
            </button>
          </div>
        </div>

        {/* Tabla Estilo Artistas */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[#f3f4f6] text-sm text-[#6b7280] flex justify-between items-center">
            <span>{filtered.length} empresas registradas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Empresa</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Ubicación</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Eventos</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Verificación</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-[#f8f6ff] transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{e.id}</td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors">{e.nombre}</span>
                            <span className="text-xs text-[#6b7280]">{e.especialidad}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#f0edff] text-[#7c3aed] rounded-lg">
                            {e.categoria}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4b5563]">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-[#9ca3af]" />
                            {e.ubicacion}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4b5563] font-medium">{e.eventos}</td>
                    <td className="px-6 py-4">
                      <VerificationBadge status={e.verificacion} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[e.estado].className}`}>
                        {statusConfig[e.estado].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleViewDetails(e)}
                          className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#7c3aed] hover:shadow-sm transition-all"
                          title="Ver detalles y galería"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(e)}
                          className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#7c3aed] hover:shadow-sm transition-all"
                          title="Editar información"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleVerification(e)}
                          className={`p-1.5 rounded-md transition-all ${
                            e.verificacion === 'verificado' 
                              ? 'text-emerald-600 hover:bg-emerald-50' 
                              : 'text-[#9ca3af] hover:bg-white hover:text-[#7c3aed]'
                          } hover:shadow-sm`}
                          title={e.verificacion === 'verificado' ? 'Verificación completa' : 'Verificar empresa'}
                        >
                          {e.verificacion === 'verificado' ? <Shield size={16} /> : <CheckCircle size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modales - igual que en artists page */}
      {selectedEmpresa && (
        <KYCModal
          isOpen={!!selectedEmpresa}
          onClose={() => setSelectedEmpresa(null)}
          user={{
            id: selectedEmpresa.id,
            nombre: selectedEmpresa.nombre,
            tipo: 'empresa',
            verificacion: selectedEmpresa.verificacion,
            categoria: selectedEmpresa.categoria,
            ubicacion: selectedEmpresa.ubicacion,
            eventos: selectedEmpresa.eventos
          }}
        />
      )}
      
      {editingEmpresa && (
        <EditArtistModal
          isOpen={!!editingEmpresa}
          onClose={() => setEditingEmpresa(null)}
          artist={editingEmpresa}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}