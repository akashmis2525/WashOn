import React from 'react';
import { Text, TextStyle, TextProps, StyleProp } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';

export interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySm' | 'caption' | 'button' | 'tagline';
  color?: string;
  weight?: keyof typeof Typography.fontWeight;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = Colors.textPrimary,
  weight,
  align = 'left',
  children,
  style,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return {
          fontFamily: FontFamily.bold,
          fontSize: Typography.fontSize.display,
          lineHeight: Typography.lineHeight.display,
        };
      case 'h2':
        return {
          fontFamily: FontFamily.bold,
          fontSize: Typography.fontSize.xxl,
          lineHeight: Typography.lineHeight.xxl,
        };
      case 'h3':
        return {
          fontFamily: FontFamily.semiBold,
          fontSize: Typography.fontSize.lg,
          lineHeight: Typography.lineHeight.lg,
        };
      case 'bodySm':
        return {
          fontFamily: FontFamily.regular,
          fontSize: Typography.fontSize.sm,
          lineHeight: Typography.lineHeight.sm,
        };
      case 'caption':
        return {
          fontFamily: FontFamily.medium,
          fontSize: Typography.fontSize.xs,
          lineHeight: Typography.lineHeight.xs,
        };
      case 'button':
        return {
          fontFamily: FontFamily.bold,
          fontSize: Typography.fontSize.md,
          lineHeight: Typography.lineHeight.md,
        };
      case 'tagline':
        return {
          fontFamily: FontFamily.semiBold,
          fontSize: Typography.fontSize.md,
          lineHeight: Typography.lineHeight.md,
          letterSpacing: 0.5,
        };
      case 'body':
      default:
        return {
          fontFamily: FontFamily.regular,
          fontSize: Typography.fontSize.md,
          lineHeight: Typography.lineHeight.md,
        };
    }
  };

  const getFontFamilyForWeight = (w?: keyof typeof Typography.fontWeight) => {
    switch (w) {
      case 'extraBold':
        return FontFamily.extraBold;
      case 'bold':
        return FontFamily.bold;
      case 'semiBold':
        return FontFamily.semiBold;
      case 'medium':
        return FontFamily.medium;
      case 'regular':
      default:
        return undefined;
    }
  };

  const customFontFamily = getFontFamilyForWeight(weight);

  return (
    <Text
      style={[
        getVariantStyle(),
        { color, textAlign: align },
        customFontFamily ? { fontFamily: customFontFamily } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
