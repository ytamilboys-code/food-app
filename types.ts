
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SHOP_OWNER = 'SHOP_OWNER',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
  ADMIN = 'ADMIN'
}

export enum Language {
  ENGLISH = 'en',
  TAMIL = 'ta'
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';

export interface Store {
  id: string;
  name: string;
  tamilName: string;
  category: 'GROCERY' | 'MEDICAL' | 'HOTEL' | 'OTHER';
  rating: number;
  image: string;
  isApproved: boolean;
  ownerId: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  tamilName: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  storeId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  timestamp: string;
}

export interface TranslationStrings {
  [key: string]: {
    en: string;
    ta: string;
  };
}
