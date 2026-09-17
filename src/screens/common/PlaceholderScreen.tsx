import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppText } from '../../components/common/AppText';
import { AppHeader } from '../../components/headers/AppHeader';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

export const PlaceholderScreen: React.FC<{ screenNumber?: string; title?: string }> = ({
  screenNumber,
  title,
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const routeName = route.name;
  const displayTitle = title || routeName.replace(/^[0-9]+_/, '').replace(/([A-Z])/g, ' $1').trim();
  const screenNum = screenNumber || routeName.split('_')[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title={`${screenNum}. ${displayTitle}`}
        showBack={navigation.canGoBack()}
      />
      <View style={styles.container}>
        <View style={styles.badge}>
          <AppText variant="caption" weight="bold" color={Colors.black}>
            READY FOR PHASE IMPLEMENTATION
          </AppText>
        </View>

        <AppText variant="h2" weight="bold" color={Colors.black} align="center" style={styles.title}>
          Screen {screenNum}
        </AppText>
        <AppText variant="h3" color={Colors.darkYellow} align="center" style={styles.subtitle}>
          {displayTitle}
        </AppText>

        <AppText variant="body" color={Colors.textSecondary} align="center" style={styles.description}>
          This screen route is registered in the central navigation matrix. In the next phases, this screen will be fully populated with interactive components, form validations, and real mock workflows.
        </AppText>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate(Routes.SPLASH);
              }
            }}
          >
            <AppText variant="button" color={Colors.black}>
              Back to Splash
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: Colors.lightYellow,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primaryYellow,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    marginBottom: Spacing.lg,
  },
  description: {
    lineHeight: 22,
    marginBottom: Spacing.xl,
    maxWidth: 320,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  backBtn: {
    backgroundColor: Colors.primaryYellow,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
});
