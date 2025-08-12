import { router } from 'expo-router';
import React from 'react';
import { useBottomSheet } from '../../lib/BottomSheetContext';
import MealCustomizationSheet from './home/MealCustomizationSheet';

export default function GlobalBottomSheet() {
  const {
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
    setTotalPrice,
    setTotalMeals,
    setTotalDiscount,
    closeSheet,
  } = useBottomSheet();

  const handleContinueToCart = () => {
    closeSheet();
    // Navigation will be handled by the calling component
    router.push('/(cart)/Cart');
  };

  return (
    <MealCustomizationSheet
      bottomSheetRef={bottomSheetRef}
      selectedMealType={selectedMealType}
      personCount={personCount}
      deliveryMethod={deliveryMethod}
      selectedPlan={selectedPlan}
      totalPrice={totalPrice}
      totalMeals={totalMeals}
      totalDiscount={totalDiscount}
      discountedMealPrice={discountedMealPrice}
      onMealTypeSelect={setSelectedMealType}
      onPersonCountChange={setPersonCount}
      onDeliveryMethodChange={setDeliveryMethod}
      onContinue={handleContinueToCart}
      onTotalDiscountChange={setTotalDiscount}
    />
  );
} 