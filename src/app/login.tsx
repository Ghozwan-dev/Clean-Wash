import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CleanWashLogo } from '../components/CleanWashIllustrations';
import { ScreenHeader } from '../components/ScreenHeader';
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  PhoneIcon,
} from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, loginAsGuest, isLoggedIn } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');
    const res = await login(identifier, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Gagal masuk. Periksa kembali data Anda.');
      return;
    }
    router.replace('/(tabs)');
  };

  const handleGuest = () => {
    loginAsGuest();
    router.replace('/(tabs)');
  };

  const handleQuickDemo = () => {
    setIdentifier('081234567890');
    setPassword('cleanwash123');
    setErrorMessage('');
  };

  const handleSendReset = () => {
    if (!forgotPhone.trim()) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setForgotModalVisible(false);
      setForgotPhone('');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader
        title="Masuk"
        hideBack={!isLoggedIn}
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/(tabs)');
          }
        }}
      />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex1}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand & Heading */}
          <View style={styles.heroSection}>
            <CleanWashLogo size={74} />
            <Text style={styles.brandTitle}>
              <Text style={styles.brandClean}>Clean</Text>
              <Text style={styles.brandWash}>Wash</Text>
            </Text>
            <Text style={styles.greetingTitle}>Selamat Datang!</Text>
            <Text style={styles.greetingSubtitle}>
              Masuk ke akun Anda untuk memesan laundry, cek status, dan nikmati promo hemat.
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Input 1: Nomor HP / Email */}
            <Text style={styles.inputLabel}>Nomor HP atau Email</Text>
            <View style={styles.inputBox}>
              <PhoneIcon size={20} color="#2575E6" />
              <TextInput
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Contoh: 081234567890 atau email"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Input 2: Kata Sandi */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>Kata Sandi</Text>
            <View style={styles.inputBox}>
              <LockIcon size={20} color="#2575E6" />
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Minimal 6 karakter"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                style={styles.textInput}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressed}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color="#64748B" />
                ) : (
                  <EyeIcon size={20} color="#64748B" />
                )}
              </Pressable>
            </View>

            {/* Forgot Password Row */}
            <View style={styles.forgotRow}>
              <Pressable
                onPress={handleQuickDemo}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.quickDemoText}>Isi Akun Demo</Text>
              </Pressable>

              <Pressable
                onPress={() => setForgotModalVisible(true)}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
              </Pressable>
            </View>

            {/* Login CTA */}
            <PrimaryGradientButton
              label="Masuk Sekarang"
              onPress={handleLogin}
              rightIcon={<ArrowRightIcon size={18} color="#FFFFFF" />}
              style={styles.ctaButton}
            />

            {/* Switch to Register */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Belum memiliki akun?</Text>
              <Pressable
                onPress={() => router.push('/register')}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.switchLink}> Daftar Sekarang</Text>
              </Pressable>
            </View>

            {/* Guest Access Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              onPress={handleGuest}
              style={({ pressed }) => [styles.guestBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Lanjutkan sebagai Tamu"
            >
              <Text style={styles.guestBtnText}>Lanjutkan sebagai Tamu →</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        visible={forgotModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setForgotModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setForgotModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Atur Ulang Kata Sandi</Text>
            <Text style={styles.modalDesc}>
              Masukkan nomor WhatsApp atau email yang terdaftar. Tautan atau kode verifikasi akan dikirimkan.
            </Text>
            {forgotSent ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>
                  Kode verifikasi telah dikirim via WhatsApp!
                </Text>
              </View>
            ) : (
              <>
                <View style={[styles.inputBox, { marginBottom: 14 }]}>
                  <PhoneIcon size={20} color="#2575E6" />
                  <TextInput
                    value={forgotPhone}
                    onChangeText={setForgotPhone}
                    placeholder="Nomor WhatsApp Anda"
                    placeholderTextColor="#94A3B8"
                    style={styles.textInput}
                    keyboardType="phone-pad"
                  />
                </View>
                <PrimaryGradientButton
                  label="Kirim Kode Verifikasi"
                  onPress={handleSendReset}
                  style={{ marginBottom: 8 }}
                />
              </>
            )}
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setForgotModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 22,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 6,
  },
  brandClean: {
    color: '#1E293B',
  },
  brandWash: {
    color: '#268AF3',
  },
  greetingTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1E3A5F',
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#24344D',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: '#F3F8FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2ECFA',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#1E293B',
    marginLeft: 10,
    marginRight: 6,
    paddingVertical: 0,
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  quickDemoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2587F2',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  ctaButton: {
    marginBottom: 18,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  switchText: {
    fontSize: 13,
    color: '#64748B',
  },
  switchLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2587F2',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  guestBtn: {
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F1F6FE',
    borderWidth: 1,
    borderColor: '#DCEBFF',
  },
  guestBtnText: {
    color: '#2587F2',
    fontSize: 13.5,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  successBox: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  successText: {
    color: '#15803D',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalCloseBtn: {
    backgroundColor: '#EFF5FE',
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#225BB5',
    fontWeight: '700',
    fontSize: 14,
  },
});
