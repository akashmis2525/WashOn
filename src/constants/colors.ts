export const Colors = {
  // Brand Colors
  primaryYellow: '#FFC107',
  darkYellow: '#FFB300',
  lightYellow: '#FFF8E1',
  yellowGradientStart: '#FFD54F',
  yellowGradientEnd: '#FFB300',

  // Base Neutrals
  black: '#111111',
  darkGray: '#1F2937',
  charcoal: '#374151',
  white: '#FFFFFF',
  lightBackground: '#FAFAFA',
  cardBackground: '#FFFFFF',

  // Typography
  textPrimary: '#111111',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textMuted: '#9CA3AF',
  textLight: '#F3F4F6',
  textOnPrimary: '#111111',

  // UI Elements
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  divider: '#EEEEEE',
  inputBackground: '#F9FAFB',
  backdrop: 'rgba(17, 17, 17, 0.6)',

  // Feedback & Status
  success: '#16A34A',
  successLight: '#DCFCE7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#2563EB',
  infoLight: '#DBEAFE',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',

  // Rating & Tags
  gold: '#F59E0B',
  badge: '#FFF3C4',
  shadowColor: '#000000',

  // Gray Scale Palette
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

export type ColorKeys = keyof typeof Colors;
