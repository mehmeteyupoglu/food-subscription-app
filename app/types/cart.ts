export interface SubscriptionPayload {
  // Temel bilgiler
  mealType: string;
  subscriptionPlan: string;
  personCount: number;
  days: Date[];
  startDate: Date;
  endDate: Date;
  deliveryMethod: string;
  branch: string;
  
  // Fiyat bilgileri
  totalPrice: number;
  discountedPrice: number;
  totalDiscount: number;
  
  // Müşteri bilgileri
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  
  // Ek bilgiler
  specialInstructions?: string;
  paymentMethod: string;
  status: 'active' | 'paused' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartProduct {
  title: string;
  basePrice: number;
  quantity: number;
  image: any;
}

export interface CartPricing {
  portionPrice: number;
  weeklyDiscount: number;
  takeawayDiscount: number;
  discountedPortionPrice: number;
  totalMeals: number;
  totalPrice: number;
}

export interface CartSubscription {
  startDate: string;
  instruction: string;
}

export interface CartBranch {
  name: string;
  address: string;
}

export interface CartData {
  product: CartProduct;
  pricing: CartPricing;
  subscription: CartSubscription;
  branch: CartBranch;
}

// This file only contains TypeScript types/interfaces and is not a React component.
// To satisfy the default export requirement for the route, export a dummy React component.

import React from 'react';

const CartTypesScreen: React.FC = () => {
  return null;
};

export default CartTypesScreen;
