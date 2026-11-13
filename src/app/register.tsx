import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
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
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const { setPromoApplied } = useOrder();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Anda harus menyetujui Ketentuan Layanan CleanWash');
      return;
    }

    const res = await register(name, phone, email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Pendaftaran gagal. Periksa kembali data Anda.');
      return;
    }

    // Automatically apply 15% new customer promo
    setPromoApplied(true);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader
        title="Daftar Akun"
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/login');
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
          {/* Hero Branding */}
          <View style={styles.heroSection}>
            <CleanWashLogo size={66} />
            <Text style={styles.brandTitle}>
              <Text style={styles.brandClean}>Clean</Text>
              <Text style={styles.brandWash}>Wash</Text>
            </Text>
            <Text style={styles.greetingTitle}>Buat Akun Baru</Text>
            <Text style={styles.greetingSubtitle}>
              Daftar sekarang untuk kemudahan pemesanan dan nikmati diskon khusus pelanggan baru.
            </Text>

            {/* Promo Pill Banner */}
            <View style={styles.promoPill}>
              <Text style={styles.promoPillText}>
                ✨ Diskon 15% Otomatis untuk Pengguna Baru
              </Text>
            </View>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form Inputs */}
          <View style={styles.formSection}>
            {/* 1. Nama Lengkap */}
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <View style={styles.inputBox}>
              <UserIcon size={20} color="#2575E6" />
              <TextInput
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Contoh: Budi Santoso"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>

            {/* 2. Nomor WhatsApp / HP */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>
              Nomor WhatsApp / HP
            </Text>
            <View style={styles.inputBox}>
              <PhoneIcon size={20} color="#2575E6" />
              <TextInput
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Contoh: 081234567890"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={styles.textInput}
              />
            </View>

            {/* 3. Alamat Email */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>
              Alamat Email
            </Text>
            <View style={styles.inputBox}>
              <MailIcon size={20} color="#2575E6" />
              <TextInput
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Contoh: budi@gmail.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>

            {/* 4. Kata Sandi */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>Kata Sandi</Text>
            <View style={styles.inputBox}>
              <LockIcon size={20} color="#2575E6" />
              <TextInput
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Minimal 6 karakter"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.textInput}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressed}
                accessibilityRole="button"
                accessibilityLabel="Tampilkan sandi"
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color="#64748B" />
                ) : (
                  <EyeIcon size={20} color="#64748B" />
                )}
              </Pressable>
            </View>

            {/* 5. Konfirmasi Kata Sandi */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>
              Konfirmasi Kata Sandi
            </Text>
            <View style={styles.inputBox}>
              <LockIcon size={20} color="#2575E6" />
              <TextInput
                value={confirmPassword}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Ulangi kata sandi"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                style={styles.textInput}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressed}
                accessibilityRole="button"
                accessibilityLabel="Tampilkan konfirmasi sandi"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={20} color="#64748B" />
                ) : (
                  <EyeIcon size={20} color="#64748B" />
                )}
              </Pressable>
            </View>

            {/* Terms Agreement Checkbox */}
            <Pressable
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={styles.termsRow}
            >
              <View
                style={[
                  styles.checkbox,
                  agreeTerms && styles.checkboxActive,
                ]}
              >
                {agreeTerms ? <Text style={styles.checkmarkText}>✓</Text> : null}
              </View>
              <Text style={styles.termsText}>
                Saya menyetujui Ketentuan Layanan & Kebijakan Privasi CleanWash
              </Text>
            </Pressable>

            {/* Submit Button */}
            <PrimaryGradientButton
              label="Daftar Sekarang"
              onPress={handleRegister}
              rightIcon={<ArrowRightIcon size={18} color="#FFFFFF" />}
              style={styles.ctaButton}
            />

            {/* Switch to Login */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Sudah memiliki akun?</Text>
              <Pressable
                onPress={() => router.push('/login')}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.switchLink}> Masuk Sekarang</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 36,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 21,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
  },
  brandClean: {
    color: '#1E293B',
  },
  brandWash: {
    color: '#268AF3',
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  promoPill: {
    backgroundColor: '#EFF6FF',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  promoPillText: {
    color: '#1D56B3',
    fontSize: 11.5,
    fontWeight: '700',
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 22,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#2587F2',
    borderColor: '#2587F2',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  ctaButton: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  pressed: {
    opacity: 0.75,
  },
});
