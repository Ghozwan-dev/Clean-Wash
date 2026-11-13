import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CleanWashLogo } from '../../components/CleanWashIllustrations';
import { useOrder } from '../../context/OrderContext';

export default function ProfileScreen() {
  const { address } = useOrder();

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
        <View style={styles.profileCard}>
          <CleanWashLogo size={64} />
          <Text style={styles.name}>Pelanggan CleanWash</Text>
          <Text style={styles.phone}>+62 812-3456-7890</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Alamat Utama</Text>
          <Text style={styles.infoValue}>{address}</Text>
          <View style={styles.divider} />
          <Text style={styles.infoLabel}>Status Akun</Text>
          <Text style={styles.infoValue}>Pelanggan Baru (Promo 15% Tersedia)</Text>
          <View style={styles.divider} />
          <Text style={styles.infoLabel}>Cabang Terdekat</Text>
          <Text style={styles.infoValue}>LaundryWash Sragen Kota</Text>
        </View>
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
});
