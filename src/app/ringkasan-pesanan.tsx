import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ScreenHeader } from '../components/ScreenHeader';
import { ServiceBadge } from '../components/CleanWashIllustrations';
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import {
  ArrowRightIcon,
  CalendarIcon,
  DownChevronIcon,
  MapPinIcon,
  NoteDocIcon,
} from '../components/Icons';
import { useOrder } from '../context/OrderContext';
import {
  formatNumber,
  LAUNDRY_SERVICES,
  PAYMENT_METHODS,
} from '../types/order';

export default function RingkasanPesananScreen() {
  const {
    serviceId,
    quantity,
    schedule,
    address,
    note,
    paymentMethod,
    setPaymentMethod,
    subtotal,
    shippingFee,
    discount,
    total,
    confirmOrder,
  } = useOrder();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const service = LAUNDRY_SERVICES[serviceId];
  const displayNote = note.trim() || 'Pakaian putih dipisah';

  const handleConfirm = () => {
    confirmOrder();
    router.push('/pesanan-berhasil');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader title="Ringkasan Pesanan" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Service Summary Card */}
        <View style={styles.serviceCard}>
          <ServiceBadge variant={serviceId} size={86} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceQty}>{quantity} Pcs</Text>
          </View>
        </View>

        {/* Info Rows */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <CalendarIcon size={21} color="#3B82F6" />
            <Text style={styles.infoLabel}>Jadwal</Text>
            <Text style={styles.infoValue}>{schedule}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <MapPinIcon size={21} color="#2575E6" />
            <Text style={styles.infoLabel}>Alamat</Text>
            <Text style={styles.infoValue}>{address || 'Jln. Raya No.10 Sragen'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <NoteDocIcon size={21} color="#3B82F6" />
            <Text style={styles.infoLabel}>Catatan</Text>
            <Text style={styles.infoValue} numberOfLines={2}>
              {displayNote}
            </Text>
          </View>
          <View style={styles.divider} />
        </View>

        {/* Price Summary */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{formatNumber(subtotal)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Ongkir</Text>
            <Text style={styles.priceValue}>{formatNumber(shippingFee)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Diskon</Text>
            <Text style={styles.priceValue}>{formatNumber(discount)}</Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{formatNumber(total)}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Metode Pembayaran</Text>
            <Pressable
              onPress={() => setPaymentModalVisible(true)}
              style={({ pressed }) => [
                styles.methodSelector,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Pilih metode pembayaran"
            >
              <Text style={styles.methodText}>
                {paymentMethod || 'Pilih Metode'}
              </Text>
              <DownChevronIcon size={14} color="#60A5FA" />
            </Pressable>
          </View>
        </View>

        {/* Confirm Button */}
        <PrimaryGradientButton
          label="Konfirmasi Pesanan"
          onPress={handleConfirm}
          rightIcon={<ArrowRightIcon size={17} color="#FFFFFF" />}
          style={styles.ctaButton}
        />
      </ScrollView>

      {/* Payment Method Modal */}
      <Modal
        visible={paymentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPaymentModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Pilih Metode Pembayaran</Text>
            <View style={{ gap: 8, marginBottom: 14 }}>
              {PAYMENT_METHODS.map((method) => {
                const selected = paymentMethod === method;
                return (
                  <Pressable
                    key={method}
                    onPress={() => {
                      setPaymentMethod(method);
                      setPaymentModalVisible(false);
                    }}
                    style={[
                      styles.methodOption,
                      selected && styles.methodOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.methodOptionText,
                        selected && styles.methodOptionTextSelected,
                      ]}
                    >
                      {method}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setPaymentModalVisible(false)}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 28,
  },
  serviceCard: {
    backgroundColor: '#F3F8FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 18,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 14,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334E68',
    marginBottom: 4,
  },
  serviceQty: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#64748B',
  },
  infoSection: {
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
    width: 78,
    marginLeft: 12,
  },
  infoValue: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
  },
  priceSection: {
    paddingTop: 4,
    gap: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#24344D',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  totalRow: {
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  totalValue: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  methodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingLeft: 8,
  },
  methodText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#64748B',
  },
  ctaButton: {
    marginTop: 28,
  },
  pressed: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#225BB5',
    marginBottom: 14,
  },
  methodOption: {
    backgroundColor: '#F3F8FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2ECFA',
  },
  methodOptionSelected: {
    backgroundColor: '#E0EEFF',
    borderColor: '#2587F2',
  },
  methodOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  methodOptionTextSelected: {
    color: '#1D56B3',
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
