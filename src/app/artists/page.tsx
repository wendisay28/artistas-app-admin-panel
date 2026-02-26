'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import { Plus, Search, Star, MapPin, Eye, Edit, UserPlus, MoreVertical, CheckCircle, Shield } from 'lucide-react'
import VerificationBadge from '@/components/VerificationBadge'
import KYCModal from '@/components/KYCModal'
import ArtistDetailModal from '@/components/ArtistDetailModal'
import EditArtistModal from '@/components/EditArtistModal'
import CreateArtistModal from '@/components/CreateArtistModal'

// Datos de ejemplo para Artistas
interface Artista {
  id: string
  nombre: string
  categoria: string
  especialidad: string
  calificacion: number
  estado: 'activo' | 'en evento' | 'inactivo'
  ubicacion: string
  verificacion: 'verificado' | 'pendiente' | 'no_verificado' | 'rechazado'
}

const artistas: Artista[] = [
  { id: 'ART-001', nombre: 'María Reyes', categoria: 'Mariachi', especialidad: 'Regional', calificacion: 4.9, estado: 'activo', ubicacion: 'Monterrey', verificacion: 'verificado' },
  { id: 'ART-002', nombre: 'DJ Pulso', categoria: 'DJ', especialidad: 'Electrónica', calificacion: 4.7, estado: 'en evento', ubicacion: 'Guadalajara', verificacion: 'pendiente' },
  { id: 'ART-003', nombre: 'Trío Elegance', categoria: 'Música', especialidad: 'Boleros', calificacion: 4.8, estado: 'activo', ubicacion: 'CDMX', verificacion: 'verificado' },
  { id: 'ART-004', nombre: 'Stand-up Rojas', categoria: 'Comedia', especialidad: 'Sátira', calificacion: 4.5, estado: 'inactivo', ubicacion: 'CDMX', verificacion: 'no_verificado' },
  { id: 'ART-005', nombre: 'Ballet Folclórico', categoria: 'Danza', especialidad: 'Tradicional', calificacion: 5.0, estado: 'activo', ubicacion: 'Oaxaca', verificacion: 'rechazado' },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  activo: { label: 'Activo', className: 'bg-[#ecfdf5] text-[#059669]' },
  'en evento': { label: 'En Evento', className: 'bg-[#eef2ff] text-[#4f46e5]' },
  inactivo: { label: 'Inactivo', className: 'bg-[#fef2f2] text-[#dc2626]' },
}

const categoriasFiltro = ['Todos', 'Mariachi', 'DJ', 'Música', 'Comedia', 'Danza']

export default function ArtistasPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [catActiva, setCatActiva] = useState('Todos')
  const [selectedArtist, setSelectedArtist] = useState<Artista | null>(null)
  const [viewingArtist, setViewingArtist] = useState<Artista | null>(null)
  const [editingArtist, setEditingArtist] = useState<Artista | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Check if we should open create modal from URL parameter
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setIsCreateModalOpen(true)
      // Clean URL
      router.replace('/artists')
    }
  }, [searchParams, router])

  const handleCreateArtist = (artistData: any) => {
    console.log('Creando nuevo artista:', artistData)
    // Aquí iría la lógica para crear un artista
    // Por ahora solo simulamos la creación
    alert(`Artista "${artistData.nombre}" creado exitosamente`)
    setIsCreateModalOpen(false)
  }

  const filtered = artistas.filter((a) => {
    const matchSearch = a.nombre.toLowerCase().includes(search.toLowerCase()) ||
                        a.id.toLowerCase().includes(search.toLowerCase())
    const matchCat = catActiva === 'Todos' || a.categoria === catActiva
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Directorio de Artistas" subtitle="Gestiona la base de datos de talento emergente" />

      <div className="px-6 py-8 flex flex-col gap-5">
        
        {/* Resumen rápido */}
        <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Total Artistas</span>
                <span className="text-lg font-bold text-[#1e1b4b]">{artistas.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-[#7c3aed1a] shadow-sm">
                <span className="text-xs text-[#6b7280] block">Promedio Red</span>
                <span className="text-lg font-bold text-[#f59e0b] flex items-center gap-1">
                    <Star size={16} fill="#f59e0b" /> 4.8
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
                placeholder="Buscar artista..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none w-[240px] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all bg-white"
              />
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-lg hover:bg-[#5b21b6] transition-colors"
            >
              <UserPlus size={16} />
              Nuevo Artista
            </button>
          </div>
        </div>

        {/* Tabla Estilo Contratos */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[#f3f4f6] text-sm text-[#6b7280] flex justify-between items-center">
            <span>{filtered.length} artistas registrados</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Artista</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Ubicación</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Verificación</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-[#6b7280] font-bold tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[#f8f6ff] transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-[#9ca3af]">{a.id}</td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111827] group-hover:text-[#7c3aed] transition-colors">{a.nombre}</span>
                            <span className="text-xs text-[#6b7280]">{a.especialidad}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#f0edff] text-[#7c3aed] rounded-lg">
                            {a.categoria}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4b5563]">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-[#9ca3af]" />
                            {a.ubicacion}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#f59e0b]">
                            <Star size={14} fill="#f59e0b" /> {a.calificacion}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <VerificationBadge status={a.verificacion} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[a.estado].className}`}>
                        {statusConfig[a.estado].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => setViewingArtist(a)}
                          className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#7c3aed] hover:shadow-sm transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingArtist(a)}
                          className="p-1.5 rounded-md text-[#9ca3af] hover:bg-white hover:text-[#7c3aed] hover:shadow-sm transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => setSelectedArtist(a)}
                          className={`p-1.5 rounded-md transition-all ${
                            a.verificacion === 'verificado' 
                              ? 'text-emerald-600 hover:bg-emerald-50' 
                              : 'text-[#9ca3af] hover:bg-white hover:text-[#7c3aed]'
                          } hover:shadow-sm`}
                        >
                          {a.verificacion === 'verificado' ? <Shield size={16} /> : <CheckCircle size={16} />}
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

      {/* Modales */}
      {selectedArtist && (
        <KYCModal
          isOpen={!!selectedArtist}
          onClose={() => setSelectedArtist(null)}
          user={{
            id: selectedArtist.id,
            nombre: selectedArtist.nombre,
            tipo: 'artista',
            verificacion: selectedArtist.verificacion,
            categoria: selectedArtist.categoria,
            ubicacion: selectedArtist.ubicacion
          }}
        />
      )}

      {viewingArtist && (
        <ArtistDetailModal
          isOpen={!!viewingArtist}
          onClose={() => setViewingArtist(null)}
          artist={viewingArtist}
        />
      )}

      {editingArtist && (
        <EditArtistModal
          isOpen={!!editingArtist}
          onClose={() => setEditingArtist(null)}
          artist={editingArtist}
          onSave={(updatedArtist: any) => {
            console.log('Guardando cambios:', updatedArtist)
            // Aquí iría la lógica para guardar
          }}
        />
      )}

      <CreateArtistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateArtist}
      />
    </div>
  )
}
