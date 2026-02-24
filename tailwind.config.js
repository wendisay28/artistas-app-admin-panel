/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // === COLORES BUSCART - BASADO EN ONBOARDING ===
      colors: {
        // Gradientes principales
        buscart: {
          primary: '#7c3aed',
          'primary-dark': '#5b21b6',
          secondary: '#2563eb',
          'secondary-dark': '#1d4ed8',
        },
        
        // Paleta violeta completa
        violet: {
          50: '#f8f6ff',
          100: '#f0edff',
          200: '#eef2ff',
          300: '#ede9fe',
          400: '#ddd6fe',
          500: '#c4b5fd',
          600: '#a78bfa',
          700: '#818cf8',
          800: '#7c3aed',
          900: '#6d28d9',
          950: '#4c1d95',
        },
        
        // Paleta azul completa
        blue: {
          400: '#93c5fd',
          500: '#60a5fa',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        
        // Colores de texto
        text: {
          primary: '#1e1b4b',
          secondary: '#6d28d9',
          muted: 'rgba(109, 40, 217, 0.5)',
          light: 'rgba(109, 40, 217, 0.7)',
          white: '#ffffff',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
        
        // Fondos glassmorphism
        bg: {
          primary: 'linear-gradient(135deg, #f8f6ff 0%, #f0edff 50%, #eef2ff 100%)',
          light: 'rgba(248, 246, 255, 0.98)',
          medium: 'rgba(238, 242, 255, 0.98)',
          card: 'rgba(255, 255, 255, 0.72)',
          'card-hover': 'rgba(255, 255, 255, 0.88)',
          glass: 'rgba(255, 255, 255, 0.25)',
          'glass-strong': 'rgba(255, 255, 255, 0.88)',
          input: 'rgba(255, 255, 255, 0.75)',
        },
        
        // Bordes
        border: {
          light: 'rgba(124, 58, 237, 0.15)',
          medium: 'rgba(124, 58, 237, 0.25)',
          strong: 'rgba(167, 139, 250, 0.35)',
          white: 'rgba(255, 255, 255, 0.9)',
          glass: 'rgba(255, 255, 255, 0.8)',
          input: 'rgba(167, 139, 250, 0.25)',
        },
      },
      
      // === FUENTES ===
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      
      // === ESPACIADO ===
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // === BORDES REDONDEADOS ===
      borderRadius: {
        '4xl': '22px',
        '5xl': '24px',
        '6xl': '28px',
        '7xl': '32px',
      },
      
      // === SOMBRAS ===
      boxShadow: {
        'buscart-xs': '0 1px 2px 0 rgba(124, 58, 237, 0.05)',
        'buscart-sm': '0 2px 4px -2px rgba(124, 58, 237, 0.1)',
        'buscart-md': '0 4px 8px -2px rgba(124, 58, 237, 0.1)',
        'buscart-lg': '0 4px 16px -4px rgba(124, 58, 237, 0.12)',
        'buscart-xl': '0 8px 24px -6px rgba(124, 58, 237, 0.15)',
        'buscart-2xl': '0 12px 32px -8px rgba(124, 58, 237, 0.2)',
        'buscart-card': '0 4px 20px -6px rgba(124, 58, 237, 0.12)',
        'buscart-hover': '0 8px 24px -6px rgba(124, 58, 237, 0.2)',
        'buscart-focus': '0 0 0 3px rgba(124, 58, 237, 0.1)',
        'buscart-dark': '0 10px 20px -6px rgba(91, 33, 182, 0.28)',
      },
      
      // === BACKDROP FILTER ===
      backdropBlur: {
        xs: 'blur(4px)',
        sm: 'blur(8px)',
        md: 'blur(16px)',
        lg: 'blur(24px)',
        xl: 'blur(32px)',
      },
      
      // === ANIMACIONES ===
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },
      
      transitionTimingFunction: {
        'buscart-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'buscart-in-out': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        'buscart-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // === KEYFRAMES ===
      keyframes: {
        'buscart-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'buscart-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'buscart-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'buscart-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'buscart-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'buscart-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' },
        },
      },
      
      // === ANIMATIONS ===
      animation: {
        'buscart-fade-in': 'buscart-fade-in 0.6s var(--buscart-ease-out) forwards',
        'buscart-scale-in': 'buscart-scale-in 0.3s var(--buscart-ease-out) forwards',
        'buscart-slide-up': 'buscart-slide-up 0.4s var(--buscart-ease-out) forwards',
        'buscart-pulse': 'buscart-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'buscart-float': 'buscart-float 3s ease-in-out infinite',
        'buscart-glow': 'buscart-glow 2s ease-in-out infinite',
      },
      
      // === GRADIENTES ===
      backgroundImage: {
        'buscart-gradient': 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
        'buscart-gradient-vertical': 'linear-gradient(180deg, #7c3aed 0%, #2563eb 100%)',
        'buscart-gradient-reverse': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'buscart-bg-primary': 'linear-gradient(135deg, #f8f6ff 0%, #f0edff 50%, #eef2ff 100%)',
      },
      
      // === EFECTOS DE TEXTO ===
      backgroundClip: {
        'text': 'text',
      },
      
      // === TAMAÑOS DE FUENTE PERSONALIZADOS ===
      fontSize: {
        '5xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '6xl': ['40px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      
      // === OPACIDADES ===
      opacity: {
        '15': '0.15',
        '85': '0.85',
      },
    },
  },
  plugins: [
    // Plugin para utilidades personalizadas compatible con v4
    function({ addUtilities, theme }) {
      const newUtilities = {
        // === UTILIDADES DE GLASSMORPHISM ===
        '.glass-bg': {
          background: theme('backgroundImage.buscart-bg-primary'),
          backdropFilter: theme('backdropBlur.lg'),
          '-webkit-backdrop-filter': theme('backdropBlur.lg'),
        },
        '.glass-card': {
          background: theme('colors.bg.card'),
          border: `1px solid ${theme('colors.border.white')}`,
          backdropFilter: theme('backdropBlur.sm'),
          '-webkit-backdrop-filter': theme('backdropBlur.sm'),
          transition: 'all 0.3s var(--buscart-ease-out)',
        },
        '.glass-card:hover': {
          background: theme('colors.bg.card-hover'),
          boxShadow: theme('boxShadow.buscart-hover'),
          transform: 'translateY(-2px)',
        },
        '.glass-strong': {
          background: theme('colors.bg.glass-strong'),
          border: `1px solid ${theme('colors.border.white')}`,
          backdropFilter: theme('backdropBlur.md'),
          '-webkit-backdrop-filter': theme('backdropBlur.md'),
        },
        '.glass-light': {
          background: theme('colors.bg.glass'),
          border: `1px solid ${theme('colors.border.glass')}`,
          backdropFilter: theme('backdropBlur.xs'),
          '-webkit-backdrop-filter': theme('backdropBlur.xs'),
        },
        
        // === UTILIDADES DE TEXTO CON GRADIENTE ===
        '.text-gradient': {
          background: theme('backgroundImage.buscart-gradient'),
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // === UTILIDADES DE BOTONES ===
        '.btn-buscart': {
          background: theme('backgroundImage.buscart-gradient'),
          border: 'none',
          borderRadius: theme('borderRadius.2xl'),
          color: theme('colors.text.white'),
          fontWeight: theme('fontWeight.bold'),
          padding: `${theme('spacing.4')} ${theme('spacing.6')}`,
          transition: 'all 0.3s var(--buscart-ease-out)',
          boxShadow: theme('boxShadow.buscart-md'),
          cursor: 'pointer',
          fontFamily: theme('fontFamily.sans'),
        },
        '.btn-buscart:hover': {
          boxShadow: theme('boxShadow.buscart-xl'),
          transform: 'translateY(-1px)',
        },
        '.btn-buscart:disabled': {
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(37, 99, 235, 0.3))',
          opacity: '0.6',
          transform: 'none',
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
        
        // === UTILIDADES DE INPUTS ===
        '.input-buscart': {
          background: theme('colors.bg.input'),
          border: `1.5px solid ${theme('colors.border.input')}`,
          borderRadius: theme('borderRadius.2xl'),
          padding: `${theme('spacing.4')} ${theme('spacing.4')}`,
          fontFamily: theme('fontFamily.sans'),
          fontSize: theme('fontSize.base'),
          color: theme('colors.text.primary'),
          transition: 'all 0.2s var(--buscart-ease-out)',
          outline: 'none',
        },
        '.input-buscart:focus': {
          borderColor: theme('colors.buscart.primary'),
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: theme('boxShadow.buscart-focus'),
        },
        '.input-buscart::placeholder': {
          color: 'rgba(124, 58, 237, 0.28)',
        },
        
        // === UTILIDADES DE PILLS ===
        '.pill-buscart': {
          display: 'inline-flex',
          alignItems: 'center',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'all 0.2s var(--buscart-ease-out)',
          cursor: 'pointer',
          fontFamily: theme('fontFamily.sans'),
        },
        '.pill-normal': {
          background: 'rgba(255, 255, 255, 0.75)',
          border: `1.5px solid ${theme('colors.border.medium')}`,
          color: theme('colors.violet.950'),
        },
        '.pill-selected': {
          background: theme('backgroundImage.buscart-gradient'),
          border: '1.5px solid transparent',
          color: theme('colors.text.white'),
          boxShadow: theme('boxShadow.buscart-md'),
        },
        
        // === UTILIDADES DE TARJETAS ===
        '.card-buscart': {
          background: theme('colors.bg.card'),
          border: `1px solid ${theme('colors.border.white')}`,
          borderRadius: theme('borderRadius.5xl'),
          boxShadow: theme('boxShadow.buscart-card'),
          transition: 'all 0.3s var(--buscart-ease-out)',
        },
        '.card-buscart:hover': {
          boxShadow: theme('boxShadow.buscart-hover'),
          transform: 'translateY(-2px)',
        },
        '.card-dark': {
          background: theme('backgroundImage.buscart-gradient'),
          borderRadius: theme('borderRadius.6xl'),
          boxShadow: theme('boxShadow.buscart-dark'),
        },
        
        // === UTILIDADES DE NOISE ===
        '.noise-overlay': {
          position: 'absolute',
          inset: '0',
          opacity: '0.025',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          borderRadius: 'inherit',
        },
        
        // === UTILIDADES DE HIGHLIGHT ===
        '.highlight-line': {
          position: 'absolute',
          top: '0',
          left: '1px',
          right: '1px',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 'inherit',
        },
        
        // === UTILIDADES DE FOCUS ===
        '.focus-ring': {
          outline: '2px solid #7c3aed',
          outlineOffset: '2px',
        },
        '.focus-ring:focus-visible': {
          outline: '2px solid #7c3aed',
          outlineOffset: '2px',
        },
      };
      
      addUtilities(newUtilities);
    },
    
    // Plugin para scrollbar personalizado
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-buscart::-webkit-scrollbar': {
          width: '6px',
        },
        '.scrollbar-buscart::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-buscart::-webkit-scrollbar-thumb': {
          background: 'rgba(124, 58, 237, 0.3)',
          borderRadius: '3px',
        },
        '.scrollbar-buscart::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(124, 58, 237, 0.5)',
        },
      });
    },
  ],
};
