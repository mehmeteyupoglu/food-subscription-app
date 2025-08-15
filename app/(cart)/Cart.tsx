import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/colors";
import BackButton from "@/components/ui/BackButton";
import CustomButton from "@/components/ui/inputs/CustomButton";
import { baseMealPrice, deliveryOptions, mealTypes, subscriptionPlans } from '@/constants/meal';
import { SubscriptionPayload } from '@/types/cart';
import { calculateDiscountAmount } from '@/utils/calculateDiscountAmount';
import { calculateGroupDiscount } from '@/utils/calculateGroupDiscount';
import { useBottomSheet } from 'lib/BottomSheetContext';

// Mock data - these will be dynamic in real implementation
const CART_DATA = {
  product: {
    title: "Ev Yemekleri Paketi - 5 Gün",
    basePrice: 1410,
    quantity: 1,
    image: require("../../assets/manti.png"),
  },
  pricing: {
    portionPrice: 310.0,
    weeklyDiscount: 9.3,
    takeawayDiscount: 18.6,
    discountedPortionPrice: 282.1,
    totalMeals: 5,
    totalPrice: 1410.5,
  },
  subscription: {
    startDate: "20 Nisan, Pazartesi",
    instruction: "Başlangıç tarihi bugünden itibaren en az 3 gün olmalıdır",
  },
  branch: {
    name: "BİTAT CAFE & RESTAURANT",
    address: "Kılıçarslan Mahallesi, İzzet Baysal, Hastanesi Bulvarı No 59 C, 14400 Bolu Merkez/Bolu",
  },
};


export default function ShoppingCart() {

  const {
    selectedMealType,
    personCount,
    deliveryMethod,
    selectedPlan,
    totalPrice,
    totalMeals,
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
    closeSheet
  } = useBottomSheet();

  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  const subscriptionPlan = subscriptionPlans.find(plan => plan.value === selectedPlan);
  const _deliveryMethod = deliveryOptions.find(method => method.value === deliveryMethod);
  const _mealType = mealTypes.find(type => type.value === selectedMealType);

  const handleGoBack = () => {
    router.back();
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setPersonCount(String(Number(personCount) + 1));
    } else if (Number(personCount) > 1) {
      setPersonCount(String(Number(personCount) - 1));
    }
  };

  const handleConfirm = () => {
    // Create subscription payload from bottom sheet context
    const subscriptionPayload: SubscriptionPayload = {
      // Temel bilgiler
      mealType: selectedMealType || '',
      subscriptionPlan: selectedPlan || '',
      personCount: parseInt(personCount) || 1,
      days: [], // TODO: Calculate actual days based on subscription plan
      startDate: new Date(), // TODO: Get actual start date
      endDate: new Date(), // TODO: Calculate end date based on plan duration
      deliveryMethod: deliveryMethod || '',
      branch: 'BİTAT CAFE & RESTAURANT', // TODO: Get from context or selection

      // Fiyat bilgileri
      totalPrice: totalPrice || 0,
      discountedPrice: discountedMealPrice || 0,
      totalDiscount: (baseMealPrice - (discountedMealPrice || 0)) || 0,

      // Müşteri bilgileri
      customerInfo: {
        name: '', // TODO: Get from user profile
        phone: '', // TODO: Get from user profile
        email: '', // TODO: Get from user profile
        address: '', // TODO: Get from user profile
      },

      // Ek bilgiler
      specialInstructions: '',
      paymentMethod: 'credit_card', // TODO: Get from payment selection
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Subscription Payload:', subscriptionPayload);
    // Navigate to payment successful screen
    router.push('/(cart)/payment-successful');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} variant="dark" />
        <Text style={styles.headerTitle}>Sepet</Text>
      </View>

      {/* Product Section */}
      <View style={styles.productSection}>
        <View style={styles.productRow}>
          <Image source={CART_DATA.product.image} style={styles.productImage} />
          <View style={styles.productInfo}>
            <View>
              <Text style={styles.productTitle}>{subscriptionPlan?.label} - {discountedMealPrice}₺</Text>
              <Text style={styles.productTitle}>Öğün: {_mealType?.label}</Text>
            </View>


            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[styles.quantityButton, { opacity: 0.5 }]}
                disabled={true}
              >
                <MaterialIcons name="remove" size={16} color={colors.background} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{personCount}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, { opacity: 0.5 }]}
                disabled={true}
              >
                <MaterialIcons name="add" size={16} color={colors.background} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles.priceBreakdown}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>PORSİYON FİYATI:</Text>
          <Text style={styles.priceValue}>₺{baseMealPrice}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>{subscriptionPlan?.discountLabel?.toUpperCase()} ({subscriptionPlan?.discount}%):</Text>
          <Text style={styles.discountValue}>- ₺{subscriptionPlan?.discount ? calculateDiscountAmount(subscriptionPlan.discount, baseMealPrice) : 0}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            {_deliveryMethod?.label} {`(${_deliveryMethod?.discount}%)`}
          </Text>
          <Text style={styles.discountValue}>
            {_deliveryMethod?.discount ? `- ₺${calculateDiscountAmount(_deliveryMethod.discount, baseMealPrice)}` : '₺0'}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>GRUP İNDİRİMİ ({calculateGroupDiscount(parseInt(personCount))}%):</Text>
          <Text style={styles.priceValue}>- ₺{calculateDiscountAmount(calculateGroupDiscount(parseInt(personCount)), baseMealPrice)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>TOPLAM İNDİRİM ({((baseMealPrice - discountedMealPrice) / baseMealPrice * 100).toFixed(1)}%): </Text>
          <Text style={styles.priceValue}>- ₺{calculateDiscountAmount(((baseMealPrice - discountedMealPrice) / baseMealPrice * 100), baseMealPrice)}</Text>
        </View>
        {/* <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>İNDİRİMLİ PORSİYON FİYATI:</Text>
          <Text style={styles.priceValue}>₺{discountedMealPrice}</Text>
        </View> */}
      </View>

      {/* Total Price */}
      <View style={styles.totalSection}>
        <View>
          <Text style={styles.totalLabel}>TOPLAM FİYAT:</Text>
          <Text style={styles.calculationDetail}>
            ({totalMeals} ÖĞÜN X ₺{discountedMealPrice})
          </Text>
        </View>
        <Text style={styles.finalTotal}>₺{totalPrice.toLocaleString('tr-TR')}</Text>
      </View>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        {/* Subscription Start Date */}
        <Text style={styles.cardTitle}>ABONELİK BAŞLANGIÇ TARİHİ</Text>
        <View style={styles.subContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Image source={require("../../assets/icons/info.png")} style={{ width: 35, height: 35 }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoDate}>{CART_DATA.subscription.startDate}</Text>
              <Text style={styles.infoInstruction}>{CART_DATA.subscription.instruction}</Text>
            </View>
          </View>
        </View>

        {/* Branch Address */}
        <Text style={styles.cardTitle}>ŞUBE ADRESİ</Text>
        <View style={[styles.subContainer, { marginBottom: 22 }]}>
          <View style={styles.branchInfo}>
            <Text style={styles.branchName}>{CART_DATA.branch.name}</Text>
            <Text style={styles.branchAddress}>{CART_DATA.branch.address}</Text>
          </View>
        </View>

        {/* Confirm Button */}
        <CustomButton
          title="ONAYLA"
          onPress={handleConfirm}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121223', // Dark blue-purple background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 21,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.background,
    marginLeft: 18,
    fontFamily: 'Sen_400Regular',
  },
  productSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  productImage: {
    width: 130,
    height: 120,
    borderRadius: 32,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 8,
    fontFamily: 'Sen_400Regular',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 12,
    fontFamily: 'Sen_400Regular',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  quantityButton: {
    width: 25,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2d2d44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
    marginHorizontal: 21,
    fontFamily: 'Sen_700Bold',
  },
  priceBreakdown: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  priceLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Sen_400Regular',
  },
  priceValue: {
    fontSize: 16,
    color: colors.background,
    fontFamily: 'Sen_400Regular',
  },
  discountValue: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Sen_400Regular',
  },
  totalSection: {
    // paddingHorizontal: 20,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    color: colors.background,
    marginBottom: 5,
    fontFamily: 'Sen_700Bold',
  },
  calculationDetail: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
    fontFamily: 'Sen_700Bold',
  },
  finalTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
    textAlign: 'right',
    fontFamily: 'Sen_700Bold',
  },
  infoCard: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontFamily: 'Sen_400Regular',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {

    // borderRadius: 17.5,
    // colo: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoDate: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Sen_400Regular',
  },
  infoInstruction: {
    fontSize: 14,
    color: '#676767',
    opacity: 0.5,
    lineHeight: 16,
    fontFamily: 'Sen_400Regular',
  },
  branchInfo: {
    marginTop: 4,
  },
  branchName: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Sen_400Regular',
  },
  branchAddress: {
    fontSize: 14,
    color: '#676767',
    opacity: 0.5,
    lineHeight: 16,
    fontFamily: 'Sen_400Regular',
  },
  bottomContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  subContainer: {
    backgroundColor: "#F6F8FA",
    borderRadius: 16,
    // marginVertical: 6,
    padding: 16,
  },
});
