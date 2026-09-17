import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { AppText } from '../common/AppText';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not complete your request. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <AlertCircle size={40} color={Colors.error} />
      </View>
      <AppText variant="h3" weight="bold" color={Colors.black} align="center" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="body" color={Colors.textSecondary} align="center" style={styles.message}>
        {message}
      </AppText>
      {onRetry ? (
        <PrimaryButton title="Try Again" onPress={onRetry} style={styles.button} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  iconWrapper: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 50,
    backgroundColor: Colors.errorLight,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  message: {
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  button: {
    minWidth: 160,
  },
});
