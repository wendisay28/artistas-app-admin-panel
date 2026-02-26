'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Upload, User, MapPin, Building, KeyRound, ShieldCheck, RefreshCw, ArrowLeft } from "lucide-react";
import Header from '@/components/Header'

export default function CreateCompanyPage() {
  const router = useRouter()
  const [password, setPassword] = useState("G4l3r1a!2026");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomPassword = () => {
    setIsGenerating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTimeout(() => {
      setPassword(newPass);
      setIsGenerating(false);
    }, 400);
  };

  const handleCreate = () => {
    console.log("Nueva empresa registrada en BuscArt");
  };

  return (
    <div className="min-h-screen bg-[#f8f6ff] pb-12">
      <Header 
        title="Crear Nueva Empresa" 
        subtitle="Registra una nueva empresa y genera sus credenciales de acceso seguro" 
      />

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
          
          {/* Header del Card (Ajustado al estilo de la tabla de artistas) */}
          <div className="bg-[#f9fafb] border-b border-[#f3f4f6] p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#1e1b4b]">Formulario de Registro</h2>
                <p className="text-sm text-[#6b7280] mt-1">Infraestructura logística para el arte emergente.</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2.5 bg-[#f0edff] border border-[#7c3aed] rounded-lg shadow-sm hover:bg-[#7c3aed] hover:shadow-md transition-all group"
                >
                  <ArrowLeft size={18} className="text-[#7c3aed] group-hover:text-white transition-colors" />
                </button>
                <div className="bg-[#f0edff] p-3 rounded-xl">
                  <Building className="w-6 h-6 text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Formulario Izquierda */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2 block">Nombre de la Empresa</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all text-sm text-[#111827]" 
                    placeholder="Ej. Galería Bogotá" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2 block">Ubicación</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={16} />
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed10] outline-none transition-all text-sm" 
                        placeholder="Ciudad" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2 block">Tipo de Negocio</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg focus:border-[#7c3aed] outline-none transition-all text-sm text-[#111827] appearance-none">
                      <option>Galería de Arte</option>
                      <option>Centro Cultural</option>
                      <option>Agencia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2 block">Fotos del espacio</label>
                  <div className="border-2 border-dashed border-[#e5e7eb] rounded-xl p-10 text-center hover:bg-[#f8f6ff] hover:border-[#7c3aed] transition-all cursor-pointer group">
                    <Upload className="mx-auto mb-2 text-[#9ca3af] group-hover:text-[#7c3aed] transition-colors" size={24} />
                    <p className="text-sm font-medium text-[#6b7280]">Cargar imágenes de la sede</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credenciales Derecha */}
            <div className="space-y-6">
              <div className="bg-[#f8f6ff] border border-[#7c3aed1a] p-6 rounded-2xl space-y-5">
                <h3 className="text-sm font-bold text-[#7c3aed] uppercase flex items-center gap-2">
                  <KeyRound size={16} /> Credenciales
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#6b7280] uppercase mb-1.5 block">Usuario de acceso</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={14} />
                      <input 
                        type="text" 
                        className="w-full pl-9 pr-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm outline-none focus:border-[#7c3aed]" 
                        placeholder="usuario_buscart" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#6b7280] uppercase mb-1.5 block">Contraseña Temporal</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={password} 
                        className="flex-1 px-3 py-2 bg-white border border-[#e5e7eb] rounded-lg font-mono text-xs text-[#7c3aed] font-bold outline-none" 
                      />
                      <button 
                        onClick={generateRandomPassword} 
                        className="p-2 bg-white border border-[#e5e7eb] rounded-lg hover:text-[#7c3aed] hover:border-[#7c3aed] transition-all"
                      >
                        <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#ecfdf5] rounded-lg border border-[#0596691a] flex gap-3">
                  <ShieldCheck className="text-[#059669] shrink-0" size={18} />
                  <p className="text-[11px] font-medium text-[#059669] leading-tight">Cuenta verificada automáticamente por sistema.</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  onClick={handleCreate} 
                  className="w-full py-2.5 bg-[#7c3aed] text-white text-sm font-bold rounded-lg hover:bg-[#5b21b6] transition-colors shadow-sm"
                >
                  Confirmar Registro
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}