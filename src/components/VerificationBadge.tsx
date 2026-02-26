'use client'

import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

interface VerificationBadgeProps {
  status: 'verificado' | 'pendiente' | 'rechazado' | 'no_verificado' | 'en_revision'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

const verificationConfig = {
  verificado: { 
    label: 'Verificado', 
    className: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    icon: CheckCircle
  },
  pendiente: { 
    label: 'Pendiente', 
    className: 'bg-amber-50 text-amber-600 border-amber-100',
    icon: Clock
  },
  rechazado: { 
    label: 'Rechazado', 
    className: 'bg-red-50 text-red-600 border-red-100',
    icon: XCircle
  },
  no_verificado: { 
    label: 'No Verificado', 
    className: 'bg-gray-50 text-gray-600 border-gray-100',
    icon: AlertCircle
  },
  en_revision: { 
    label: 'En Revisión', 
    className: 'bg-blue-50 text-blue-600 border-blue-100',
    icon: Clock
  }
}

const sizeConfig = {
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-3 py-1 text-[10px]',
  lg: 'px-4 py-1.5 text-xs'
}

export default function VerificationBadge({ 
  status, 
  size = 'md', 
  showIcon = true 
}: VerificationBadgeProps) {
  const config = verificationConfig[status]
  const sizeClass = sizeConfig[size]
  const Icon = config.icon

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-black uppercase tracking-tighter transition-all
      ${config.className} 
      ${sizeClass}
    `}>
      {showIcon && <Icon size={12} />}
      {config.label}
    </span>
  )
}
