import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  G,
  Path,
  Rect,
} from 'react-native-svg';
import { ServiceId } from '../types/order';

const LOGO_IMAGE = require('../../assets/images/logo-cleanwash.png');
const CS_AVATAR_IMAGE = require('../../assets/images/cs-avatar.png');
const HERO_BASKET_IMAGE = require('../../assets/images/hero-basket.png');
const SERVICE_CUCI_KERING_IMAGE = require('../../assets/images/service-cuci-kering.png');
const SERVICE_CUCI_SETRIKA_IMAGE = require('../../assets/images/service-cuci-setrika.png');
const SERVICE_SETRIKA_SAJA_IMAGE = require('../../assets/images/service-setrika-saja.png');
const SUCCESS_CHECK_IMAGE = require('../../assets/images/success-check.png');
const DISCOUNT_TAG_IMAGE = require('../../assets/images/discount-tag.png');

export function CleanWashLogo({ size = 44 }: { size?: number }) {
  return (
    <Image
      source={LOGO_IMAGE}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function CsAvatarBadge({ size = 46 }: { size?: number }) {
  return (
    <View style={csStyles.container}>
      <Image
        source={CS_AVATAR_IMAGE}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      <View style={csStyles.pill}>
        <Text style={csStyles.pillText}>Bantuan</Text>
      </View>
    </View>
  );
}

const csStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    marginTop: -6,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderWidth: 1,
    borderColor: '#D6E8FF',
    shadowColor: '#1E5BB8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  pillText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#1D56B3',
  },
});

export function HeroBasketIllustration() {
  return (
    <Image
      source={HERO_BASKET_IMAGE}
      style={{ width: 142, height: 132 }}
      resizeMode="contain"
    />
  );
}

interface ServiceBadgeProps {
  variant: ServiceId;
  size?: number;
}

export function ServiceBadge({ variant, size = 84 }: ServiceBadgeProps) {
  const pillLabel =
    variant === 'cuci-kering'
      ? 'Cuci Kering'
      : variant === 'cuci-setrika'
        ? 'Cuci Setrika'
        : 'Setrika Saja';

  const source =
    variant === 'cuci-kering'
      ? SERVICE_CUCI_KERING_IMAGE
      : variant === 'cuci-setrika'
        ? SERVICE_CUCI_SETRIKA_IMAGE
        : SERVICE_SETRIKA_SAJA_IMAGE;

  const pillWidth = Math.round(size * 0.96);

  return (
    <View style={[badgeStyles.wrapper, { width: size + 4, height: size + 10 }]}>
      <Image
        source={source}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />

      {/* Bottom dark-blue pill overlapping the bottom rim */}
      <View style={[badgeStyles.pill, { width: pillWidth }]}>
        <Svg width={10.5} height={10.5} viewBox="0 0 16 16" fill="none" style={{ marginRight: 3 }}>
          {variant === 'setrika-saja' ? (
            <Path d="M2 12H14C14 9 11.5 7 8 7H5L2 12Z" fill="#FFFFFF" />
          ) : (
            <G>
              <Rect x={3} y={2} width={10} height={12} rx={2} stroke="#FFFFFF" strokeWidth={1.6} />
              <Circle cx={8} cy={9} r={2.5} fill="#FFFFFF" />
            </G>
          )}
        </Svg>
        <Text style={badgeStyles.pillText} numberOfLines={1}>
          {pillLabel}
        </Text>
      </View>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pill: {
    marginTop: -15,
    backgroundColor: '#0E5CC2',
    borderRadius: 999,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0E5CC2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 3,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 9.2,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

export function DiscountTagIcon({ size = 44 }: { size?: number }) {
  return (
    <Image
      source={DISCOUNT_TAG_IMAGE}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function SuccessCheckBadge({ size = 136 }: { size?: number }) {
  return (
    <Image
      source={SUCCESS_CHECK_IMAGE}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

// Deterministic 21x21 QR pattern for crisp, realistic QRIS display
const QR_PATTERN: number[][] = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
  [1,1,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1,1,0],
  [0,1,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1],
  [1,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,0,1],
  [0,1,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0],
  [1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,1,0,1,1,0,1],
  [0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,0,0,1,0,1,0],
  [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,0,0,1,1,1],
  [1,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,1,0,1,1,0],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,1,1,0,0,1,0],
  [1,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
  [1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1],
];

export function QrisPaymentCard() {
  const cell = 6.2;
  const qrSize = QR_PATTERN.length * cell;

  return (
    <View style={qrisStyles.card}>
      {/* Blue QRIS Header */}
      <View style={qrisStyles.header}>
        <View style={qrisStyles.qrisLogoBox}>
          <Text style={qrisStyles.qrisLogoText}>QRIS</Text>
        </View>
        <View style={qrisStyles.headerDivider} />
        <Text style={qrisStyles.headerPrompt}>
          Scan QR untuk{'\n'}melakukan pembayaran
        </Text>
      </View>

      {/* QR Code Area */}
      <View style={qrisStyles.qrContainer}>
        <View style={qrisStyles.qrWrapper}>
          <Svg width={qrSize} height={qrSize} viewBox={`0 0 ${qrSize} ${qrSize}`}>
            {QR_PATTERN.map((row, r) =>
              row.map((val, c) => {
                // Leave center area clean for logo
                if (r >= 8 && r <= 12 && c >= 8 && c <= 12) return null;
                if (val === 0) return null;
                return (
                  <Rect
                    key={`${r}-${c}`}
                    x={c * cell}
                    y={r * cell}
                    width={cell + 0.2}
                    height={cell + 0.2}
                    fill="#111827"
                  />
                );
              })
            )}
          </Svg>

          {/* Center LaundryWash Hanger Emblem */}
          <View style={qrisStyles.centerLogo}>
            <Svg width={28} height={22} viewBox="0 0 36 28" fill="none">
              <Path
                d="M18 6C18 4.2 19.6 3 21 4C22.4 5 21.8 7 19.5 8L18 9L4 19.5C2.8 20.4 3.4 22 5 22H31C32.6 22 33.2 20.4 32 19.5L18 9"
                stroke="#1E74E2"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={qrisStyles.centerLogoText}>LaundryWash</Text>
          </View>
        </View>
      </View>

      {/* Bottom Instruction Strip */}
      <View style={qrisStyles.footer}>
        <Svg width={18} height={22} viewBox="0 0 20 26" fill="none" style={{ marginRight: 6 }}>
          <Rect x={3} y={2} width={14} height={22} rx={2.5} fill="#2563EB" />
          <Rect x={5} y={5} width={10} height={14} rx={1} fill="#DBEAFE" />
          <Circle cx={10} cy={21} r={1} fill="#FFFFFF" />
        </Svg>
        <Text style={qrisStyles.footerText}>
          Buka aplikasi mobile banking{'\n'}atau e-wallet Anda, lalu scan QR ini
        </Text>
      </View>
    </View>
  );
}

const qrisStyles = StyleSheet.create({
  card: {
    width: 196,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2B7DE9',
    overflow: 'hidden',
    shadowColor: '#1E64C8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    backgroundColor: '#0E56C4',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrisLogoBox: {
    borderWidth: 1.3,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  qrisLogoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.6,
  },
  headerDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginHorizontal: 8,
  },
  headerPrompt: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '600',
    lineHeight: 11,
    flex: 1,
  },
  qrContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  qrWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogo: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogoText: {
    fontSize: 6.5,
    fontWeight: '700',
    color: '#1E5BB8',
    marginTop: -2,
  },
  footer: {
    backgroundColor: '#D6E9FF',
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#1E3A5F',
    fontSize: 7.5,
    fontWeight: '600',
    lineHeight: 10,
    flex: 1,
  },
});
