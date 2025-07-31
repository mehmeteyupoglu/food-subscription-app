import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/colors";
import BackButton from "@/components/ui/BackButton";
import CustomButton from "@/components/ui/inputs/CustomButton";

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
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  const [quantity, setQuantity] = useState(CART_DATA.product.quantity);

  const handleGoBack = () => {
    router.back();
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleConfirm = () => {
    console.log("Sipariş onaylandı");
    // Navigate to confirmation or payment page
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} variant="dark" />
        <Text style={[styles.headerTitle, { fontFamily: 'Sen_400Regular' }]}>Sepet</Text>
      </View>

      {/* Product Section */}
      <View style={styles.productSection}>
        <View style={styles.productRow}>
          <Image source={CART_DATA.product.image} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={[styles.productTitle, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.product.title}</Text>
            <Text style={[styles.productPrice, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.product.basePrice.toLocaleString('tr-TR')} ₺</Text>

            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(false)}
              >
                <MaterialIcons name="remove" size={16} color={colors.background} />
              </TouchableOpacity>
              <Text style={[styles.quantityText, { fontFamily: 'Sen_700Bold' }]}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(true)}
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
          <Text style={[styles.priceLabel, { fontFamily: 'Sen_400Regular' }]}>PORSİYON FİYATI:</Text>
          <Text style={[styles.priceValue, { fontFamily: 'Sen_400Regular' }]}>₺{CART_DATA.pricing.portionPrice}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { fontFamily: 'Sen_400Regular' }]}>HAFTALIK ABONELİK FIRSATI (3%):</Text>
          <Text style={[styles.discountValue, { fontFamily: 'Sen_400Regular' }]}>- ₺{CART_DATA.pricing.weeklyDiscount}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { fontFamily: 'Sen_400Regular' }]}>GEL AL İNDİRİMİ (6%):</Text>
          <Text style={[styles.discountValue, { fontFamily: 'Sen_400Regular' }]}>- ₺{CART_DATA.pricing.takeawayDiscount}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { fontFamily: 'Sen_400Regular' }]}>İNDİRİMLİ PORSİYON FİYATI:</Text>
          <Text style={[styles.priceValue, { fontFamily: 'Sen_400Regular' }]}>₺{CART_DATA.pricing.discountedPortionPrice}</Text>
        </View>
      </View>

      {/* Total Price */}
      <View style={styles.totalSection}>
        <View>
          <Text style={[styles.totalLabel, { fontFamily: 'Sen_700Bold' }]}>TOPLAM FİYAT:</Text>
          <Text style={[styles.calculationDetail, { fontFamily: 'Sen_700Bold' }]}>
            ({CART_DATA.pricing.totalMeals} ÖĞÜN X ₺{CART_DATA.pricing.discountedPortionPrice})
          </Text>
        </View>
        <Text style={[styles.finalTotal, { fontFamily: 'Sen_700Bold' }]}>₺{CART_DATA.pricing.totalPrice.toLocaleString('tr-TR')}</Text>
      </View>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        {/* Subscription Start Date */}
        <Text style={[styles.cardTitle, { fontFamily: 'Sen_400Regular' }]}>ABONELİK BAŞLANGIÇ TARİHİ</Text>
        <View style={styles.subContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Image source={require("../../assets/icons/info.png")} style={{ width: 35, height: 35 }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoDate, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.subscription.startDate}</Text>
              <Text style={[styles.infoInstruction, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.subscription.instruction}</Text>
            </View>
          </View>
        </View>

        {/* Branch Address */}
        <Text style={[styles.cardTitle, { fontFamily: 'Sen_400Regular' }]}>ŞUBE ADRESİ</Text>
        <View style={[styles.subContainer, { marginBottom: 22 }]}>
          <View style={styles.branchInfo}>
            <Text style={[styles.branchName, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.branch.name}</Text>
            <Text style={[styles.branchAddress, { fontFamily: 'Sen_400Regular' }]}>{CART_DATA.branch.address}</Text>
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
  },
  productSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 130,
    height: 120,
    borderRadius: 32,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 12,
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
  },
  priceBreakdown: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  priceValue: {
    fontSize: 16,
    color: colors.background,
  },
  discountValue: {
    fontSize: 16,
    color: '#ffffff',
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
  },
  calculationDetail: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
  },
  finalTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
    textAlign: 'right',
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
  },
  infoInstruction: {
    fontSize: 14,
    color: '#676767',
    opacity: 0.5,
    lineHeight: 16,
  },
  branchInfo: {
    marginTop: 4,
  },
  branchName: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 14,
    color: '#676767',
    opacity: 0.5,
    lineHeight: 16,
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
