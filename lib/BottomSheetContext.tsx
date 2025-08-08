import BottomSheet from '@gorhom/bottom-sheet';
import React, { createContext, useContext, useRef, useState } from 'react';

interface BottomSheetContextType {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  selectedMealType: string;
  personCount: string;
  deliveryMethod: string;
  selectedPlan: string;
  totalPrice: number;
  totalMeals: number;
  totalDiscount: number;
  discountedMealPrice: number;
  setSelectedMealType: (mealType: string) => void;
  setPersonCount: (count: string) => void;
  setDeliveryMethod: (method: string) => void;
  setSelectedPlan: (plan: string) => void;
  setTotalPrice: (price: number) => void;
  setTotalMeals: (meals: number) => void;
  setTotalDiscount: (discount: number) => void;
  setDiscountedMealPrice: (price: number) => void;
  openSheet: () => void;
  closeSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMealType, setSelectedMealType] = useState("2_meals");
  const [personCount, setPersonCount] = useState('1');
  const [deliveryMethod, setDeliveryMethod] = useState('dine_in');
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalMeals, setTotalMeals] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [discountedMealPrice, setDiscountedMealPrice] = useState<number>(0);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  const value = {
    bottomSheetRef,
    selectedMealType,
    personCount,
    deliveryMethod,
    selectedPlan,
    totalPrice,
    totalMeals,
    totalDiscount,
    discountedMealPrice,
    setSelectedMealType,
    setPersonCount,
    setDeliveryMethod,
    setSelectedPlan,
    setTotalPrice,
    setTotalMeals,
    setTotalDiscount,
    setDiscountedMealPrice,
    openSheet,
    closeSheet,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}; 