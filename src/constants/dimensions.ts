import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  headerHeight: Platform.OS === 'ios' ? 44 : 56,
  bottomTabBarHeight: 64,
} as const;
