import { TextStyle, Platform } from 'react-native';

export const FontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
};

const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  '2xl': 24,
  '3xl': 28,
  display: 30,
  hero: 36,
} as const;

export const Typography = {
  fontFamily: FontFamily,
  fontSize,
  size: fontSize,
  lineHeight: {
    xs: 16,
    sm: 19,
    md: 22,
    lg: 25,
    xl: 28,
    xxl: 32,
    display: 38,
    hero: 44,
  },
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    extraBold: '800' as TextStyle['fontWeight'],
  },
} as const;
