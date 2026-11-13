import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import {
  QrisPaymentCard,
  SuccessCheckBadge,
} from '../components/CleanWashIllustrations';
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import { CopyIcon, RefreshSyncIcon } from '../components/Icons';
import { useOrder } from '../context/OrderContext';
import { formatRupiah } from '../types/order';

export default function PesananBerhasilScreen() {
  const { lastOrder } = useOrder();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(lastOrder.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failure on unsupported browsers
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.checkWrap}>
          <SuccessCheckBadge size={132} />
        </View>

        <Text style={styles.title}>Pesananan Berhasil</Text>
        <Text style={styles.subtitle}>
          Terima kasih telah{'\n'}menggunakan LaundryWash
        </Text>

        {/* Order Number Pill */}
        <View style={styles.orderPill}>
          <View style={styles.orderSpacer} />
          <View style={styles.orderCenter}>
            <Text style={styles.orderLabel}>No. Pesanan</Text>
            <Text style={styles.orderNumber}>{lastOrder.orderNumber}</Text>
            {copied ? <Text style={styles.copiedBadge}>Tersalin!</Text> : null}
          </View>
          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && styles.pressed,
            ]}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Salin nomor pesanan"
          >
            <CopyIcon size={21} color="#3B97F7" />
          </Pressable>
        </View>

        {/* QRIS Card */}
        <View style={styles.qrisWrap}>
          <QrisPaymentCard />
        </View>

        {/* Total Pembayaran Pill */}
        <View style={styles.totalPill}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalValue}>{formatRupiah(lastOrder.total)}</Text>
        </View>

        {/* Lihat Pesanan CTA */}
        <PrimaryGradientButton
          label="Lihat Pesanan"
          onPress={() => router.replace('/pesanan')}
          leftIcon={<RefreshSyncIcon size={18} color="#FFFFFF" />}
          style={styles.ctaButton}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 28,
    alignItems: 'center',
  },
  checkWrap: {
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#225BB5',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 18,
  },
  orderPill: {
    width: '84%',
    backgroundColor: '#F1F6FE',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  orderSpacer: {
    width: 24,
  },
  orderCenter: {
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#1E3A5F',
    letterSpacing: 0.2,
  },
  copiedBadge: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    color: '#2587F2',
  },
  copyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrisWrap: {
    marginBottom: 14,
    alignItems: 'center',
  },
  totalPill: {
    width: '74%',
    backgroundColor: '#F1F6FE',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#225BB5',
  },
  ctaButton: {
    width: '100%',
  },
  pressed: {
    opacity: 0.65,
  },
});
