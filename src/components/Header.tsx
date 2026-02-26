'use client'

import { useState } from 'react'
import { Bell, Search, Plus, Command } from 'lucide-react'
import CreateModal from './CreateModal'
import NotificationsModal from './NotificationsModal'
import SearchModal from './SearchModal'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const handleCreate = (type: string) => {
    console.log(`Creando nuevo: ${type}`)
    // Aquí redirigiremos a la página correspondiente o abriremos el modal específico
    switch(type) {
      case 'artista':
        window.location.href = '/artists?create=true'
        break
      case 'empresa':
        window.location.href = '/companies?create=true'
        break
      case 'contrato':
        window.location.href = '/contracts?create=true'
        break
      case 'usuario':
        window.location.href = '/users?create=true'
        break
    }
  }
  return (
    <div className="sticky top-0 z-30 w-full font-sans">
      <header className="h-[76px] bg-white/95 backdrop-blur-xl flex items-center px-4 md:px-7">
        <div className="flex items-center gap-4 w-full">
          
          {/* Title - Oculto en móvil para dar espacio a la búsqueda */}
          <div className="hidden md:block shrink-0">
            <h2 className="text-[1.05rem] font-extrabold text-[#1e1b4b] leading-tight tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[0.68rem] text-[#8b5cf6] font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-[460px] group">
            <div 
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2.5 bg-[#f8f6ff]/80 border border-[#7c3aed1a] rounded-xl px-3.5 py-2 shadow-sm transition-all duration-200 group-focus-within:bg-white group-focus-within:border-[#7c3aed4d] group-focus-within:ring-4 group-focus-within:ring-[#7c3aed0d] group-focus-within:shadow-md cursor-pointer hover:bg-white"
            >
              <Search className="text-[#8b5cf6] shrink-0" size={15} />
              <input
                type="text"
                placeholder="Buscar artistas, empresas..."
                className="bg-transparent outline-none w-full text-[13px] font-medium text-[#1e1b4b] placeholder:text-[#8b5cf6]/70 placeholder:font-normal cursor-pointer"
                readOnly
              />
              <div className="hidden sm:flex items-center gap-1 bg-[#7c3aed12] border border-[#7c3aed21] rounded-md px-1.5 py-0.5 text-[10px] font-bold text-[#7c3aed]">
                <Command size={10} />K
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 ml-auto shrink-0">
            {/* Notification Button */}
            <button 
              onClick={() => setIsNotificationsModalOpen(true)}
              className="relative w-10 h-10 md:w-[42px] md:h-[42px] flex items-center justify-center bg-[#f8f6ff]/80 border border-[#7c3aed1a] rounded-xl shadow-sm hover:bg-white hover:border-[#7c3aed40] hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <Bell size={17} className="text-[#7c3aed]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#2563eb] border-2 border-white shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
            </button>

            {/* Create Button */}
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="relative overflow-hidden bg-gradient-to-br from-[#7c3aed] to-[#2563eb] px-4 md:px-5 py-2.5 rounded-xl text-white font-bold text-[13px] md:text-[13.5px] shadow-[0_6px_18px_rgba(124,58,237,0.22)] hover:shadow-[0_10px_28px_rgba(124,58,237,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
            >
              {/* Glass Highlight Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
              <Plus size={16} strokeWidth={2.5} className="shrink-0" />
              <span className="hidden sm:inline">Crear Nuevo</span>
            </button>
          </div>

        </div>
      </header>
      
      {/* Decorative Gradient Border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7c3aed26] to-transparent" />
      
      {/* Create Modal */}
      <CreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  )
}