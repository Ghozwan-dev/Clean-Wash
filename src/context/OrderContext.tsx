import React, { createContext, useContext, useMemo, useState } from 'react';
import { LAUNDRY_SERVICES, OrderRecord, ServiceId } from '../types/order';

interface OrderContextValue {
  serviceId: ServiceId;
  setServiceId: (id: ServiceId) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  schedule: string;
  setSchedule: (date: string) => void;
  address: string;
  setAddress: (addr: string) => void;
  note: string;
  setNote: (text: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  promoApplied: boolean;
  setPromoApplied: (applied: boolean) => void;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  lastOrder: OrderRecord;
  activeOrders: OrderRecord[];
  historyOrders: OrderRecord[];
  confirmOrder: () => OrderRecord;
}

const SHIPPING_FEE = 3000;

const INITIAL_ORDER: OrderRecord = {
  orderNumber: '#LW20261103',
  serviceId: 'cuci-setrika',
  quantity: 10,
  schedule: 'Rabu, 04 November 2026',
  address: 'Jln. Raya No.10 Sragen',
  note: 'Pakaian putih dipisah',
  paymentMethod: 'QRIS',
  subtotal: 25000,
  shippingFee: 3000,
  discount: 0,
  total: 28000,
  status: 'Menunggu Pembayaran',
  createdAt: '04 Nov 2026, 10:30',
};

const INITIAL_HISTORY: OrderRecord[] = [
  {
    orderNumber: '#LW20261028',
    serviceId: 'cuci-kering',
    quantity: 8,
    schedule: 'Rabu, 28 Oktober 2026',
    address: 'Jln. Raya No.10 Sragen',
    note: 'Tanpa pewangi berlebih',
    paymentMethod: 'QRIS',
    subtotal: 16000,
    shippingFee: 3000,
    discount: 0,
    total: 19000,
    status: 'Selesai',
    createdAt: '28 Okt 2026, 09:15',
  },
  {
    orderNumber: '#LW20261015',
    serviceId: 'setrika-saja',
    quantity: 12,
    schedule: 'Kamis, 15 Oktober 2026',
    address: 'Jln. Raya No.10 Sragen',
    note: 'Kemeja kerja digantung',
    paymentMethod: 'Tunai (COD)',
    subtotal: 18000,
    shippingFee: 3000,
    discount: 0,
    total: 21000,
    status: 'Selesai',
    createdAt: '15 Okt 2026, 14:20',
  },
];

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [serviceId, setServiceId] = useState<ServiceId>('cuci-setrika');
  const [quantity, setQuantityState] = useState<number>(10);
  const [schedule, setSchedule] = useState<string>('Rabu, 04 November 2026');
  const [address, setAddress] = useState<string>('Jln. Raya No.10 Sragen');
  const [note, setNote] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<OrderRecord>(INITIAL_ORDER);
  const [activeOrders, setActiveOrders] = useState<OrderRecord[]>([INITIAL_ORDER]);
  const [historyOrders] = useState<OrderRecord[]>(INITIAL_HISTORY);
  const [orderSeq, setOrderSeq] = useState<number>(3);

  const setQuantity = (qty: number) => {
    setQuantityState(Math.max(1, Math.min(999, qty)));
  };

  const subtotal = useMemo(() => {
    const unitPrice = LAUNDRY_SERVICES[serviceId].pricePerPiece;
    return quantity * unitPrice;
  }, [serviceId, quantity]);

  const discount = useMemo(() => {
    if (!promoApplied) return 0;
    return Math.round(subtotal * 0.15);
  }, [promoApplied, subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal + SHIPPING_FEE - discount);
  }, [subtotal, discount]);

  const confirmOrder = (): OrderRecord => {
    const isDefaultState =
      serviceId === 'cuci-setrika' &&
      quantity === 10 &&
      schedule === 'Rabu, 04 November 2026' &&
      address.trim() === 'Jln. Raya No.10 Sragen' &&
      !promoApplied &&
      orderSeq === 3;

    const orderNum = isDefaultState
      ? '#LW20261103'
      : `#LW202611${String(orderSeq + 1).padStart(2, '0')}`;

    if (!isDefaultState) {
      setOrderSeq((prev) => prev + 1);
    }

    const created: OrderRecord = {
      orderNumber: orderNum,
      serviceId,
      quantity,
      schedule,
      address: address.trim() || 'Jln. Raya No.10 Sragen',
      note: note.trim() || 'Pakaian putih dipisah',
      paymentMethod: paymentMethod || 'QRIS',
      subtotal,
      shippingFee: SHIPPING_FEE,
      discount,
      total,
      status: 'Menunggu Pembayaran',
      createdAt: '04 Nov 2026, 10:30',
    };

    setLastOrder(created);
    setActiveOrders((prev) => {
      const filtered = prev.filter((item) => item.orderNumber !== created.orderNumber);
      return [created, ...filtered];
    });
    return created;
  };

  return (
    <OrderContext.Provider
      value={{
        serviceId,
        setServiceId,
        quantity,
        setQuantity,
        schedule,
        setSchedule,
        address,
        setAddress,
        note,
        setNote,
        paymentMethod,
        setPaymentMethod,
        promoApplied,
        setPromoApplied,
        subtotal,
        shippingFee: SHIPPING_FEE,
        discount,
        total,
        lastOrder,
        activeOrders,
        historyOrders,
        confirmOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return ctx;
}
