'use client'
import { useState } from 'react'
import { Search, Plus, Filter, Star, Edit, Trash2, Eye } from 'lucide-react'

// Interface para Artista
interface Artista {
  id: number
  nombre: string
  categoria: string
  ciudad: string
  rating: number
  contratos: number
  precio: string
  estado: 'activo' | 'inactivo' | 'pendiente'
  foto: string
}

// Datos de ejemplo
const artistas: Artista[] = [
  { id: 1, nombre: 'María Reyes', categoria: 'Mariachi', ciudad: 'CDMX', rating: 4.9, contratos: 32, precio: '$8,000', estado: 'activo', foto: 'MR' },
  { id: 2, nombre: 'DJ Pulso', categoria: 'DJ', ciudad: 'Guadalajara', rating: 4.7, contratos: 18, precio: '$6,500', estado: 'activo', foto: 'DP' },
  { id: 3, nombre: 'Trío Elegance', categoria: 'Trío romántico', ciudad: 'Monterrey', rating: 4.8, contratos: 45, precio: '$5,000', estado: 'activo', foto: 'TE' },
  { id: 4, nombre: 'Stand-up Rojas', categoria: 'Comedia', ciudad: 'CDMX', rating: 4.6, contratos: 12, precio: '$10,000', estado: 'activo', foto: 'SR' },
  { id: 5, nombre: 'Ballet Folclórico', categoria: 'Danza', ciudad: 'Oaxaca', rating: 5.0, contratos: 28, precio: '$18,000', estado: 'activo', foto: 'BF' },
  { id: 6, nombre: 'Banda El Sonido', categoria: 'Banda', ciudad: 'Sinaloa', rating: 4.5, contratos: 9, precio: '$25,000', estado: 'inactivo', foto: 'BS' },
  { id: 7, nombre: 'Saxofonista Luna', categoria: 'Solista', ciudad: 'Puebla', rating: 4.8, contratos: 21, precio: '$4,500', estado: 'activo', foto: 'SL' },
  { id: 8, nombre: 'Mago Ilusión', categoria: 'Magia', ciudad: 'CDMX', rating: 4.3, contratos: 7, precio: '$7,000', estado: 'pendiente', foto: 'MI' },
]

const categorias = ['Todas', 'Mariachi', 'DJ', 'Trío romántico', 'Comedia', 'Danza', 'Banda', 'Solista', 'Magia']

export default function ArtistasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  const filteredArtistas = artistas.filter(artista => {
    const matchSearch = artista.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = categoriaActiva === 'Todas' || artista.categoria === categoriaActiva
    return matchSearch && matchCategoria
  })

  const stats = {
    total: artistas.length,
    activos: artistas.filter(a => a.estado === 'activo').length,
    pendientes: artistas.filter(a => a.estado === 'pendiente').length,
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      {/* Page Header Area */}
      <header className="bg-white/70 backdrop-blur-md sticky top-[76px] z-20 border-b border-[#7c3aed1a] px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Titles */}
          <div>
            <h1 className="text-2xl font-extrabold text-[#1e1b4b] tracking-tight">
              Gestión de Artistas
            </h1>
            <p className="text-sm text-[#8b5cf6] font-medium">
              Administra el talento creativo de tu plataforma
            </p>
          </div>

          {/* Global Stats Sutiles */}
          <div className="flex gap-4">
            {[
              { label: 'Total', value: stats.total, color: 'text-[#1e1b4b]' },
              { label: 'Activos', value: stats.activos, color: 'text-emerald-600' },
              { label: 'Pendientes', value: stats.pendientes, color: 'text-amber-500' },
            ].map((s) => (
              <div key={s.label} className="bg-white px-4 py-2 rounded-2xl border border-[#7c3aed1a] shadow-sm min-w-[90px] text-center">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-[#8b5cf6]/60">{s.label}</span>
                <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b5cf6] group-focus-within:text-[#7c3aed] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o ciudad..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#7c3aed1a] rounded-2xl outline-none focus:ring-4 focus:ring-[#7c3aed0d] focus:border-[#7c3aed4d] transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <select
              value={categoriaActiva}
              onChange={(e) => setCategoriaActiva(e.target.value)}
              className="px-4 py-3 bg-white border border-[#7c3aed1a] rounded-2xl text-sm font-bold text-[#4c1d95] outline-none cursor-pointer hover:border-[#7c3aed4d] transition-colors"
            >
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            
            <button className="bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Nuevo Artista</span>
            </button>
          </div>
        </div>
      </header>

      {/* Grid de Artistas */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredArtistas.map(artista => (
          <div key={artista.id} className="group bg-white border border-[#7c3aed1a] rounded-[28px] p-6 hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300">
            
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f8f6ff] border border-[#7c3aed1a] flex items-center justify-center text-[#7c3aed] font-black text-lg">
                {artista.foto}
              </div>
              <span className={`
                px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                ${artista.estado === 'activo' ? 'bg-emerald-50 text-emerald-600' : 
                  artista.estado === 'pendiente' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'}
              `}>
                {artista.estado}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-extrabold text-[#1e1b4b] group-hover:text-[#7c3aed] transition-colors">
                {artista.nombre}
              </h3>
              <p className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wide">{artista.categoria}</p>
              
              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-[#1e1b4b]">{artista.rating}</span>
                <span className="text-[10px] text-[#8b5cf6] ml-2 font-medium">• {artista.ciudad}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-[#7c3aed0a] mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#8b5cf6]/60 uppercase tracking-tighter">Contratos</p>
                <p className="text-sm font-black text-[#1e1b4b]">{artista.contratos}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#8b5cf6]/60 uppercase tracking-tighter">Precio Base</p>
                <p className="text-sm font-black text-[#7c3aed]">{artista.precio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f8f6ff] text-[#8b5cf6] hover:bg-[#7c3aed] hover:text-white transition-all">
                <Eye size={16} />
                <span className="text-[9px] font-bold mt-1">Ver</span>
              </button>
              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f8f6ff] text-[#8b5cf6] hover:bg-[#7c3aed] hover:text-white transition-all">
                <Edit size={16} />
                <span className="text-[9px] font-bold mt-1">Editar</span>
              </button>
              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f8f6ff] text-red-400 hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={16} />
                <span className="text-[9px] font-bold mt-1">Eliminar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}