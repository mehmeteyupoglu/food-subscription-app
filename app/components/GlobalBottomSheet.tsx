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
    setSelectedMealType,
    setPersonCount,
    setDeliveryMethod,
    setTotalPrice,
    setTotalMeals,
    closeSheet,
  } = useBottomSheet();

  const handleContinueToCart = () => {
    closeSheet();
    // Navigation will be handled by the calling component
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
      onMealTypeSelect={setSelectedMealType}
      onPersonCountChange={setPersonCount}
      onDeliveryMethodChange={setDeliveryMethod}
      onContinue={handleContinueToCart}
    />
  );
} 