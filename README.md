# 🎨 BuscArt - Panel de Administración

Panel de administración moderno para la plataforma BuscArt, construido con Next.js 16.1.6, TypeScript y Tailwind CSS v3.

## 📋 Resumen del Proyecto

### 🎯 **Objetivo**
Proporcionar una interfaz de administración completa y moderna para gestionar todos los aspectos de la plataforma BuscArt, incluyendo artistas, contratos, eventos, usuarios y disputas.

### 🚀 **Tecnologías Utilizadas**

#### **Frontend**
- **Next.js 16.1.6** - Framework React con Turbopack
- **TypeScript** - Tipado estático y mejor DX
- **Tailwind CSS v3** - Framework de CSS utility-first
- **Lucide React** - Biblioteca de iconos moderna

#### **Diseño**
- **Sistema de Diseño BuscArt** - Paleta de colores personalizada
- **Plus Jakarta Sans** - Tipografía principal
- **Glassmorphism** - Efectos visuales modernos
- **Responsive Design** - Adaptado a todos los dispositivos

## 📂 Estructura del Proyecto

```
artistas-app-admin-panel/
├── src/
│   ├── app/                          # Páginas Next.js App Router
│   │   ├── page.tsx                  # Dashboard principal
│   │   ├── artistas/page.tsx         # Gestión de artistas
│   │   ├── contratos/page.tsx        # Gestión de contratos
│   │   ├── configuracion/page.tsx    # Configuración del sistema
│   │   ├── disputas/page.tsx         # Sistema de disputas
│   │   ├── empresas/page.tsx         # Gestión de empresas
│   │   ├── eventos-pagos/page.tsx    # Eventos pagos
│   │   ├── moderacion/page.tsx       # Moderación de contenido
│   │   ├── publicidad/page.tsx       # Gestión de publicidad
│   │   ├── usuarios/page.tsx         # Gestión de usuarios
│   │   ├── verificar-salas/page.tsx  # Verificación de salas
│   │   ├── layout.tsx                # Layout principal
│   │   └── globals.css               # Estilos globales
│   ├── components/
│   │   ├── Header.tsx                # Componente header
│   │   └── Sidebar.tsx               # Navegación lateral
│   └── styles/
│       ├── design-system.css         # Sistema de diseño BuscArt
│       └── README.md                 # Documentación de estilos
├── README.md                         # Este archivo
├── TAILWIND_README.md                # Guía de Tailwind CSS
├── package.json                      # Dependencias y scripts
├── next.config.ts                    # Configuración de Next.js
├── tailwind.config.js                # Configuración de Tailwind
├── tsconfig.json                     # Configuración TypeScript
└── postcss.config.js                 # Configuración PostCSS
```

## 🎨 Sistema de Diseño BuscArt

### 🎨 **Paleta de Colores**
```css
/* Colores Primarios */
--color-primary: #7c3aed;      /* Violeta BuscArt */
--color-secondary: #2563eb;     /* Azul BuscArt */

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
--gradient-secondary: linear-gradient(135deg, #f0edff 0%, #f0f9ff 100%);

/* Colores de Texto */
--text-primary: #1e1b4b;       /* Texto principal */
--text-secondary: #6b7280;     /* Texto secundario */

/* Fondos */
--bg-primary: #f8f6ff;          /* Fondo principal */
--bg-white: #ffffff;            /* Fondo blanco */
```

### 🎯 **Componentes Principales**

#### **StatCard**
Componente reutilizable para mostrar estadísticas con iconos y colores personalizados.

#### **Header**
Barra de navegación superior con título y subtítulo de cada página.

#### **Sidebar**
Navegación lateral con menú organizado por secciones:
- **Principal** - Dashboard
- **Gestión** - Artistas, Contratos, Usuarios, Empresas
- **Operaciones** - Eventos, Salas, Moderación, Publicidad, Disputas
- **Sistema** - Configuración

## 📊 Funcionalidades del Panel

### 🏠 **Dashboard**
- KPIs en tiempo real
- Estadísticas generales
- Acceso rápido a todas las secciones

### 👥 **Gestión de Usuarios**
- **Artistas** - Perfiles, verificación, estadísticas
- **Usuarios** - Gestión general de cuentas
- **Empresas** - Credenciales y gestión empresarial

### 📋 **Gestión de Contratos**
- Seguimiento de estados
- Documentación adjunta
- Historial de cambios

### 🎭 **Eventos y Pagos**
- **Eventos Pagos** - Sistema de tickets
- **Salas y Sitios** - Verificación de lugares
- **Publicidad** - Gestión de banners y campañas

### 🛡️ **Moderación y Seguridad**
- **Moderación** - Revisión de contenido reportado
- **Disputas** - Sistema de resolución de conflictos
- **Configuración** - Ajustes del sistema

## 🚀 Instalación y Ejecución

### 📋 **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### 🔧 **Instalación**
```bash
# Clonar el repositorio
git clone <repository-url>
cd artistas-app-admin-panel

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 🌐 **Acceso**
El panel estará disponible en `http://localhost:3000`

## 📱 Características Técnicas

### ⚡ **Rendimiento**
- **Next.js 16.1.6** con Turbopack para compilación ultra-rápida
- **Optimización de imágenes** y componentes lazy loading
- **Build optimizado** para producción

### 🔒 **Seguridad**
- **TypeScript** para detección temprana de errores
- **Validación de datos** en formularios
- **Componentes seguros** contra XSS

### 📱 **Responsive**
- **Mobile-first** design approach
- **Adaptive layouts** para todos los dispositivos
- **Touch-friendly** interfaces

## 🎨 Guía de Estilos

### 📄 **Documentación Completa**
Ver `src/styles/README.md` para:
- Guía completa del sistema de diseño
- Componentes reutilizables
- Buenas prácticas de desarrollo
- Ejemplos de implementación

### 🎯 **Tailwind CSS**
Ver `TAILWIND_README.md` para:
- Configuración personalizada
- Clases utilitarias BuscArt
- Animaciones y transiciones
- Optimización de bundle

## 📊 Estado del Proyecto

### ✅ **Completado**
- ✅ 10 páginas funcionales
- ✅ Sistema de diseño completo
- ✅ Navegación integrada
- ✅ Responsive design
- ✅ TypeScript configurado
- ✅ Git versionado

### 🔄 **En Desarrollo**
- 🔄 Integración con API backend
- 🔄 Autenticación y autorización
- 🔄 Testing automatizado
- 🔄 Despliegue en producción

## 🤝 Contribución

### 📋 **Guía de Contribución**
1. Fork del repositorio
2. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Pull Request

### 🎨 **Estándares de Código**
- Seguir el sistema de diseño BuscArt
- Usar TypeScript para todo el código nuevo
- Componentes reutilizables y mantenibles
- Testing unitario para nuevas funcionalidades

## 📄 Licencia

Este proyecto es propiedad de BuscArt y está protegido por derechos de autor.

---

**Desarrollado con ❤️ para BuscArt**  
*Panel de Administración Moderno y Eficiente*
