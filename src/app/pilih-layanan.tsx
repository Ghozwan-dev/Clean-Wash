import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ScreenHeader } from '../components/ScreenHeader';
import { ServiceBadge } from '../components/CleanWashIllustrations';
import { RightChevronIcon } from '../components/Icons';
import { useOrder } from '../context/OrderContext';
import { SERVICE_LIST, ServiceId } from '../types/order';

export default function PilihLayananScreen() {
  const { setServiceId } = useOrder();

  const handleSelect = (id: ServiceId) => {
    setServiceId(id);
    router.push('/detail-pesanan');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader title="Pilih Layanan" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Tentukan layanan laundry yang{'\n'}Anda butuhkan
        </Text>

        <View style={styles.list}>
          {SERVICE_LIST.map((service) => (
            <Pressable
              key={service.id}
              onPress={() => handleSelect(service.id)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.pressedCard,
              ]}
              accessibilityRole="button"
              accessibilityLabel={service.title}
            >
              <ServiceBadge variant={service.id} size={86} />
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{service.multilineTitle}</Text>
              </View>
              <RightChevronIcon size={20} color="#60A5FA" />
            </Pressable>
          ))}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '500',
    color: '#334155',
    lineHeight: 19,
    marginBottom: 24,
  },
  list: {
    gap: 18,
  },
  card: {
    backgroundColor: '#F5F9FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E9F1FC',
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  pressedCard: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334E68',
    textAlign: 'center',
    lineHeight: 22,
  },
});
