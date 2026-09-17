import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../common/AppText';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <AppText variant="h3" weight="bold" color={Colors.black} align="center" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="body" color={Colors.textSecondary} align="center" style={styles.description}>
        {description}
      </AppText>
      {actionText && onAction ? (
        <PrimaryButton title={actionText} onPress={onAction} style={styles.button} />
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
    backgroundColor: Colors.lightYellow,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  description: {
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  button: {
    minWidth: 180,
  },
});
