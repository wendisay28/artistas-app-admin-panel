// ─── TIPOS COMPARTIDOS PARA ARTISTAS Y EMPRESAS ───────────────────────────────────

export type EntityType = 'artista' | 'empresa'

export interface BaseEntity {
  id: string
  nombre: string
  categoria: string
  especialidad: string
  estado: 'activo' | 'inactivo' | 'en evento'
  verificacion: 'verificado' | 'pendiente' | 'no_verificado' | 'rechazado'
  descripcion?: string
  email?: string
  telefono?: string
  instagram?: string
  spotify?: string
  sitioWeb?: string
  avatarUrl?: string | null
  tarifaMin?: string
  tarifaMax?: string
}

export interface Artista extends BaseEntity {
  tipo: 'artista'
  // Campos específicos de artistas
  biografia?: string
  estilo?: string
  experiencia?: string
}

export interface Empresa extends BaseEntity {
  tipo: 'empresa'
  // Campos específicos de empresas
  direccion?: string
  representante?: string
  eventos?: string
  razonSocial?: string
  nit?: string
  capacidad?: string
}

export type Entity = Artista | Empresa

// ─── INTERFACES PARA MODALES ─────────────────────────────────────────────────────

export interface KYCUser {
  id: string
  nombre: string
  verificacion: 'pendiente' | 'verificado' | 'rechazado' | 'no_verificado'
  aprobadoPor?: string
  fechaAprobacion?: string
  motivoRechazo?: string
  tipo: EntityType
  categoria?: string
  ubicacion?: string
  eventos?: string
}

export interface EditEntityModalProps {
  isOpen: boolean
  onClose: () => void
  entity: Entity
  onSave: (data: Entity) => void
  tipo: EntityType
}

// ─── CONFIGURACIONES ───────────────────────────────────────────────────────────

export const CATEGORIAS_ARTISTA = ['Mariachi', 'DJ', 'Música', 'Comedia', 'Danza', 'Banda', 'Magia', 'Fotógrafo']
export const CATEGORIAS_EMPRESA = ['Galería de Arte', 'Centro Cultural', 'Agencia', 'Productora', 'Teatro', 'Museo', 'Estudio', 'Evento']

export const ESPECIALIDADES_ARTISTA: Record<string, string[]> = {
  Mariachi: ['Regional', 'Tradicional', 'Moderno', 'Ranchero'],
  DJ: ['Electrónica', 'House', 'Techno', 'Hip-Hop', 'Reggaetón'],
  Música: ['Boleros', 'Rock', 'Pop', 'Jazz', 'Clásica'],
  Comedia: ['Sátira', 'Stand-up', 'Imitación', 'Humor negro'],
  Danza: ['Folclórica', 'Contemporánea', 'Ballet', 'Hip-Hop', 'Salsa'],
  Banda: ['Sinaloense', 'Duranguense', 'Norteña', 'Tropical'],
  Magia: ['Ilusionismo', 'Close-up', 'Mentalismo', 'Escapismo'],
  Fotógrafo: ['Eventos', 'Retratos', 'Paisajes', 'Documental'],
}

export const ESPECIALIDADES_EMPRESA: Record<string, string[]> = {
  'Galería de Arte': ['Contemporáneo', 'Clásico', 'Digital', 'Mixto'],
  'Centro Cultural': ['Artes Escénicas', 'Exposiciones', 'Talleres', 'Eventos'],
  'Agencia': ['Representación', 'Booking', 'Promoción', 'Management'],
  'Productora': ['Audiovisual', 'Musical', 'Teatral', 'Eventos'],
  'Teatro': ['Ópera', 'Danza', 'Drama', 'Comedia'],
  'Museo': ['Arte', 'Historia', 'Ciencia', 'Interactivo'],
  'Estudio': ['Grabación', 'Ensayo', 'Producción', 'Postproducción'],
  'Evento': ['Corporativo', 'Social', 'Cultural', 'Deportivo'],
}

export const ESTADO_CONFIG = {
  activo: { label: 'Activo', color: 'bg-[#ecfdf5] text-[#059669] border-emerald-200' },
  'en evento': { label: 'En Evento', color: 'bg-[#eef2ff] text-[#4f46e5] border-indigo-200' },
  inactivo: { label: 'Inactivo', color: 'bg-red-50 text-red-600 border-red-200' },
}

// ─── UTILIDADES ─────────────────────────────────────────────────────────────────

export function isArtista(entity: Entity): entity is Artista {
  return entity.tipo === 'artista'
}

export function isEmpresa(entity: Entity): entity is Empresa {
  return entity.tipo === 'empresa'
}

export function getCategorias(tipo: EntityType): string[] {
  return tipo === 'artista' ? CATEGORIAS_ARTISTA : CATEGORIAS_EMPRESA
}

export function getEspecialidades(tipo: EntityType, categoria: string): string[] {
  const especialidades = tipo === 'artista' ? ESPECIALIDADES_ARTISTA : ESPECIALIDADES_EMPRESA
  return especialidades[categoria] || []
}
