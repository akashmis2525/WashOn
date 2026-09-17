import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { AppText } from '../common/AppText';
import { Spacing } from '../../constants/spacing';

export interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 48,
  color = Colors.primaryYellow,
  message,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={size} height={size} viewBox="0 0 50 50">
          <Circle
            cx="25"
            cy="25"
            r="20"
            stroke="#EEEEEE"
            strokeWidth="4"
            fill="none"
          />
          <Circle
            cx="25"
            cy="25"
            r="20"
            stroke={color}
            strokeWidth="4"
            strokeDasharray="90, 150"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
      {message ? (
        <AppText variant="bodySm" color={Colors.textSecondary} style={styles.message}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  message: {
    marginTop: Spacing.sm,
  },
});
