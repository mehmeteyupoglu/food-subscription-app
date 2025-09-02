// Auth Types
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: any; // Simplified for now
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type RegisterRequest = {
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type RegisterResponse = {
  user: any; // Simplified for now
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

// Subscription Types
export type SubscriptionStatus = 
  | 'active'
  | 'paused'
  | 'cancelled'
  | 'expired'
  | 'pending';

export type MealPreferences = {
  dietaryRestrictions: string[];
  allergies: string[];
  preferences: string[];
  servingSize: 'small' | 'medium' | 'large';
};

export type CreateSubscriptionRequest = {
  planId: string;
  deliveryDays: string[];
  deliveryTime: string;
  deliveryAddress: Address;
  mealPreferences: MealPreferences;
  paymentMethodId: string;
};

export type UpdateSubscriptionRequest = {
  deliveryDays?: string[];
  deliveryTime?: string;
  deliveryAddress?: Address;
  mealPreferences?: MealPreferences;
};

// Address & Payment Types
export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'bank_transfer' | 'paypal';
  last4?: string;
  brand?: string;
  isDefault: boolean;
};

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export type Payment = {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePaymentRequest = {
  orderId: string;
  amount: number;
  paymentMethodId: string;
};

// Order Types
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderItem = {
  id: string;
  menuItemId: string;
  menuItem: any; // Simplified for now
  quantity: number;
  customizations: any[]; // Simplified for now
  totalPrice: number;
};

export type Order = {
  id: string;
  userId: string;
  subscriptionId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderRequest = {
  subscriptionId?: string;
  items: any[]; // Simplified for now
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethodId: string;
  discountCode?: string;
};

// Generic Response Types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiErrorResponse = {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
};
