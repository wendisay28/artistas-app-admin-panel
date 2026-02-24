// src/app/configuration/page.tsx
import Header from '@/components/Header'
import { Bell, Shield, Globe, CreditCard, Save } from 'lucide-react'

export default function ConfiguracionPage() {
  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header title="Configuración" subtitle="Ajustes generales de la plataforma" />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* Sección General */}
        <section className="bg-white border border-[#7c3aed1a] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#7c3aed0a] flex items-center gap-2">
            <Globe size={18} className="text-[#7c3aed]" />
            <h2 className="text-lg font-bold text-[#1e1b4b]">General</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Nombre de la plataforma</label>
              <input 
                type="text" 
                defaultValue="BuscArt" 
                className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Email de contacto</label>
              <input 
                type="email" 
                defaultValue="admin@buscart.com" 
                className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">País / Región</label>
              <select className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all cursor-pointer">
                <option>Colombia</option>
                <option>México</option>
                <option>Argentina</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Moneda</label>
              <select className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all cursor-pointer">
                <option>COP — Peso colombiano</option>
                <option>MXN — Peso mexicano</option>
                <option>USD — Dólar americano</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sección Notificaciones */}
        <section className="bg-white border border-[#7c3aed1a] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#7c3aed0a] flex items-center gap-2">
            <Bell size={18} className="text-[#7c3aed]" />
            <h2 className="text-lg font-bold text-[#1e1b4b]">Notificaciones</h2>
          </div>
          <div className="p-6 flex flex-col gap-4">
            {[
              { label: 'Nuevo contrato creado', desc: 'Recibir alerta cuando se genera un nuevo contrato' },
              { label: 'Nuevo artista registrado', desc: 'Notificación al registrarse un artista nuevo' },
              { label: 'Pago recibido', desc: 'Alerta al confirmarse un pago en la plataforma' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{item.label}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-block w-10 h-6">
                  <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                  <div className="absolute inset-0 bg-[#e5e7eb] rounded-full transition-colors peer-checked:bg-[#7c3aed]"></div>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Seguridad */}
        <section className="bg-white border border-[#7c3aed1a] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#7c3aed0a] flex items-center gap-2">
            <Shield size={18} className="text-[#7c3aed]" />
            <h2 className="text-lg font-bold text-[#1e1b4b]">Seguridad</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Nueva contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Confirmar nueva contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] transition-all" 
              />
            </div>
          </div>
        </section>

        {/* Botón Guardar */}
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white rounded-lg font-medium border-none cursor-pointer transition-opacity hover:opacity-90 shadow-lg shadow-purple-200">
            <Save size={16} />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}