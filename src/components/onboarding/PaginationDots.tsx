import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export interface PaginationDotsProps {
  total?: number;
  activeIndex: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total = 3,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    backgroundColor: '#FFA000',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E5E7EB',
  },
});
