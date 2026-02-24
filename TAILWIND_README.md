# Sistema de Diseño BuscArt con Tailwind CSS 🎨

Sistema completo basado en Tailwind CSS con tokens personalizados del onboarding.

## 📦 Dependencias Necesarias

```bash
npm install -D tailwindcss postcss autoprefixer
# o
yarn add -D tailwindcss postcss autoprefixer
```

## 🚀 Configuración

### 1. Archivos de Configuración
- `tailwind.config.js` - Configuración completa con tokens BuscArt
- `src/styles/globals.css` - Estilos base con @tailwind directives
- `postcss.config.js` - Configuración PostCSS (si es necesario)

### 2. Estructura de Importación
```css
/* En globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎨 Tokens de Color Disponibles

### Colores Principales
```html
<div class="bg-buscart-primary">Violeta principal</div>
<div class="bg-buscart-secondary">Azul secundario</div>
<div class="text-text-primary">Texto principal</div>
<div class="text-text-secondary">Texto secundario</div>
```

### Paleta Violeta Completa
```html
<div class="bg-violet-50">Muy claro</div>
<div class="bg-violet-500">Medio</div>
<div class="bg-violet-900">Oscuro</div>
<div class="bg-violet-950">Muy oscuro</div>
```

### Gradientes
```html
<div class="bg-buscart-gradient">Gradiente principal</div>
<div class="bg-buscart-gradient-vertical">Gradiente vertical</div>
<div class="text-buscart-gradient">Texto con gradiente</div>
```

## 🏗️ Componentes Predefinidos

### Tarjetas Glass
```html
<!-- Tarjeta glass básica -->
<div class="glass-card p-6">
  <h3 class="title-secondary mb-4">Título</h3>
  <p class="text-body">Contenido con efecto glass</p>
</div>

<!-- Tarjeta con hover -->
<div class="glass-card-hover p-6">
  <h3 class="title-secondary mb-4">Título Interactive</h3>
  <p class="text-body">Hover para efecto</p>
</div>

<!-- Tarjeta oscura -->
<div class="card-dark p-6 text-white">
  <h3 class="title-secondary mb-4">Título en tarjeta oscura</h3>
  <p class="text-body text-white">Contenido</p>
</div>
```

### Botones
```html
<!-- Botón primario -->
<button class="btn-primary">
  Continuar
</button>

<!-- Botón secundario -->
<button class="btn-secondary">
  Cancelar
</button>

<!-- Botón con hover effects -->
<button class="btn-primary hover-lift hover-glow">
  Botón con efectos
</button>
```

### Inputs
```html
<input 
  type="text" 
  class="input-field" 
  placeholder="Escribe aquí..."
>
```

### Pills/Chips
```html
<!-- Pill normal -->
<div class="pill pill-normal">
  Categoría
</div>

<!-- Pill seleccionada -->
<div class="pill pill-selected">
  Seleccionado ✓
</div>
```

## 🎭 Animaciones

### Clases Predefinidas
```html
<div class="animate-buscart-fade-in">
  Aparece con fade
</div>

<div class="animate-buscart-slide-up">
  Aparece desde abajo
</div>

<div class="animate-buscart-scale-in">
  Aparece con escala
</div>

<div class="animate-buscart-pulse">
  Efecto pulsante
</div>

<div class="animate-buscart-float">
  Flotando suavemente
</div>

<div class="animate-buscart-glow">
  Efecto de brillo
</div>
```

### Animaciones Condicionales
```html
<div class="animate-on-scroll">
  Se anima cuando aparece en viewport
</div>
```

## 📏 Espaciado y Bordes

### Espaciado Personalizado
```html
<div class="p-4 m-6">Padding y margin estándar</div>
<div class="px-8 py-4">Espaciado direccional</div>
```

### Bordes Redondeados
```html
<div class="rounded-4xl">22px</div>
<div class="rounded-5xl">24px</div>
<div class="rounded-6xl">28px</div>
<div class="rounded-7xl">32px</div>
```

## 🌟 Sombras

### Sistema de Sombras BuscArt
```html
<div class="shadow-buscart-xs">Sombra extra pequeña</div>
<div class="shadow-buscart-sm">Sombra pequeña</div>
<div class="shadow-buscart-md">Sombra mediana</div>
<div class="shadow-buscart-lg">Sombra grande</div>
<div class="shadow-buscart-xl">Sombra extra grande</div>
<div class="shadow-buscart-2xl">Sombra enorme</div>
<div class="shadow-buscart-card">Sombra para tarjetas</div>
<div class="shadow-buscart-hover">Sombra hover</div>
```

## 🎯 Tipografía

### Clases Helper
```html
<h1 class="title-main">Título Principal</h1>
<h2 class="title-secondary">Subtítulo</h2>
<p class="text-body">Texto del cuerpo</p>
<span class="text-caption">Texto pequeño</span>
```

### Texto con Gradiente
```html
<h1 class="text-gradient">Título con Gradiente</h1>
```

### Responsive Text
```html
<h1 class="responsive-text">Texto Responsive</h1>
<!-- 4xl mobile, 5xl tablet, 6xl desktop -->
```

## 🔄 Efectos y Utilidades

### Hover Effects
```html
<div class="hover-lift">Eleva al hover</div>
<div class="hover-glow">Brilla al hover</div>
```

### Glass Morphism
```html
<div class="glass-morphism">Fondo glass completo</div>
<div class="glass-card-hover">Tarjeta glass con hover</div>
```

### Estados de Carga
```html
<div class="loading-skeleton h-4 w-32"></div>
<div class="loading-skeleton h-8 w-full"></div>
```

### Scrollbar Personalizado
```html
<div class="scrollbar-buscart overflow-y-auto">
  Contenido con scrollbar personalizado
</div>
```

## 🎨 Overlays Decorativos

### Noise Overlay
```html
<div class="relative">
  <div class="noise-overlay"></div>
  <!-- Tu contenido -->
</div>
```

### Highlight Line
```html
<div class="relative">
  <div class="highlight-line"></div>
  <!-- Tu contenido -->
</div>
```

## ♿ Accesibilidad

### Focus States
```html
<button class="focus-ring">
  Botón con anillo de foco
</button>
```

## 📱 Responsive

El sistema incluye breakpoints estándar de Tailwind:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

```html
<div class="text-sm md:text-base lg:text-lg">
  Texto responsive
</div>
```

## 🎯 Ejemplos Completos

### Tarjeta Completa
```html
<div class="glass-card hover-lift animate-buscart-fade-in p-8">
  <div class="highlight-line"></div>
  <div class="noise-overlay"></div>
  
  <h2 class="title-secondary mb-4 text-gradient">
    Título con Gradiente
  </h2>
  
  <p class="text-body mb-6">
    Tarjeta completa con glassmorphism, animaciones y efectos hover.
  </p>
  
  <div class="flex gap-4">
    <button class="btn-primary">Primario</button>
    <button class="btn-secondary">Secundario</button>
  </div>
</div>
```

### Formulario Completo
```html
<form class="glass-card p-6 space-y-4">
  <div>
    <label class="text-caption block mb-2">Nombre</label>
    <input type="text" class="input-field w-full" placeholder="Tu nombre">
  </div>
  
  <div>
    <label class="text-caption block mb-2">Email</label>
    <input type="email" class="input-field w-full" placeholder="tu@email.com">
  </div>
  
  <div class="flex gap-2">
    <div class="pill pill-normal">Opción 1</div>
    <div class="pill pill-selected">Opción 2 ✓</div>
    <div class="pill pill-normal">Opción 3</div>
  </div>
  
  <button type="submit" class="btn-primary w-full">
    Enviar Formulario
  </button>
</form>
```

## 🔄 Migración desde CSS Puro

### Antes (CSS Puro)
```html
<div class="buscart-card-glass">
  <h2 class="buscart-text-subtitle">Título</h2>
</div>
```

### Después (Tailwind)
```html
<div class="glass-card">
  <h2 class="title-secondary">Título</h2>
</div>
```

## 🎨 Inspiración del Onboarding

Este sistema mantiene la coherencia visual con:

- **Glassmorphism**: Efectos cristal con backdrop-filter
- **Gradientes Violeta-Azul**: Identidad principal #7c3aed → #2563eb
- **Bordes Redondeados**: 8px - 32px para amigabilidad
- **Sombras Violeta**: Sistema completo de sombras temáticas
- **Animaciones Suaves**: 150ms - 600ms con easing personalizado
- **Plus Jakarta Sans**: Tipografía consistente

## 🚀 Tips de Uso

1. **Usa clases de componentes** para elementos repetitivos
2. **Combina utilidades** para estilos personalizados
3. **Aprovecha las animaciones** predefinidas
4. **Mantén consistencia** con los tokens de color
5. **Usa responsive classes** para adaptabilidad

¡Listo para usar en todo el proyecto con Tailwind CSS! 🎯
