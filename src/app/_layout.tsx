import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderProvider } from '../context/OrderContext';
import { MobileViewport } from '../components/MobileViewport';
import { PwaInstallModal } from '../components/PwaInstallModal';
import { usePwaInstall } from '../hooks/usePwaInstall';

export default function RootLayout() {
  const {
    showModal,
    isIos,
    hasNativePrompt,
    handleInstallClick,
    dismissModal,
  } = usePwaInstall();

  return (
    <SafeAreaProvider>
      <OrderProvider>
        <MobileViewport>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#FFFFFF' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="pilih-layanan" options={{ headerShown: false }} />
            <Stack.Screen name="detail-pesanan" options={{ headerShown: false }} />
            <Stack.Screen name="ringkasan-pesanan" options={{ headerShown: false }} />
            <Stack.Screen name="pesanan-berhasil" options={{ headerShown: false }} />
          </Stack>

          {/* PWA Install Prompt Modal */}
          <PwaInstallModal
            visible={showModal}
            isIos={isIos}
            hasNativePrompt={hasNativePrompt}
            onInstall={handleInstallClick}
            onDismiss={dismissModal}
          />
        </MobileViewport>
      </OrderProvider>
    </SafeAreaProvider>
  );
}
