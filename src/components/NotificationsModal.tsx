'use client'

import { useState } from 'react'
import { X, Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Clock, Check, ExternalLink } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  time: string
  read: boolean
  action?: {
    label: string
    url?: string
    onClick?: () => void
  }
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Nuevo Contrato Creado',
    message: 'El contrato C-006 con DJ Pulso ha sido creado exitosamente',
    time: 'Hace 5 minutos',
    read: false,
    action: {
      label: 'Ver Contrato',
      url: '/contracts'
    }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Verificación Pendiente',
    message: 'María Reyes ha completado su verificación KYC y espera aprobación',
    time: 'Hace 15 minutos',
    read: false,
    action: {
      label: 'Revisar KYC',
      url: '/artists'
    }
  },
  {
    id: '3',
    type: 'info',
    title: 'Actualización del Sistema',
    message: 'Nuevas funcionalidades de reportes han sido implementadas',
    time: 'Hace 1 hora',
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Pago Rechazado',
    message: 'El pago del contrato C-003 ha sido rechazado por el banco',
    time: 'Hace 2 horas',
    read: false,
    action: {
      label: 'Ver Detalles',
      url: '/payments'
    }
  },
  {
    id: '5',
    type: 'info',
    title: 'Nuevo Usuario Registrado',
    message: 'Carlos Mendoza se ha registrado como cliente',
    time: 'Hace 3 horas',
    read: true,
    action: {
      label: 'Ver Usuario',
      url: '/users'
    }
  },
  {
    id: '6',
    type: 'warning',
    title: 'Contrato por Vencer',
    message: 'El contrato C-002 vence en 2 días',
    time: 'Hace 4 horas',
    read: false,
    action: {
      label: 'Ver Contrato',
      url: '/contracts'
    }
  }
]

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-200'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-200'
  }
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set())
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const handleToggleSelect = (id: string) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDeleteSelected = () => {
    setNotificationsList(prev => 
      prev.filter(n => !selectedNotifications.has(n.id))
    )
    setSelectedNotifications(new Set())
  }

  const handleActionClick = (action: any) => {
    if (action.url) {
      window.location.href = action.url
    } else if (action.onClick) {
      action.onClick()
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ marginLeft: '280px', background: 'rgba(15, 10, 40, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center relative">
              <Bell size={20} className="text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b]">Notificaciones</h2>
              <p className="text-sm text-[#6b7280]">{unreadCount} no leídas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-3 py-1.5 text-sm text-[#7c3aed] hover:bg-[#7c3aed08] rounded-lg transition-colors"
              >
                Marcar todo como leído
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[500px]">
          {notificationsList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Bell size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">No tienes notificaciones</h3>
              <p className="text-sm text-[#6b7280]">Las notificaciones aparecerán aquí</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notificationsList.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon
                const isSelected = selectedNotifications.has(notification.id)

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleSelect(notification.id)}
                        className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#7c3aed] border-[#7c3aed]'
                            : 'border-gray-300 hover:border-[#7c3aed]'
                        }`}
                      >
                        {isSelected && <Check size={12} className="text-white" />}
                      </button>

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg ${config.bgColor} ${config.borderColor} border flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={config.iconColor} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className={`text-sm font-semibold text-[#1e1b4b] mb-1 ${
                              !notification.read ? 'font-bold' : ''
                            }`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-[#6b7280] mb-2">{notification.message}</p>
                            
                            {/* Action Button */}
                            {notification.action && (
                              <button
                                onClick={() => handleActionClick(notification.action)}
                                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#7c3aed] bg-[#7c3aed08] rounded-lg hover:bg-[#7c3aed15] transition-colors"
                              >
                                {notification.action.label}
                                <ExternalLink size={12} />
                              </button>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="w-6 h-6 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"
                                title="Marcar como leído"
                              >
                                <Check size={14} className="text-gray-500" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1 mt-2">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedNotifications.size > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-[#6b7280]">
              {selectedNotifications.size} {selectedNotifications.size === 1 ? 'seleccionada' : 'seleccionadas'}
            </span>
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Eliminar seleccionadas
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
