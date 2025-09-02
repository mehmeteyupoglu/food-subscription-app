import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '@/colors';
import Dropdown from '@/components/ui/Dropdown';
import { deliveryOptions, mealTypes } from '@/constants/meal';
import { calculateGroupDiscount } from '@/utils/calculateGroupDiscount';
import { getPlanDisplayText } from '@/utils/planUtils';
import ToggleButton from './ToggleButton';

interface MealCustomizationSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  selectedMealType: string;
  personCount: string;
  deliveryMethod: string;
  selectedPlan: string;
  totalPrice: number;
  totalMeals: number;
  totalDiscount: number;
  discountedMealPrice: number;
  onMealTypeSelect: (mealType: string) => void;
  onPersonCountChange: (count: string) => void;
  onDeliveryMethodChange: (method: string) => void;
  onTotalDiscountChange: (discount: number) => void;
  onContinue: () => void;
}

export default function MealCustomizationSheet({
  bottomSheetRef,
  selectedMealType,
  personCount,
  deliveryMethod,
  selectedPlan,
  totalPrice,
  totalMeals,
  totalDiscount,
  discountedMealPrice,
  onMealTypeSelect,
  onPersonCountChange,
  onDeliveryMethodChange,
  onContinue,
}: MealCustomizationSheetProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  );


  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheet
      snapPoints={["30%", "60%", "90%"]}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      index={-1}
    >
      <BottomSheetView style={styles.sheetContent}>
        <ScrollView style={styles.sheetScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sheetSectionTitle, { fontFamily: 'Sen_400Regular' }]}>
              SEÇİLEN PLAN
            </Text>
            <View style={styles.dropdown}>
              <Text style={[styles.dropdownText, { fontFamily: 'Sen_400Regular' }]}>
                {getPlanDisplayText(selectedPlan)}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sheetSectionTitle, { fontFamily: 'Sen_400Regular' }]}>
              ÖĞÜN TERCİHİ
            </Text>
            <View style={styles.buttonGroup}>
              {mealTypes.map((mealType) => (
                <ToggleButton
                  key={mealType.value}
                  title={mealType.label}
                  isSelected={selectedMealType === mealType.value}
                  onPress={() => onMealTypeSelect(mealType.value)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sheetSectionTitle, { fontFamily: 'Sen_400Regular' }]}>
              KİŞİ SAYISI
            </Text>
            <BottomSheetTextInput
              style={[styles.input, { fontFamily: 'Sen_400Regular' }]}
              value={personCount}
              onChangeText={onPersonCountChange}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={colors.textSecondary}
            />
            {parseInt(personCount) > 1 && (
              <Text style={[styles.discountText, { fontFamily: 'Sen_400Regular' }]}>
                {`${calculateGroupDiscount(parseInt(personCount))}% Grup Abonelik İndirimi`}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sheetSectionTitle, { fontFamily: 'Sen_400Regular' }]}>
              YEMEK TESLİM ŞEKLİ
            </Text>
            <Dropdown
              value={deliveryMethod}
              options={deliveryOptions}
              onValueChange={onDeliveryMethodChange}
              placeholder="Teslim şekli seçin"
            />
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { fontFamily: 'Sen_400Regular' }]}>
              PAKET TUTARI (Toplam {totalMeals} öğün)
            </Text>
            <Text style={[styles.priceValue, { fontFamily: 'Sen_400Regular' }]}>
              {totalPrice > 0 ? `${totalPrice.toLocaleString('tr-TR')} ₺` : '0 ₺'}
            </Text>
          </View>

          {totalMeals > 0 && (
            <View style={styles.mealsInfo}>
              <Text style={[styles.mealsText, { fontFamily: 'Sen_400Regular' }]}>
                Toplam indirim {totalDiscount} %
              </Text>
              <Text style={[styles.mealsText, { fontFamily: 'Sen_400Regular' }]}>
                İndirimli fiyat (1 öğün) {discountedMealPrice.toLocaleString('tr-TR')} ₺
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={[styles.continueButtonText, { fontFamily: 'Sen_400Regular' }]}>
              SEPETE DEVAM ET
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    padding: 20,
  },
  sheetScrollView: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
    // paddingHorizontal: 4,
  },
  sheetSectionTitle: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 16,
    letterSpacing: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textSecondary,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bottomSection: {
    marginTop: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
    letterSpacing: 1,
  },
  mealsInfo: {
    marginBottom: 16,
  },
  mealsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  discountText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
}); 