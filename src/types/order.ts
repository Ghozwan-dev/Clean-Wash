export type ServiceId = 'cuci-kering' | 'cuci-setrika' | 'setrika-saja';

export interface LaundryService {
  id: ServiceId;
  badgeLabel: string;
  homeLabel: string;
  title: string;
  multilineTitle: string;
  pricePerPiece: number;
  estimatedDuration: string;
  description: string;
}

export interface OrderRecord {
  orderNumber: string;
  serviceId: ServiceId;
  quantity: number;
  schedule: string;
  address: string;
  note: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Menunggu Pembayaran' | 'Dijemput Kurir' | 'Sedang Dicuci' | 'Selesai';
  createdAt: string;
}

export const LAUNDRY_SERVICES: Record<ServiceId, LaundryService> = {
  'cuci-kering': {
    id: 'cuci-kering',
    badgeLabel: 'Cuci Kering',
    homeLabel: 'Cuci Kering',
    title: 'Cuci Tanpa Setrika',
    multilineTitle: 'Cuci Tanpa\nSetrika',
    pricePerPiece: 2000,
    estimatedDuration: '1 - 2 Hari',
    description: 'Pencucian bersih higienis dan pengeringan sempurna tanpa setrika.',
  },
  'cuci-setrika': {
    id: 'cuci-setrika',
    badgeLabel: 'Cuci Setrika',
    homeLabel: 'Cuci Setrika',
    title: 'Cuci Dan Setrika',
    multilineTitle: 'Cuci Dan\nSetrika',
    pricePerPiece: 2500,
    estimatedDuration: '2 Hari',
    description: 'Cuci bersih, wangi tahan lama, dan disetrika rapi siap pakai.',
  },
  'setrika-saja': {
    id: 'setrika-saja',
    badgeLabel: 'Setrika Saja',
    homeLabel: 'Setrika Saja',
    title: 'Setrika Saja',
    multilineTitle: 'Setrika Saja',
    pricePerPiece: 1500,
    estimatedDuration: '1 Hari',
    description: 'Layanan setrika uap rapi dan wangi untuk pakaian bersih Anda.',
  },
};

export const SERVICE_LIST: LaundryService[] = [
  LAUNDRY_SERVICES['cuci-kering'],
  LAUNDRY_SERVICES['cuci-setrika'],
  LAUNDRY_SERVICES['setrika-saja'],
];

export const SCHEDULE_OPTIONS: string[] = [
  'Rabu, 04 November 2026',
  'Kamis, 05 November 2026',
  'Jumat, 06 November 2026',
  'Sabtu, 07 November 2026',
  'Minggu, 08 November 2026',
];

export const PAYMENT_METHODS: string[] = [
  'QRIS',
  'Transfer Bank',
  'Tunai (COD)',
];

export function formatNumber(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatRupiah(amount: number): string {
  return `Rp ${formatNumber(amount)}`;
}
