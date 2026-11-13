import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ServiceBadge } from '../../components/CleanWashIllustrations';
import { PrimaryGradientButton } from '../../components/PrimaryGradientButton';
import { useOrder } from '../../context/OrderContext';
import { formatRupiah, LAUNDRY_SERVICES } from '../../types/order';

export default function PesananScreen() {
  const { activeOrders } = useOrder();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesanan</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeOrders.map((order) => {
          const service = LAUNDRY_SERVICES[order.serviceId];
          return (
            <Pressable
              key={order.orderNumber}
              onPress={() => router.push('/pesanan-berhasil')}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.cardTop}>
                <ServiceBadge variant={order.serviceId} size={72} />
                <View style={styles.info}>
                  <View style={styles.topRow}>
                    <Text style={styles.orderId}>{order.orderNumber}</Text>
                    <View style={styles.statusPill}>
                      <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.serviceName}>{service.title}</Text>
                  <Text style={styles.meta}>
                    {order.quantity} Pcs • {order.schedule}
                  </Text>
                  <Text style={styles.address} numberOfLines={1}>
                    {order.address}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.cardBottom}>
                <Text style={styles.totalLabel}>Total Pembayaran</Text>
                <Text style={styles.totalValue}>{formatRupiah(order.total)}</Text>
              </View>
            </Pressable>
          );
        })}

        <PrimaryGradientButton
          label="Buat Pesanan Baru"
          onPress={() => router.push('/pilih-layanan')}
          style={{ marginTop: 8 }}
        />
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
    gap: 14,
  },
  card: {
    backgroundColor: '#F3F8FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    padding: 14,
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#225BB5',
  },
  statusPill: {
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D56B3',
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  meta: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 2,
  },
  address: {
    fontSize: 11.5,
    color: '#475569',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2ECFA',
    marginVertical: 10,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  totalValue: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#225BB5',
  },
});
