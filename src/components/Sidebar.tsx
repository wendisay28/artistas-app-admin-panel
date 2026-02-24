'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Mic2, FileText, Users, Settings, Music2,
  Building, CalendarCheck, MapPin, Megaphone, Shield, ChevronRight,
  Scale, Plus
} from 'lucide-react'
import { LogoStyles } from '@/theme/brand'

const navSections = [
  {
    label: 'Principal',
    items: [{ href: '/', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Gestión',
    items: [
      { href: '/artists', label: 'Artistas', icon: Mic2 },
      { href: '/contracts', label: 'Contratos', icon: FileText },
      { href: '/users', label: 'Usuarios', icon: Users },
      { href: '/companies', label: 'Empresas', icon: Building },
      { href: '/companies/create', label: 'Crear Empresa', icon: Plus },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { href: '/payment-events', label: 'Eventos Pagos', icon: CalendarCheck },
      { href: '/verify-rooms', label: 'Salas y Sitios', icon: MapPin },
      { href: '/moderation', label: 'Moderación', icon: Shield },
      { href: '/advertising', label: 'Publicidad', icon: Megaphone },
      { href: '/disputes', label: 'Disputas', icon: Scale },
    ],
  },
  {
    label: 'Sistema',
    items: [{ href: '/configuration', label: 'Configuración', icon: Settings }],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-[280px] bg-white/95 backdrop-blur-xl border-r border-[#7c3aed21] shadow-[2px_0_20px_rgba(124,58,237,0.06)] flex flex-col z-40 font-sans overflow-hidden transition-transform duration-300 -translate-x-full md:translate-x-0">
      
      {/* Logo Container */}
      <div className="h-[76px] px-[22px] flex items-center gap-3.5 border-b border-[#7c3aed21] shrink-0 relative z-10">
        <div style={LogoStyles.container}>
          <span style={LogoStyles.buscText}>Busc</span>
          <span style={LogoStyles.artBackground}>
            <span style={LogoStyles.artText}>Art</span>
          </span>
        </div>
        <p className="text-[0.67rem] font-bold text-[#8b5cf6] mt-1 tracking-widest uppercase">
          Panel de Control
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3.5 py-4 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-[#7c3aed26] scrollbar-track-transparent">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4 flex flex-col">
            <span className="text-[0.65rem] font-extrabold text-[#8b5cf6] uppercase tracking-[0.14em] px-3.5 pb-1.5">
              {section.label}
            </span>
            
            {section.items.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link key={href} href={href} className="group mb-0.5 no-underline block">
                  <div className={`
                    flex items-center gap-4 px-4 py-[11px] rounded-2xl min-h-[44px] transition-all duration-200 border border-transparent
                    ${isActive 
                      ? 'bg-[#7c3aed1a] text-[#7c3aed] shadow-[0_4px_12px_-4px_rgba(124,58,237,0.15)]' 
                      : 'text-[#64748b] hover:bg-black/[0.04] hover:text-[#1e1b4b] hover:translate-x-1'
                    }
                  `}>
                    <div className={`shrink-0 flex items-center justify-center ${isActive ? 'text-[#7c3aed]' : 'opacity-70 group-hover:opacity-100'}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-[0.9375rem] font-semibold leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                      {label}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3.5 border-t border-[#7c3aed21] shrink-0 relative z-10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[20px] bg-white/50 border border-white/60 shadow-sm hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center font-extrabold text-sm text-white shadow-[0_3px_10px_rgba(124,58,237,0.25)]">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.82rem] font-bold text-[#1e1b4b] leading-tight truncate">
              Admin Portal
            </p>
            <p className="text-[0.69rem] text-[#8b5cf6] mt-0.5 truncate">
              admin@buscart.com
            </p>
          </div>
          <ChevronRight size={15} className="text-[#7c3aed4d] group-hover:text-[#7c3aed] group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </div>
    </aside>
  )
}