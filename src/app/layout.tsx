import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google' // Importación optimizada de Next.js
import './globals.css'
import Sidebar from '@/components/Sidebar'

// Configuración de la fuente oficial de BuscArt
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'ArtistasApp — Panel Admin',
  description: 'Panel de administración para contratación de artistas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-screen bg-[#f8f6ff] text-[#1e1b4b] antialiased selection:bg-[#7c3aed21]">
        
        {/* Capa de fondo con gradiente sutil (Efecto BuscArt) */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#f0ecff] to-[#eef2ff] -z-10" />

        <div className="flex min-h-screen relative">
          
          {/* Sidebar - Ya configurado con ancho fijo en su componente */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-h-screen relative z-10 md:ml-[280px] transition-all duration-300">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  )
}