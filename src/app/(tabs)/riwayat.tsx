import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceBadge } from '../../components/CleanWashIllustrations';
import { useOrder } from '../../context/OrderContext';
import { formatRupiah, LAUNDRY_SERVICES } from '../../types/order';

export default function RiwayatScreen() {
  const { historyOrders } = useOrder();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historyOrders.map((order) => {
          const service = LAUNDRY_SERVICES[order.serviceId];
          return (
            <View key={order.orderNumber} style={styles.card}>
              <ServiceBadge variant={order.serviceId} size={68} />
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
                <Text style={styles.price}>{formatRupiah(order.total)}</Text>
              </View>
            </View>
          );
        })}
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#225BB5',
  },
  statusPill: {
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  serviceName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  meta: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 4,
  },
  price: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#2587F2',
  },
});
