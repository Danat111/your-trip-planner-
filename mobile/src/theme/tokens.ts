/**
 * Same brand tokens as the web app's tailwind.config.js (primary = blue,
 * secondary = purple, accent = orange) so the mobile app feels like the
 * same product, not a reskin.
 */
export const colors = {
  primary: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 50: '#eff6ff' },
  secondary: { 500: '#8b5cf6', 600: '#7c3aed', 50: '#f5f3ff' },
  accent: { 500: '#f97316', 600: '#ea580c', 50: '#fff7ed' },
  neutral: {
    white: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    700: '#374151',
    900: '#111827',
  },
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export const radius = { sm: 8, md: 12, lg: 20, pill: 999 };

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
};
