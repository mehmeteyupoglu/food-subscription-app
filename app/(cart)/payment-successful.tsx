import colors from '@/colors';
import CustomButton from '@/components/ui/inputs/CustomButton';
import { router } from 'expo-router';
import { useBottomSheet } from 'lib/BottomSheetContext';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function PaymentSuccessful() {
  const {
    setSelectedPlan,
    setSelectedMealType,
    setPersonCount,
    setDeliveryMethod,
    setTotalPrice,
    setTotalMeals,
    setTotalDiscount,
    setDiscountedMealPrice,
  } = useBottomSheet();

  // Reset cart state when component mounts
  useEffect(() => {
    setSelectedPlan('');
    setSelectedMealType('lunch');
    setPersonCount('1');
    setDeliveryMethod('take_away');
    setTotalPrice(0);
    setTotalMeals(0);
    setTotalDiscount(0);
    setDiscountedMealPrice(0);
  }, []);

  const handleGoHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      {/* Central Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/payment-successful.png')}
          style={styles.foodImage}
          resizeMode="cover"
        />
      </View>

      {/* Confirmation Text */}
      <View style={styles.textContainer}>
        <Text style={styles.congratulationsText}>Tebrikler!</Text>
        <Text style={styles.descriptionText}>
          Talebiniz başarıyla işleme alınmıştır.
        </Text>
        <Text style={styles.descriptionText}>
          En kısa sürede sizinle iletişime geçeceğiz.
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="ANA SAYFA"
          onPress={handleGoHome}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  foodImage: {
    width: 280,
    height: 280,
    borderRadius: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Sen_700Bold',
    color: '#111A2C',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: 0,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Sen_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
});
