import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing, Shadows } from '../../constants/spacing';
import { AppText } from '../common/AppText';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  size = 'md',
}) => {
  const isInteractive = !loading && !disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!isInteractive}
      style={[
        styles.button,
        styles[size],
        disabled && styles.disabled,
        !disabled && Shadows.primary,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.black} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' ? icon : null}
          <AppText
            variant="button"
            color={disabled ? Colors.textMuted : Colors.black}
            style={[styles.text, icon ? styles.textWithIcon : undefined, textStyle]}
          >
            {title}
          </AppText>
          {icon && iconPosition === 'right' ? icon : null}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryYellow,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    height: 40,
    paddingHorizontal: Spacing.md,
  },
  md: {
    height: 52,
    paddingHorizontal: Spacing.xl,
  },
  lg: {
    height: 58,
    paddingHorizontal: Spacing.xxl,
  },
  disabled: {
    backgroundColor: Colors.border,
  },
  text: {
    fontWeight: '700',
  },
  textWithIcon: {
    marginHorizontal: Spacing.xs,
  },
});
