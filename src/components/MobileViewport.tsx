import React from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

export function MobileViewport({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  if (Platform.OS !== 'web' || width <= 500) {
    return <View style={styles.nativeContainer}>{children}</View>;
  }

  return (
    <View style={[styles.webBackdrop, { minHeight: height }]}>
      <View style={[styles.phoneFrame, { height: Math.min(844, height - 24) }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webBackdrop: {
    flex: 1,
    backgroundColor: '#EEF3FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  phoneFrame: {
    width: 390,
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DCE6F5',
    shadowColor: '#0F2952',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 12,
  },
});
