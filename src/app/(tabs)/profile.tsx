import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CleanWashLogo } from '../../components/CleanWashIllustrations';
import { PrimaryGradientButton } from '../../components/PrimaryGradientButton';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';

export default function ProfileScreen() {
  const { address } = useOrder();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <CleanWashLogo size={66} />
          <Text style={styles.name}>
            {isLoggedIn && user ? user.name : 'Tamu CleanWash'}
          </Text>
          <Text style={styles.phone}>
            {isLoggedIn && user ? user.phone : 'Belum masuk ke akun'}
          </Text>
          {isLoggedIn && user?.email ? (
            <Text style={styles.email}>{user.email}</Text>
          ) : null}
        </View>

        {/* Info Detail Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Alamat Utama</Text>
          <Text style={styles.infoValue}>{address}</Text>
          <View style={styles.divider} />

          <Text style={styles.infoLabel}>Status Akun</Text>
          <Text style={styles.infoValue}>
            {isLoggedIn && user
              ? user.isNewCustomer
                ? 'Pelanggan Baru (Promo 15% Tersedia)'
                : 'Pelanggan Terdaftar'
              : 'Mode Tamu'}
          </Text>
          <View style={styles.divider} />

          <Text style={styles.infoLabel}>Cabang Terdekat</Text>
          <Text style={styles.infoValue}>LaundryWash Sragen Kota</Text>
        </View>

        {/* Auth Actions */}
        {isLoggedIn ? (
          <View style={styles.authActionSection}>
            <Pressable
              onPress={() => router.push('/login')}
              style={({ pressed }) => [
                styles.outlineBtn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Ganti Akun"
            >
              <Text style={styles.outlineBtnText}>Ganti Akun</Text>
            </Pressable>

            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => [
                styles.logoutBtn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Keluar dari Akun"
            >
              <Text style={styles.logoutBtnText}>Keluar (Logout)</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.guestActionSection}>
            <PrimaryGradientButton
              label="Masuk ke Akun"
              onPress={() => router.push('/login')}
              style={{ marginBottom: 10 }}
            />
            <Pressable
              onPress={() => router.push('/register')}
              style={({ pressed }) => [
                styles.registerGhostBtn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Daftar Akun Baru"
            >
              <Text style={styles.registerGhostText}>
                Belum punya akun? Daftar Sekarang
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#225BB5',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    gap: 16,
  },
  profileCard: {
    backgroundColor: '#F3F8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
  },
  phone: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  email: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#2587F2',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#F3F8FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    padding: 18,
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2ECFA',
    marginVertical: 12,
  },
  authActionSection: {
    gap: 10,
    marginTop: 6,
  },
  outlineBtn: {
    backgroundColor: '#EFF5FE',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFE2FE',
  },
  outlineBtnText: {
    color: '#225BB5',
    fontWeight: '700',
    fontSize: 14,
  },
  logoutBtn: {
    backgroundColor: '#FFF1F2',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  logoutBtnText: {
    color: '#E11D48',
    fontWeight: '700',
    fontSize: 14,
  },
  guestActionSection: {
    marginTop: 4,
  },
  registerGhostBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  registerGhostText: {
    color: '#2587F2',
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
