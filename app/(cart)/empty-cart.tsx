import colors from '@/colors';
import CustomButton from '@/components/ui/inputs/CustomButton';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function EmptyCart() {
  const handleGoToMenu = () => {
    router.push('/(tabs)/menu');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sepet</Text>
      </View>

      {/* Empty State Content */}
      <View style={styles.contentContainer}>
        {/* Empty Cart Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.emptyCartImage}
            resizeMode="contain"
          />
        </View>

        {/* Empty State Text */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Sepetiniz Boş</Text>
          <Text style={styles.descriptionText}>
            Henüz bir abonelik planı seçmediniz.
          </Text>
          <Text style={styles.descriptionText}>
            Menüden bir plan seçerek başlayabilirsiniz.
          </Text>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="MENÜYE GİT"
            onPress={handleGoToMenu}
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121223', // Dark blue-purple background (same as cart)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 21,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.background,
    fontFamily: 'Sen_400Regular',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    marginBottom: 32,
  },
  emptyCartImage: {
    width: 120,
    height: 120,
    opacity: 0.6,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Sen_700Bold',
    color: colors.background,
    marginBottom: 16,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Sen_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
  },
});
