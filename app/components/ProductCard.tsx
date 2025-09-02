import colors from '@/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {

  image: ImageSourcePropType;
  subscriptionPlanLabel: string;
  discountedMealPrice: number;
  mealTypeLabel: string;
  personCount: number;
  showQuantitySelector: boolean;
  isDarkMode?: boolean;
}

export default function ProductCard(
  {
    image,
    subscriptionPlanLabel,
    discountedMealPrice,
    mealTypeLabel,
    personCount,
    showQuantitySelector,
    isDarkMode = false,
  }: ProductCardProps
) {
  return (
    <View style={styles.productSection}>
      <View style={styles.productRow}>
        <Image source={image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <View>
            <Text style={[styles.productTitle, { color: isDarkMode ? colors.background : colors.text }]}>{subscriptionPlanLabel} - {mealTypeLabel}</Text>
            <Text style={[styles.productPrice, { color: isDarkMode ? colors.background : colors.text }]}>{discountedMealPrice}₺</Text>
          </View>


          {/* Quantity Selector */}
          {showQuantitySelector && (
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
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productSection: {
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
    color: colors.background,
    marginBottom: 18,
    fontFamily: 'Sen_400Regular',
  },
  productPrice: {
    fontSize: 20,
    color: colors.background,
    marginBottom: 12,
    fontFamily: 'Sen_700Bold',
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

})
