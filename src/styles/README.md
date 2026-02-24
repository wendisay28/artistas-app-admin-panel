# Sistema de Diseño BuscArt 🎨

Sistema de diseño completo basado en los estilos del onboarding, creado con CSS puro y tokens personalizados.

## 📁 Estructura de Archivos

```
src/styles/
├── design-system.css    # Sistema completo de tokens y utilidades
├── globals.css         # Importación principal y estilos adicionales
└── README.md           # Esta documentación
```

## 🎯 Uso Básico

### Importación
```css
/* En tu archivo CSS principal */
@import './styles/globals.css';
```

### Clases Disponibles

#### 🎨 Colores y Gradientes
```css
.tu-elemento {
  background: var(--buscart-bg-card);
  color: var(--buscart-text-primary);
  border-color: var(--buscart-border-medium);
}

/* Gradientes */
.gradiente-principal {
  background: var(--buscart-gradient);
}

.texto-gradiente {
  background: var(--buscart-gradient-text);
}
```

#### 🏗️ Tarjetas Glass
```html
<div class="buscart-card-glass">
  <p>Contenido con efecto glassmorphism</p>
</div>

<div class="buscart-card-dark">
  <p>Tarjeta oscura con gradiente</p>
</div>
```

#### 🔘 Botones
```html
<!-- Botón primario -->
<button class="buscart-btn-primary">
  Continuar
</button>

<!-- Botón secundario -->
<button class="buscart-btn-secondary">
  Cancelar
</button>

<!-- Botón deshabilitado -->
<button class="buscart-btn-primary" disabled>
  Procesando...
</button>
```

#### 📝 Inputs
```html
<input 
  type="text" 
  class="buscart-input" 
  placeholder="Escribe aquí..."
>
```

#### 🏷️ Pills/Chips
```html
<div class="buscart-pill buscart-pill-normal">
  Categoría
</div>

<div class="buscart-pill buscart-pill-selected">
  Seleccionado ✓
</div>
```

## 🎨 Tokens de Color

### Gradientes Principales
- `--buscart-primary-start`: #7c3aed (violeta)
- `--buscart-primary-end`: #2563eb (azul)
- `--buscart-primary-dark`: #5b21b6

### Paleta Violeta
- `--buscart-violet-50`: #f8f6ff (muy claro)
- `--buscart-violet-100`: #f0edff
- ...
- `--buscart-violet-950`: #4c1d95 (muy oscuro)

### Paleta Azul
- `--buscart-blue-400`: #93c5fd
- `--buscart-blue-600`: #2563eb
- `--buscart-blue-800`: #1e40af

## 📏 Espaciado

```css
/* Tokens disponibles */
--buscart-spacing-xs: 4px;
--buscart-spacing-sm: 8px;
--buscart-spacing-md: 12px;
--buscart-spacing-lg: 16px;
--buscart-spacing-xl: 20px;
--buscart-spacing-2xl: 24px;
--buscart-spacing-3xl: 32px;
--buscart-spacing-4xl: 40px;
```

## 🔄 Bordes

```css
/* Tokens disponibles */
--buscart-radius-xs: 4px;
--buscart-radius-sm: 8px;
--buscart-radius-md: 10px;
--buscart-radius-lg: 12px;
--buscart-radius-xl: 14px;
--buscart-radius-2xl: 16px;
--buscart-radius-3xl: 18px;
--buscart-radius-4xl: 20px;
--buscart-radius-5xl: 22px;
--buscart-radius-6xl: 24px;
--buscart-radius-7xl: 28px;
--buscart-radius-full: 50%;
```

## 🎭 Sombras

```css
/* Sistema completo de sombras */
--buscart-shadow-xs: 0 1px 2px 0 rgba(124, 58, 237, 0.05);
--buscart-shadow-sm: 0 2px 4px -2px rgba(124, 58, 237, 0.1);
--buscart-shadow-md: 0 4px 8px -2px rgba(124, 58, 237, 0.1);
--buscart-shadow-lg: 0 4px 16px -4px rgba(124, 58, 237, 0.12);
--buscart-shadow-xl: 0 8px 24px -6px rgba(124, 58, 237, 0.15);
--buscart-shadow-2xl: 0 12px 32px -8px rgba(124, 58, 237, 0.2);
```

## ✨ Animaciones

### Clases Predefinidas
```html
<div class="buscart-animate-fade-in">
  Aparece con fade
</div>

<div class="buscart-animate-slide-up">
  Aparece desde abajo
</div>

<div class="buscart-animate-scale-in">
  Aparece con escala
</div>

<div class="buscart-animate-pulse">
  Efecto pulsante
</div>
```

### Tokens de Animación
```css
/* Duraciones */
--buscart-duration-fast: 150ms;
--buscart-duration-normal: 250ms;
--buscart-duration-slow: 350ms;
--buscart-duration-slower: 450ms;

/* Easing */
--buscart-ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--buscart-ease-in-out: cubic-bezier(0.445, 0.05, 0.55, 0.95);
--buscart-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 📝 Tipografía

```css
/* Tokens de fuente */
--buscart-font-family: 'Plus Jakarta Sans', sans-serif;
--buscart-font-size-xs: 10px;
--buscart-font-size-sm: 12px;
--buscart-font-size-base: 14px;
--buscart-font-size-lg: 16px;
--buscart-font-size-xl: 18px;
--buscart-font-size-2xl: 20px;
--buscart-font-size-3xl: 24px;
--buscart-font-size-4xl: 28px;

/* Clases helper */
<h1 class="buscart-text-title">Título Principal</h1>
<h2 class="buscart-text-subtitle">Subtítulo</h2>
<p class="buscart-text-body">Texto del cuerpo</p>
<span class="buscart-text-caption">Texto pequeño</span>
```

## 🎯 Utilidades Rápidas

### Layout
```html
<div class="buscart-flex buscart-items-center buscart-justify-between">
  <div>Contenido izquierdo</div>
  <div>Contenido derecho</div>
</div>
```

### Texto
```html
<p class="buscart-text-center">Centrado</p>
<p class="buscart-text-left">Izquierda</p>
<p class="buscart-text-right">Derecha</p>
```

### Display y Posición
```html
<div class="buscart-relative">
  <div class="buscart-absolute">Posicionado</div>
</div>

<div class="buscart-hidden">Oculto</div>
<div class="buscart-block">Visible</div>
```

## 🌟 Elementos Decorativos

### Noise Overlay
```html
<div class="buscart-relative">
  <div class="buscart-noise"></div>
  <!-- Tu contenido -->
</div>
```

### Highlight Line
```html
<div class="buscart-relative">
  <div class="buscart-highlight"></div>
  <!-- Tu contenido -->
</div>
```

### Blobs Decorativos
```css
.blob-decorativo {
  position: absolute;
  width: 200px;
  height: 200px;
  background: var(--buscart-violet-600);
  opacity: 0.1;
  border-radius: 50%;
  filter: blur(40px);
  top: -100px;
  right: -50px;
}
```

## 📱 Responsive

El sistema incluye ajustes automáticos para móviles:

```css
@media (max-width: 768px) {
  :root {
    --buscart-font-size-4xl: 24px;    /* Reducido de 28px */
    --buscart-font-size-3xl: 20px;    /* Reducido de 24px */
    --buscart-spacing-4xl: 32px;     /* Reducido de 40px */
    --buscart-spacing-3xl: 24px;     /* Reducido de 32px */
  }
}
```

## ♿ Accesibilidad

### Focus States
```html
<button class="buscart-focus-ring">
  Botón con anillo de foco accesible
</button>
```

### Scrollbar Personalizado
El sistema incluye una scrollbar personalizada con colores de marca.

## 🎨 Ejemplo Completo

```html
<!-- Tarjeta completa con sistema de diseño -->
<div class="buscart-card-glass buscart-animate-fade-in">
  <div class="buscart-highlight"></div>
  
  <h2 class="buscart-text-subtitle" style="margin-bottom: var(--buscart-spacing-md);">
    Título de Tarjeta
  </h2>
  
  <p class="buscart-text-body" style="margin-bottom: var(--buscart-spacing-xl);">
    Contenido de la tarjeta con efecto glassmorphism
    y animación de entrada.
  </p>
  
  <div style="display: flex; gap: var(--buscart-spacing-sm);">
    <button class="buscart-btn-primary">
      Primario
    </button>
    <button class="buscart-btn-secondary">
      Secundario
    </button>
  </div>
</div>
```

## 🔄 Actualización

Para mantener consistencia con el onboarding:

1. **Usa siempre los tokens CSS** en lugar de valores hardcodeados
2. **Prefiere las clases de utilidad** sobre estilos personalizados
3. **Mantén la jerarquía visual** usando los tokens de tipografía
4. **Aplica las animaciones** usando las clases predefinidas

## 🎯 Inspiración

Este sistema está basado en los estilos del onboarding:
- **Glassmorphism** para profundidad
- **Gradientes violeta-azul** como identidad principal
- **Bordes redondeados generosos** para amigabilidad
- **Sombras sutiles** para jerarquía visual
- **Animaciones suaves** para experiencia moderna
