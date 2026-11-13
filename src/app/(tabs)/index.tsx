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
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router } from 'expo-router';
import {
  CleanWashLogo,
  CsAvatarBadge,
  DiscountTagIcon,
  HeroBasketIllustration,
  ServiceBadge,
} from '../../components/CleanWashIllustrations';
import {
  ArrowRightCircleIcon,
  RightChevronIcon,
} from '../../components/Icons';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import { SERVICE_LIST, ServiceId } from '../../types/order';

export default function BerandaScreen() {
  const { isLoggedIn } = useAuth();
  const { setServiceId, promoApplied, setPromoApplied } = useOrder();
  const [csModalVisible, setCsModalVisible] = useState(false);
  const [promoModalVisible, setPromoModalVisible] = useState(false);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  const handleSelectService = (id: ServiceId) => {
    setServiceId(id);
    router.push('/detail-pesanan');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <CleanWashLogo size={46} />
            <Text style={styles.brandText}>
              <Text style={styles.brandClean}>Clean</Text>
              <Text style={styles.brandWash}>Wash</Text>
            </Text>
          </View>
          <Pressable
            onPress={() => setCsModalVisible(true)}
            style={({ pressed }) => pressed && styles.pressed}
            accessibilityRole="button"
            accessibilityLabel="Bantuan Pelanggan"
          >
            <CsAvatarBadge size={44} />
          </Pressable>
        </View>

        {/* Hero Banner Card */}
        <View style={styles.heroShadow}>
          <LinearGradient
            colors={['#3FA8FF', '#1974E8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroLeft}>
              <Text style={styles.heroTitle}>Laundry{'\n'}Lebih Mudah!</Text>
              <Pressable
                onPress={() => router.push('/pilih-layanan')}
                style={({ pressed }) => [
                  styles.heroButton,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Pesan Sekarang"
              >
                <Text style={styles.heroButtonText}>Pesan Sekarang</Text>
                <ArrowRightCircleIcon size={18} color="#288AF2" />
              </Pressable>
            </View>
            <View style={styles.heroRight}>
              <HeroBasketIllustration />
            </View>
          </LinearGradient>
        </View>

        {/* Layanan Kami Section */}
        <Text style={styles.sectionTitle}>Layanan Kami</Text>
        <View style={styles.servicesRow}>
          {SERVICE_LIST.map((service) => (
            <Pressable
              key={service.id}
              onPress={() => handleSelectService(service.id)}
              style={({ pressed }) => [
                styles.serviceCard,
                pressed && styles.pressedCard,
              ]}
              accessibilityRole="button"
              accessibilityLabel={service.title}
            >
              <ServiceBadge variant={service.id} size={80} />
            </Pressable>
          ))}
        </View>

        {/* Promo Diskon 15% Card */}
        <Pressable
          onPress={() => setPromoModalVisible(true)}
          style={({ pressed }) => [
            styles.promoCard,
            pressed && styles.pressedCard,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Diskon 15% Untuk pelanggan baru"
        >
          <View style={styles.promoIconWrap}>
            <DiscountTagIcon size={44} />
          </View>
          <View style={styles.promoTextWrap}>
            <Text style={styles.promoTitle}>Diskon 15%</Text>
            <Text style={styles.promoSubtitle}>Untuk pelanggan baru</Text>
          </View>
          <RightChevronIcon size={20} color="#6BA9F8" />
        </Pressable>
      </ScrollView>

      {/* Customer Service Modal */}
      <Modal
        visible={csModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCsModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Layanan Bantuan CleanWash</Text>
            <Text style={styles.modalBody}>
              Ada kendala dengan pesanan atau butuh penjemputan cepat? Tim kami siap membantu setiap hari pukul 07.00 - 21.00 WIB.
            </Text>
            <View style={styles.modalInfoBox}>
              <Text style={styles.modalInfoText}>WhatsApp CS: +62 812-3456-7890</Text>
              <Text style={styles.modalInfoText}>Area Layanan: Sragen & Sekitarnya</Text>
            </View>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setCsModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Promo Modal */}
      <Modal
        visible={promoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPromoModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPromoModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Promo Pelanggan Baru 15%</Text>
            <Text style={styles.modalBody}>
              Nikmati potongan 15% untuk pesanan pertama Anda di CleanWash. Berlaku untuk semua layanan cuci dan setrika.
            </Text>
            <Pressable
              style={styles.modalPrimaryBtn}
              onPress={() => {
                setPromoApplied(!promoApplied);
                setPromoModalVisible(false);
              }}
            >
              <Text style={styles.modalPrimaryText}>
                {promoApplied ? 'Batalkan Promo 15%' : 'Gunakan Promo 15%'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setPromoModalVisible(false)}
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
    paddingTop: 6,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
  brandClean: {
    color: '#1E293B',
  },
  brandWash: {
    color: '#268AF3',
  },
  heroShadow: {
    borderRadius: 22,
    shadowColor: '#1974E8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 22,
  },
  heroCard: {
    borderRadius: 22,
    paddingVertical: 18,
    paddingLeft: 18,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 156,
  },
  heroLeft: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 18,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 7,
    paddingLeft: 12,
    paddingRight: 7,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#0F4999',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },
  heroButtonText: {
    color: '#2587F2',
    fontSize: 12.5,
    fontWeight: '700',
    marginRight: 6,
  },
  heroRight: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#225BB5',
    marginBottom: 12,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 18,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECF2FA',
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  promoCard: {
    backgroundColor: '#F1F6FE',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  promoIconWrap: {
    marginRight: 14,
  },
  promoTextWrap: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#225BB5',
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
  },
  pressed: {
    opacity: 0.85,
  },
  pressedCard: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
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
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 13.5,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 14,
  },
  modalInfoBox: {
    backgroundColor: '#F1F6FE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    gap: 4,
  },
  modalInfoText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalPrimaryBtn: {
    backgroundColor: '#2587F2',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
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
