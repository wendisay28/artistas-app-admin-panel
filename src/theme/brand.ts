// theme/brand.ts — Componentes de marca globales inspirados en el onboarding
// Logo, blobs y elementos visuales consistentes

// ── Logo Component Styles ─────────────────────────────────────────────────────
export const LogoStyles = {
  // Logo "BuscArt" - basado en WelcomeScreen
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px', // Sin espacio entre "Busc" y "Art"
  },
  buscText: {
    fontSize: '1.35rem',
    fontWeight: 800,
    color: '#1e1b4b', // primaryDeep
    letterSpacing: '-0.06em',
    lineHeight: 1,
  },
  artBackground: {
    borderRadius: '8px',
    padding: '2px 6px',
    marginLeft: '0px', // Sin margen adicional
    background: 'linear-gradient(to right, #7c3aed, #2563eb)',
    display: 'inline-block',
  },
  artText: {
    fontSize: '1.15rem', // Más pequeño que "Busc"
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.06em',
    lineHeight: 1,
  },
} as const;

// ── Animated Blob Styles ───────────────────────────────────────────────────────
export const BlobStyles = {
  // Configuración base para blobs animados
  base: {
    position: 'absolute' as const,
    borderRadius: '50%',
    opacity: 0.5,
    pointerEvents: 'none' as const,
  },
  
  // Configuraciones específicas de blobs (adaptadas para web)
  blob1: {
    size: '220px',
    width: '220px',
    height: '220px',
    background: 'linear-gradient(to bottom right, #a78bfa, #7c3aed)',
    top: '-20px',
    right: '-16px',
  },
  blob2: {
    size: '170px',
    width: '170px',
    height: '170px',
    background: 'linear-gradient(to bottom right, #60a5fa, #2563eb)',
    bottom: '-16px',
    left: '-10px',
  },
} as const;

// ── Card Styles ────────────────────────────────────────────────────────────────
export const CardStyles = {
  // Border radius consistente
  borderRadius: '28px',
  
  // Tarjeta oscura (estilo Artista)
  darkGradient: 'linear-gradient(to bottom right, #5b21b6, #1d4ed8)',
  darkShadow: {
    boxShadow: '0 10px 20px rgba(91, 33, 182, 0.28)',
  },
  
  // Tarjeta clara (estilo Cliente)
  lightBackground: 'rgba(255,255,255,0.88)',
  lightBorder: 'rgba(167,139,250,0.35)',
  lightShadow: {
    boxShadow: '0 6px 14px rgba(124,58,237,0.12)',
  },
  
  // Elementos internos de tarjetas
  innerBlob: {
    dark: 'rgba(255,255,255,0.07)',
    light: 'rgba(124,58,237,0.07)',
  },
  arrowWrap: {
    dark: 'rgba(255,255,255,0.15)',
    light: 'rgba(124,58,237,0.1)',
  },
  iconWrap: {
    dark: {
      backgroundColor: 'rgba(255,255,255,0.16)',
      borderColor: 'rgba(255,255,255,0.22)',
    },
    light: {
      backgroundColor: 'rgba(124,58,237,0.1)',
      borderColor: 'rgba(124,58,237,0.18)',
    },
  },
} as const;

// ── Background Styles ───────────────────────────────────────────────────────────
export const BackgroundStyles = {
  // Gradiente principal del fondo
  mainGradient: 'linear-gradient(to bottom right, #f0ebff, #eaf0ff, #fafafa)',
  
  // Overlay de ruido/sutil
  noiseOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.18)',
    pointerEvents: 'none' as const,
  },
} as const;

// ── Typography Brand Styles ─────────────────────────────────────────────────────
export const BrandTypography = {
  // Headlines principales
  headline: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#1e1b4b',
    lineHeight: 1.25,
    letterSpacing: '-0.03em',
  },
  
  // Subheadlines
  subheadline: {
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: '#7c3aed',
    lineHeight: 1.4,
    opacity: 0.85,
  },
  
  // Pills y badges
  pillText: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: '#7c3aed',
    letterSpacing: '0.02em',
  },
  
  // Títulos de tarjetas
  cardTitle: {
    dark: {
      fontSize: '1.1875rem',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '-0.02em',
    },
    light: {
      fontSize: '1.1875rem',
      fontWeight: 700,
      color: '#1e1b4b',
      letterSpacing: '-0.02em',
    },
  },
} as const;

// ── Export Types ───────────────────────────────────────────────────────────────
export type LogoStyleKeys = keyof typeof LogoStyles;
export type BlobStyleKeys = keyof typeof BlobStyles;
export type CardStyleKeys = keyof typeof CardStyles;
