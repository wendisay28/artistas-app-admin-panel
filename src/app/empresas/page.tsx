'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Building, Plus, Eye, EyeOff, Copy, Check, X, Search, ShieldCheck, ShieldAlert, Clock } from 'lucide-react'

// Interface para Empresa
interface Empresa {
  id: string
  nombre: string
  rfc: string
  email: string
  telefono: string
  direccion: string
  estado: 'pendiente' | 'verificado' | 'suspendido'
  fechaRegistro: string
  usuario: string
  contraseña: string
  descripcion?: string
  logo?: string
}

// Datos de ejemplo
const empresasData: Empresa[] = [
  {
    id: 'E-001',
    nombre: 'Corporativo Artistas del Norte',
    rfc: 'CAN270123456789',
    email: 'contacto@artistasdelnorte.com',
    telefono: '+52 81 1234 5678',
    direccion: 'Av. Principal #123, Monterrey, NL',
    estado: 'verificado',
    fechaRegistro: '2026-01-15',
    usuario: 'corpdelnorte',
    contraseña: 'temp123',
    descripcion: 'Empresa especializada en contratación de artistas para eventos corporativos.'
  },
  {
    id: 'E-002',
    nombre: 'Eventos Premium MX',
    rfc: 'MEX123456789',
    email: 'info@eventospremium.com',
    telefono: '+52 55 9876 5432',
    direccion: 'Calle Reforma #456, Guadalajara, Jalisco',
    estado: 'pendiente',
    fechaRegistro: '2026-02-10',
    usuario: 'eventosmx',
    contraseña: 'temp456',
    descripcion: 'Plataforma de eventos premium para artistas de alto nivel.'
  },
  {
    id: 'E-003',
    nombre: 'Producciones Creativas SA',
    rfc: 'COL123456789',
    email: 'contacto@producciones.com',
    telefono: '+57 1 300 1234 5678',
    direccion: 'Carrera 50 #789, Bogotá, D.C.',
    estado: 'verificado',
    fechaRegistro: '2026-01-20',
    usuario: 'producciones',
    contraseña: 'temp789',
    descripcion: 'Productora de eventos y contenido creativo.'
  },
  {
    id: 'E-004',
    nombre: 'Salón El Imperio',
    rfc: 'MEX123456789',
    email: 'contacto@salonimperial.com',
    telefono: '+52 81 1234 5678',
    direccion: 'Calle Luna #123, CDMX',
    estado: 'suspendido',
    fechaRegistro: '2026-01-25',
    usuario: 'salonimp',
    contraseña: 'temp012',
    descripcion: 'Salón de eventos para fiestas y celebraciones.'
  }
]

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasData)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '', rfc: '', email: '', telefono: '', direccion: ''
  })

  // Lógica de Filtrado
  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Acciones (Copiado, Toggle Pass, etc)
  const togglePassword = (id: string) => setShowPassword(prev => ({ ...prev, [id]: !prev[id] }))

  const copyCredentials = (empresa: Empresa) => {
    navigator.clipboard.writeText(`Usuario: ${empresa.usuario}\nPass: ${empresa.contraseña}`)
    setCopiedId(empresa.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de generación simplificada para el ejemplo
    const newEmpresa: Empresa = {
      id: `E-${String(empresas.length + 1).padStart(3, '0')}`,
      ...formData,
      estado: 'pendiente',
      fechaRegistro: new Date().toISOString().split('T')[0],
      usuario: formData.nombre.toLowerCase().slice(0, 5) + '26',
      contraseña: Math.random().toString(36).slice(-8)
    }
    setEmpresas([...empresas, newEmpresa])
    setShowModal(false)
    setFormData({ nombre: '', rfc: '', email: '', telefono: '', direccion: '' })
  }

  return (
    <div className="min-h-screen bg-[#f8f6ff]">
      <Header title="Gestión de Empresas" subtitle="Registra nuevas empresas y gestiona accesos" />

      <div className="p-8 space-y-6">
        {/* Action Bar */}
        <div className="bg-white/70 backdrop-blur-md p-4 rounded-[24px] border border-[#7c3aed1a] flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b5cf6]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, RFC o email..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-[#7c3aed1a] rounded-xl outline-none focus:ring-4 focus:ring-[#7c3aed0d] transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-100"
          >
            <Plus size={18} /> Nueva Empresa
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[28px] border border-[#7c3aed1a] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfaff] border-b border-[#7c3aed1a]">
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-[#8b5cf6] tracking-widest">ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-[#8b5cf6] tracking-widest">Empresa</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-[#8b5cf6] tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-[#8b5cf6] tracking-widest">Credenciales</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-[#8b5cf6] tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7c3aed0a]">
                {filteredEmpresas.map((empresa) => (
                  <tr key={empresa.id} className="hover:bg-[#f8f6ff]/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#64748b]">{empresa.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1e1b4b] text-sm">{empresa.nombre}</p>
                      <p className="text-xs text-[#8b5cf6]">{empresa.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      {empresa.estado === 'verificado' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase"><ShieldCheck size={12}/> Verificado</span>
                      )}
                      {empresa.estado === 'pendiente' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase"><Clock size={12}/> Pendiente</span>
                      )}
                      {empresa.estado === 'suspendido' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase"><ShieldAlert size={12}/> Suspendido</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="bg-[#f8f6ff] p-2 rounded-lg border border-[#7c3aed0a] w-fit space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-medium text-[#64748b]">
                          <span className="w-8">User:</span>
                          <span className="font-mono text-[#1e1b4b]">{empresa.usuario}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-[#64748b]">
                          <span className="w-8">Pass:</span>
                          <span className="font-mono text-[#1e1b4b] tracking-wider">
                            {showPassword[empresa.id] ? empresa.contraseña : '••••••••'}
                          </span>
                          <button onClick={() => togglePassword(empresa.id)} className="ml-1 text-[#8b5cf6] hover:text-[#7c3aed]">
                            {showPassword[empresa.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => copyCredentials(empresa)}
                          className="p-2 rounded-lg bg-white border border-[#7c3aed1a] text-[#8b5cf6] hover:bg-[#7c3aed] hover:text-white transition-all shadow-sm"
                          title="Copiar credenciales"
                        >
                          {copiedId === empresa.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        {empresa.estado === 'pendiente' && (
                          <button 
                            onClick={() => setEmpresas(empresas.map(e => e.id === empresa.id ? {...e, estado: 'verificado'} : e))}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                          >
                            <Check size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal - Registrar Nueva Empresa */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#1e1b4b]">Nueva Empresa</h3>
              <button onClick={() => setShowModal(false)} className="text-[#8b5cf6] hover:bg-[#f8f6ff] p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] ml-1">Nombre Comercial</label>
                <input required className="w-full px-4 py-3 rounded-2xl bg-[#f8f6ff] border border-[#7c3aed1a] outline-none focus:border-[#7c3aed] transition-all text-sm" 
                  value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] ml-1">RFC</label>
                  <input required className="w-full px-4 py-3 rounded-2xl bg-[#f8f6ff] border border-[#7c3aed1a] outline-none focus:border-[#7c3aed] transition-all text-sm" 
                    value={formData.rfc} onChange={e => setFormData({...formData, rfc: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] ml-1">Teléfono</label>
                  <input className="w-full px-4 py-3 rounded-2xl bg-[#f8f6ff] border border-[#7c3aed1a] outline-none focus:border-[#7c3aed] transition-all text-sm" 
                    value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] ml-1">Email de Contacto</label>
                <input required type="email" className="w-full px-4 py-3 rounded-2xl bg-[#f8f6ff] border border-[#7c3aed1a] outline-none focus:border-[#7c3aed] transition-all text-sm" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-[#8b5cf6] hover:bg-[#f8f6ff] rounded-2xl transition-all">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-[#7c3aed] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:scale-[1.02] active:scale-[0.98] transition-all">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}