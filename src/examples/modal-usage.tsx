// ─── EJEMPLO DE USO DE MODALES PARA ARTISTAS Y EMPRESAS ───────────────────────────

import { useState } from 'react'
import KYCModal from '@/components/KYCModal'
import EditArtistModal from '@/components/EditArtistModal'
import { KYCUser, Entity, Artista, Empresa } from '@/types/entities'

// Ejemplo de datos de prueba
const artistaEjemplo: Artista = {
  id: 'ART-001',
  nombre: 'Carlos Rodríguez',
  tipo: 'artista',
  categoria: 'Mariachi',
  especialidad: 'Regional',
  estado: 'activo',
  verificacion: 'pendiente',
  descripcion: 'Mariachi profesional con 10 años de experiencia',
  email: 'carlos.mariachi@buscart.com',
  telefono: '+52 55 1234 5678',
  tarifaMin: '1500',
  tarifaMax: '3000',
  instagram: '@carlosmariachi',
  spotify: 'carlos-rodriguez',
  sitioWeb: 'www.carlosmariachi.com'
}

const empresaEjemplo: Empresa = {
  id: 'EMP-001',
  nombre: 'Galería Central',
  tipo: 'empresa',
  categoria: 'Galería de Arte',
  especialidad: 'Contemporáneo',
  estado: 'activo',
  verificacion: 'pendiente',
  descripcion: 'Galería de arte contemporáneo con más de 20 años de experiencia',
  email: 'contacto@galeriacentral.com',
  telefono: '+52 55 8765 4321',
  direccion: 'Av. Principal #123, Col. Centro, Ciudad de México',
  representante: 'Ana Martínez',
  eventos: '24',
  tarifaMin: '5000',
  tarifaMax: '20000',
  instagram: '@galeriacentral',
  sitioWeb: 'www.galeriacentral.com'
}

const kycArtistaEjemplo: KYCUser = {
  id: 'ART-001',
  nombre: 'Carlos Rodríguez',
  tipo: 'artista',
  verificacion: 'pendiente',
  categoria: 'Mariachi',
  ubicacion: 'Ciudad de México',
  eventos: '12'
}

const kycEmpresaEjemplo: KYCUser = {
  id: 'EMP-001',
  nombre: 'Galería Central',
  tipo: 'empresa',
  verificacion: 'pendiente',
  categoria: 'Galería de Arte',
  ubicacion: 'Ciudad de México',
  eventos: '24'
}

// Componente de ejemplo
export default function ModalTestPage() {
  const [showKYCArtista, setShowKYCArtista] = useState(false)
  const [showKYCEmpresa, setShowKYCEmpresa] = useState(false)
  const [showEditArtista, setShowEditArtista] = useState(false)
  const [showEditEmpresa, setShowEditEmpresa] = useState(false)

  const handleSave = (data: Entity) => {
    console.log('Guardando datos:', data)
    // Aquí iría la lógica para guardar en la base de datos
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Prueba de Modales</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Botones para KYC */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Modal KYC</h2>
          <button
            onClick={() => setShowKYCArtista(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ver KYC Artista
          </button>
          <button
            onClick={() => setShowKYCEmpresa(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Ver KYC Empresa
          </button>
        </div>

        {/* Botones para Editar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Modal Edición</h2>
          <button
            onClick={() => setShowEditArtista(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Editar Artista
          </button>
          <button
            onClick={() => setShowEditEmpresa(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Editar Empresa
          </button>
        </div>
      </div>

      {/* Modales KYC */}
      <KYCModal
        isOpen={showKYCArtista}
        onClose={() => setShowKYCArtista(false)}
        user={kycArtistaEjemplo}
      />

      <KYCModal
        isOpen={showKYCEmpresa}
        onClose={() => setShowKYCEmpresa(false)}
        user={kycEmpresaEjemplo}
      />

      {/* Modales de Edición */}
      <EditArtistModal
        isOpen={showEditArtista}
        onClose={() => setShowEditArtista(false)}
        artist={artistaEjemplo}
        onSave={handleSave}
      />

      <EditArtistModal
        isOpen={showEditEmpresa}
        onClose={() => setShowEditEmpresa(false)}
        artist={empresaEjemplo}
        onSave={handleSave}
      />
    </div>
  )
}

// ─── INSTRUCCIONES DE USO ───────────────────────────────────────────────────────

/*
Para usar los modales en tu aplicación:

1. **KYC Modal**:
   - Acepta tanto artistas como empresas mediante la propiedad `tipo`
   - Muestra diferentes documentos según el tipo:
     * Artistas: Cédula frontal/reverso, selfie, RUT
     * Empresas: NIT, Cámara de comercio, RUT empresa, cédula representante
   - La lista de verificación se adapta según el tipo

2. **Edit Modal**:
   - Detecta automáticamente si es artista o empresa por la propiedad `tipo`
   - Muestra campos específicos según el tipo:
     * Artistas: Tarifa mínima/máxima, biografía
     * Empresas: Teléfono, dirección, representante legal, eventos/año
   - Las categorías y especialidades cambian dinámicamente

3. **Tipado**:
   - Usa los tipos importados desde `@/types/entities`
   - `Entity` es el tipo unificado para artistas y empresas
   - `KYCUser` para el modal de verificación

4. **Ejemplo de integración**:
   ```tsx
   // Para abrir KYC de un artista
   <KYCModal
     isOpen={showModal}
     onClose={() => setShowModal(false)}
     user={artistaData}
   />

   // Para editar una empresa
   <EditArtistModal
     isOpen={showEdit}
     onClose={() => setShowEdit(false)}
     artist={empresaData}
     onSave={handleSave}
   />
   ```
*/
