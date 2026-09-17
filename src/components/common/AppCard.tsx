import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, StyleProp } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing, Shadows } from '../../constants/spacing';

export interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'primary';
  borderColor?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  style,
  onPress,
  shadow = 'sm',
  borderColor = Colors.border,
  backgroundColor = Colors.white,
  padding = Spacing.cardPadding,
  borderRadius = BorderRadius.lg,
}) => {
  const cardStyles = [
    styles.card,
    Shadows[shadow],
    {
      backgroundColor,
      borderColor,
      padding,
      borderRadius,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={cardStyles}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});
