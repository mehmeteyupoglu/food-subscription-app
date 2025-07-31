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
import ToggleButton from './ToggleButton';

interface MealCustomizationSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  selectedMealType: string;
  personCount: string;
  deliveryMethod: string;
  selectedPlan: string;
  totalPrice: number;
  totalMeals: number;
  onMealTypeSelect: (mealType: string) => void;
  onPersonCountChange: (count: string) => void;
  onDeliveryMethodChange: (method: string) => void;
  onContinue: () => void;
}

const deliveryOptions = [
  {
    label: 'Gel Al (6% İndirimli)',
    value: 'take_away',
  },
  {
    label: 'Restoranda Yemek (6% İndirimli)',
    value: 'dine_in',
  },
  {
    label: 'Paket',
    value: 'delivery',
  },
];

export default function MealCustomizationSheet({
  bottomSheetRef,
  selectedMealType,
  personCount,
  deliveryMethod,
  selectedPlan,
  totalPrice,
  totalMeals,
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

  // Plan bilgisini formatla
  const getPlanDisplayText = () => {
    if (!selectedPlan) return "Plan Seçiniz";

    const planName = selectedPlan === "aylik" ? "Aylık Plan" : "Haftalık Plan";
    const days = selectedPlan === "aylik" ? "20 Gün" : "5 Gün";

    return `${planName} - ${days}`;
  };

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
                {getPlanDisplayText()}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sheetSectionTitle, { fontFamily: 'Sen_400Regular' }]}>
              ÖĞÜN TERCİHİ
            </Text>
            <View style={styles.buttonGroup}>
              <ToggleButton
                title="2 öğün"
                isSelected={selectedMealType === '2 öğün'}
                onPress={() => onMealTypeSelect('2 öğün')}
              />
              <ToggleButton
                title="öğle"
                isSelected={selectedMealType === 'öğle'}
                onPress={() => onMealTypeSelect('öğle')}
              />
              <ToggleButton
                title="akşam"
                isSelected={selectedMealType === 'akşam'}
                onPress={() => onMealTypeSelect('akşam')}
              />
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
              PAKET TUTARI
            </Text>
            <Text style={[styles.priceValue, { fontFamily: 'Sen_400Regular' }]}>
              {totalPrice > 0 ? `${totalPrice.toLocaleString('tr-TR')} ₺` : '0 ₺'}
            </Text>
          </View>

          {totalMeals > 0 && (
            <View style={styles.mealsInfo}>
              <Text style={[styles.mealsText, { fontFamily: 'Sen_400Regular' }]}>
                Toplam {totalMeals} öğün
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
}); 