'use client'

import { useState } from "react"
import { Upload, Lock, User, MapPin, Building, KeyRound, ShieldCheck, RefreshCw } from "lucide-react";
import Header from '@/components/Header'

export default function CreateCompanyPage() {
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
    // Aquí conectarías con tu backend en el futuro
  };

  return (
    <div className="min-h-screen bg-[#fafaff]">
      <Header 
        title="Crear Nueva Empresa" 
        subtitle="Registra una nueva empresa y genera sus credenciales de acceso seguro" 
      />

      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Crear Nueva Empresa</h2>
                <p className="text-white/80 mt-2 font-medium italic">Infraestructura logística para el arte emergente.</p>
              </div>
              <Building className="w-12 h-12 text-white/20 hidden sm:block" />
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario Izquierda */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-6">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Nombre de la Empresa</label>
                  <input type="text" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-700" placeholder="Ej. Galería Bogotá" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Ubicación</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" placeholder="Ciudad" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Tipo de Negocio</label>
                    <select className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                      <option>Galería de Arte</option>
                      <option>Centro Cultural</option>
                      <option>Agencia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Fotos del espacio</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-white transition-all cursor-pointer group">
                    <Upload className="mx-auto mb-2 text-indigo-500 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-bold text-slate-500">Cargar imágenes de la sede</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credenciales Derecha */}
            <div className="space-y-6">
              <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-3xl space-y-6">
                <h3 className="text-sm font-black text-indigo-900 uppercase flex items-center gap-2">
                  <KeyRound size={18} /> Credenciales
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Usuario de acceso</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none" placeholder="usuario_buscart" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Contraseña Temporal</label>
                    <div className="flex gap-2">
                      <input type="text" readOnly value={password} className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl font-mono font-bold text-xs text-indigo-600 outline-none" />
                      <button onClick={generateRandomPassword} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                        <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
                  <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                  <p className="text-[10px] font-bold text-emerald-800 leading-tight">Esta cuenta será verificada automáticamente al ser creada por un administrador.</p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button onClick={handleCreate} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                  Confirmar Registro
                </button>
                <button className="w-full py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase text-xs tracking-widest">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
