// theme/index.ts — Punto de entrada principal para el tema global
// Export unificado para todo el proyecto

// Core theme elements
export * from './brand';

// Import for internal use
import { LogoStyles, BlobStyles, CardStyles, BackgroundStyles, BrandTypography } from './brand';

// Theme utilities
export const createTheme = () => ({
  brand: {
    logo: LogoStyles,
    blob: BlobStyles,
    card: CardStyles,
    background: BackgroundStyles,
    typography: BrandTypography,
  },
});

export type Theme = ReturnType<typeof createTheme>;
