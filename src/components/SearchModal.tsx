'use client'

import { useState, useEffect } from 'react'
import { X, Search, FileText, User, Building, Users, Calendar, MapPin, Star, Clock, ArrowRight } from 'lucide-react'

interface SearchResult {
  id: string
  type: 'artista' | 'empresa' | 'contrato' | 'usuario'
  title: string
  subtitle: string
  details: string
  url: string
  icon: any
  category?: string
  status?: string
  date?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockResults: SearchResult[] = [
  {
    id: 'ART-001',
    type: 'artista',
    title: 'María Reyes',
    subtitle: 'Mariachi Tradicional',
    details: 'Monterrey, Nuevo León • 4.8★ • 15 contratos',
    url: '/artists',
    icon: User,
    category: 'Mariachi',
    status: 'activo'
  },
  {
    id: 'EMP-001',
    type: 'empresa',
    title: 'Bodas del Norte SA',
    subtitle: 'Galería de Arte',
    details: 'Monterrey, NL • 25 eventos anuales',
    url: '/companies',
    icon: Building,
    category: 'Galería de Arte',
    status: 'activo'
  },
  {
    id: 'C-001',
    type: 'contrato',
    title: 'C-001 - María Reyes',
    subtitle: 'Bodas del Norte SA',
    details: '28 Feb 2026 • $12,000 • Monterrey',
    url: '/contracts',
    icon: FileText,
    category: 'Mariachi',
    status: 'activo',
    date: '2026-02-28'
  },
  {
    id: 'USR-001',
    type: 'usuario',
    title: 'Carlos Mendoza',
    subtitle: 'Cliente',
    details: 'carlos@email.com • 3 contratos',
    url: '/users',
    icon: Users,
    category: 'cliente',
    status: 'activo'
  },
  {
    id: 'ART-002',
    type: 'artista',
    title: 'DJ Pulso',
    subtitle: 'DJ Electrónico',
    details: 'Guadalajara, Jalisco • 4.9★ • 22 contratos',
    url: '/artists',
    icon: User,
    category: 'DJ',
    status: 'activo'
  },
  {
    id: 'C-002',
    type: 'contrato',
    title: 'C-002 - DJ Pulso',
    subtitle: 'Club Nocturno Éclat',
    details: '05 Mar 2026 • $8,500 • Guadalajara',
    url: '/contracts',
    icon: FileText,
    category: 'DJ',
    status: 'pendiente',
    date: '2026-03-05'
  }
]

const typeConfig = {
  artista: {
    label: 'Artista',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  },
  empresa: {
    label: 'Empresa',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200'
  },
  contrato: {
    label: 'Contrato',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200'
  },
  usuario: {
    label: 'Usuario',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200'
  }
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (search.trim()) {
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(search.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        result.details.toLowerCase().includes(search.toLowerCase()) ||
        result.id.toLowerCase().includes(search.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [search])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev === 0 ? results.length - 1 : prev - 1)
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleResultClick = (result: SearchResult) => {
    console.log(`Navegando a: ${result.url}`)
    window.location.href = result.url
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] p-4" style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar artistas, empresas, contratos, usuarios..."
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 rounded-xl outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Search Tips */}
          {search === '' && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Búsquedas populares:</span>
              {['María Reyes', 'DJ Pulso', 'Bodas del Norte', 'Contratos activos'].map((tip) => (
                <button
                  key={tip}
                  onClick={() => setSearch(tip)}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tip}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[500px]">
          {search && results.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">No se encontraron resultados</h3>
              <p className="text-sm text-[#6b7280]">Intenta con otros términos de búsqueda</p>
            </div>
          ) : search && results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result, index) => {
                const config = typeConfig[result.type]
                const Icon = result.icon
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-[#7c3aed08]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg ${config.bgColor} ${config.borderColor} border flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={config.iconColor} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-[#1e1b4b]">
                                {result.title}
                              </h3>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.bgColor} ${config.iconColor}`}>
                                {config.label}
                              </span>
                            </div>
                            <p className="text-sm text-[#6b7280] mb-1">{result.subtitle}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              {result.category && (
                                <span className="flex items-center gap-1">
                                  <Star size={12} />
                                  {result.category}
                                </span>
                              )}
                              {result.date && (
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  {result.date}
                                </span>
                              )}
                              {result.details.includes('★') && (
                                <span className="flex items-center gap-1">
                                  <Star size={12} className="text-yellow-500" />
                                  {result.details.split('★')[1]?.trim().split('•')[0]}
                                </span>
                              )}
                              {result.details.includes('Monterrey') && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} />
                                  {result.details.includes('Monterrey') ? 'Monterrey' : result.details.includes('Guadalajara') ? 'Guadalajara' : ''}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <ArrowRight size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(typeConfig).map(([type, config]) => {
                  const count = mockResults.filter(r => r.type === type).length
                  return (
                    <button
                      key={type}
                      onClick={() => setSearch(type)}
                      className="p-4 rounded-xl border border-gray-200 hover:border-[#7c3aed] hover:bg-[#7c3aed08] transition-all text-center"
                    >
                      <div className={`w-8 h-8 rounded-lg ${config.bgColor} ${config.borderColor} border flex items-center justify-center mx-auto mb-2`}>
                        <Search size={16} className={config.iconColor} />
                      </div>
                      <div className="text-sm font-medium text-[#1e1b4b]">{config.label}</div>
                      <div className="text-xs text-gray-500">{count} resultados</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {search && results.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-500">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </span>
            <div className="text-xs text-gray-400">
              Usa ↑↓ para navegar • Enter para seleccionar • Esc para cerrar
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
