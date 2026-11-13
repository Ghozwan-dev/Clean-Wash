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
import { ScreenHeader } from '../components/ScreenHeader';
import { ServiceBadge } from '../components/CleanWashIllustrations';
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  RightChevronIcon,
  SearchIcon,
} from '../components/Icons';
import { useOrder } from '../context/OrderContext';
import {
  formatRupiah,
  LAUNDRY_SERVICES,
  SCHEDULE_OPTIONS,
} from '../types/order';

export default function DetailPesananScreen() {
  const {
    serviceId,
    quantity,
    setQuantity,
    schedule,
    setSchedule,
    address,
    setAddress,
    note,
    setNote,
    subtotal,
    shippingFee,
    discount,
    total,
  } = useOrder();

  const service = LAUNDRY_SERVICES[serviceId];
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader title="Detail Pesanan" />

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
          {/* Selected Service Card */}
          <Pressable
            onPress={() => router.push('/pilih-layanan')}
            style={({ pressed }) => [
              styles.serviceCard,
              pressed && styles.pressedCard,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Layanan dipilih: ${service.title}`}
          >
            <ServiceBadge variant={serviceId} size={86} />
            <View style={styles.serviceTitleWrap}>
              <Text style={styles.serviceTitle}>{service.multilineTitle}</Text>
            </View>
            <RightChevronIcon size={20} color="#60A5FA" />
          </Pressable>

          {/* Jumlah Pakaian */}
          <Text style={styles.fieldLabel}>Jumlah Pakaian</Text>
          <View style={styles.qtyRow}>
            <Pressable
              onPress={() => setQuantity(quantity - 1)}
              style={({ pressed }) => [
                styles.qtyBtn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Kurangi jumlah pakaian"
            >
              <MinusIcon size={14} color="#2575E6" />
            </Pressable>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              style={({ pressed }) => [
                styles.qtyBtn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Tambah jumlah pakaian"
            >
              <PlusIcon size={14} color="#2575E6" />
            </Pressable>

            <Text style={styles.qtyUnit}>Pcs</Text>
          </View>

          <Pressable
            onPress={() => setPriceModalVisible(true)}
            style={({ pressed }) => [
              styles.priceLinkRow,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Lihat detail harga"
          >
            <Text style={styles.priceLinkText}>Lihat detail harga</Text>
            <RightChevronIcon size={13} color="#60A5FA" />
          </Pressable>

          {/* Jadwal Pengambilan */}
          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
            Jadwal Pengambilan
          </Text>
          <Pressable
            onPress={() => setScheduleModalVisible(true)}
            style={({ pressed }) => [
              styles.inputBox,
              pressed && styles.pressedCard,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Pilih jadwal pengambilan"
          >
            <CalendarIcon size={21} color="#3B82F6" />
            <Text style={styles.scheduleText}>{schedule}</Text>
            <RightChevronIcon size={18} color="#60A5FA" />
          </Pressable>

          {/* Alamat Penjemputan */}
          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
            Alamat Penjemputan
          </Text>
          <View style={styles.inputBox}>
            <MapPinIcon size={21} color="#2575E6" />
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Masukkan alamat penjemputan"
              placeholderTextColor="#94A3B8"
              style={styles.addressInput}
            />
            <SearchIcon size={16} color="#5B9BF0" />
          </View>

          {/* Catatan Tambahan */}
          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
            Catatan Tambahan
          </Text>
          <View style={styles.notesBox}>
            <TextInput
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
              placeholder={
                'Contoh :\nPakaian bayi dipisah, pakaian putih di pisah, pakai parfume lavender ya!'
              }
              placeholderTextColor="#94A3B8"
              style={styles.notesInput}
            />
          </View>

          {/* Primary CTA Button */}
          <PrimaryGradientButton
            label="Lanjut"
            onPress={() => router.push('/ringkasan-pesanan')}
            rightIcon={<ArrowRightIcon size={17} color="#FFFFFF" />}
            style={styles.ctaButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Detail Harga Modal */}
      <Modal
        visible={priceModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPriceModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPriceModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Detail Harga</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>
                {service.title} ({quantity} × {formatRupiah(service.pricePerPiece)})
              </Text>
              <Text style={styles.modalVal}>{formatRupiah(subtotal)}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ongkir</Text>
              <Text style={styles.modalVal}>{formatRupiah(shippingFee)}</Text>
            </View>
            {discount > 0 ? (
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Diskon 15%</Text>
                <Text style={styles.modalVal}>-{formatRupiah(discount)}</Text>
              </View>
            ) : null}
            <View style={styles.modalDivider} />
            <View style={styles.modalRow}>
              <Text style={styles.modalTotalLabel}>Estimasi Total</Text>
              <Text style={styles.modalTotalVal}>{formatRupiah(total)}</Text>
            </View>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setPriceModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Jadwal Picker Modal */}
      <Modal
        visible={scheduleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setScheduleModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setScheduleModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Pilih Jadwal Pengambilan</Text>
            <View style={{ gap: 8, marginBottom: 14 }}>
              {SCHEDULE_OPTIONS.map((opt) => {
                const selected = opt === schedule;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      setSchedule(opt);
                      setScheduleModalVisible(false);
                    }}
                    style={[
                      styles.optionItem,
                      selected && styles.optionItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setScheduleModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Batal</Text>
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
    paddingLeft: 14,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 18,
  },
  serviceTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334E68',
    textAlign: 'center',
    lineHeight: 22,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#24344D',
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EDF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  qtyValue: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#1E293B',
    minWidth: 34,
    textAlign: 'center',
  },
  qtyUnit: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 10,
  },
  priceLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
    gap: 2,
  },
  priceLinkText: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#64748B',
  },
  inputBox: {
    backgroundColor: '#F3F8FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  addressInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
    marginLeft: 10,
    marginRight: 8,
    paddingVertical: 0,
  },
  notesBox: {
    backgroundColor: '#F3F8FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F0FC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 110,
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  notesInput: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
    minHeight: 86,
  },
  ctaButton: {
    marginTop: 24,
  },
  pressed: {
    opacity: 0.75,
  },
  pressedCard: {
    opacity: 0.9,
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
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
    paddingRight: 8,
  },
  modalVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  modalTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  modalTotalVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#225BB5',
  },
  optionItem: {
    backgroundColor: '#F3F8FF',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2ECFA',
  },
  optionItemSelected: {
    backgroundColor: '#E0EEFF',
    borderColor: '#2587F2',
  },
  optionText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#334155',
  },
  optionTextSelected: {
    color: '#1D56B3',
  },
  modalCloseBtn: {
    marginTop: 12,
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
