import React from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const LOGO_IMAGE = require('../../assets/images/logo-cleanwash.png');

interface PwaInstallModalProps {
  visible: boolean;
  isIos: boolean;
  hasNativePrompt: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export function PwaInstallModal({
  visible,
  isIos,
  hasNativePrompt,
  onInstall,
  onDismiss,
}: PwaInstallModalProps) {
  if (Platform.OS !== 'web' || !visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Top Decorative Gradient Ribbon */}
          <LinearGradient
            colors={['#3CA6FF', '#1676EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerRibbon}
          >
            <View style={styles.iconCircle}>
              <Image
                source={LOGO_IMAGE}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>Aplikasi Resmi CleanWash</Text>
            </View>
          </LinearGradient>

          {/* Content Body */}
          <View style={styles.body}>
            <Text style={styles.title}>Pasang di Layar Utama</Text>
            <Text style={styles.subtitle}>
              Nikmati kemudahan pesan laundry dengan aplikasi CleanWash yang
              ringan, cepat, dan siap pakai kapan saja.
            </Text>

            {/* Feature List */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.featureCheck}>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 6L9 17L4 12"
                      stroke="#1E74E2"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureBold}>Akses 1-Klik Cepat</Text>
                  <Text style={styles.featureDesc}>
                    Buka instan langsung dari ikon di layar HP / PC Anda
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureCheck}>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 6L9 17L4 12"
                      stroke="#1E74E2"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureBold}>Tampilan Layar Penuh</Text>
                  <Text style={styles.featureDesc}>
                    Bebas bilah browser, pengalaman persis aplikasi mobile asli
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureCheck}>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 6L9 17L4 12"
                      stroke="#1E74E2"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureBold}>Sangat Ringan & Hemat Memori</Text>
                  <Text style={styles.featureDesc}>
                    Hanya butuh beberapa MB tanpa download berat dari Play Store
                  </Text>
                </View>
              </View>
            </View>

            {/* iOS Instructions (if on iPhone/iPad Safari) */}
            {isIos && (
              <View style={styles.iosInstructionBox}>
                <Text style={styles.iosInstructionTitle}>
                  Petunjuk Pasang di iPhone/iPad:
                </Text>
                <Text style={styles.iosStep}>
                  1. Ketuk tombol <Text style={styles.iosBold}>Bagikan (Share)</Text> di bilah bawah Safari.
                </Text>
                <Text style={styles.iosStep}>
                  2. Pilih <Text style={styles.iosBold}>&ldquo;Tambahkan ke Layar Utama&rdquo;</Text> (Add to Home Screen).
                </Text>
              </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
              {!isIos ? (
                <Pressable
                  onPress={onInstall}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Install CleanWash Sekarang"
                >
                  <LinearGradient
                    colors={['#3CA6FF', '#1676EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBtn}
                  >
                    <Svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ marginRight: 8 }}
                    >
                      <Path
                        d="M12 3V15M12 15L7 10M12 15L17 10"
                        stroke="#FFFFFF"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M4 18V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V18"
                        stroke="#FFFFFF"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                      />
                    </Svg>
                    <Text style={styles.primaryBtnText}>
                      {hasNativePrompt ? 'Install Sekarang' : 'Pasang Aplikasi'}
                    </Text>
                  </LinearGradient>
                </Pressable>
              ) : null}

              <Pressable
                onPress={onDismiss}
                style={({ pressed }) => [
                  styles.dismissBtn,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Nanti Saja"
              >
                <Text style={styles.dismissBtnText}>
                  {isIos ? 'Tutup Petunjuk' : 'Nanti Saja'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0E4999',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 16,
  },
  headerRibbon: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A3B7E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 8,
  },
  logoImage: {
    width: 62,
    height: 62,
  },
  badgePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  body: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E3A5F',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  featuresList: {
    backgroundColor: '#F3F8FF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DCEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  featureTextWrap: {
    flex: 1,
  },
  featureBold: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 1,
  },
  featureDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  iosInstructionBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 16,
  },
  iosInstructionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 4,
  },
  iosStep: {
    fontSize: 11.5,
    color: '#334155',
    lineHeight: 16,
  },
  iosBold: {
    fontWeight: '700',
    color: '#1E40AF',
  },
  actions: {
    gap: 8,
  },
  primaryBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1E74E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  gradientBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  dismissBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
  },
  dismissBtnText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
