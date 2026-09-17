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
import { BorderRadius, Spacing } from '../../constants/spacing';
import { AppText } from '../common/AppText';

export interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'outline' | 'ghost' | 'black';
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'outline',
  icon,
  size = 'md',
}) => {
  const isInteractive = !loading && !disabled;

  const getVariantStyle = () => {
    switch (variant) {
      case 'black':
        return {
          backgroundColor: Colors.black,
          borderColor: Colors.black,
          textColor: Colors.white,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: Colors.black,
        };
      case 'outline':
      default:
        return {
          backgroundColor: Colors.white,
          borderColor: Colors.border,
          textColor: Colors.black,
        };
    }
  };

  const currentVariant = getVariantStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!isInteractive}
      style={[
        styles.button,
        styles[size],
        {
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.textColor} size="small" />
      ) : (
        <>
          {icon ? icon : null}
          <AppText
            variant="button"
            color={disabled ? Colors.textMuted : currentVariant.textColor}
            style={[styles.text, icon ? styles.textWithIcon : undefined, textStyle]}
          >
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
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
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  textWithIcon: {
    marginLeft: Spacing.xs,
  },
});
