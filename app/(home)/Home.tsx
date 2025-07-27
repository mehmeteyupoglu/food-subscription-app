import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";


import colors from "@/colors";
import ImageSlider from "@/components/home/ImageSlider";
import PlanCard from "@/components/home/PlanCard";


export default function Home() {
  const [selectedMealCount, setSelectedMealCount] = useState("2 öğün");
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([
    "öğle",
    "akşam",
  ]);
  const [pickupDiscount, setPickupDiscount] = useState(true);

  const mealCountOptions = ["öğle", "akşam", "2 öğün"];
  const mealTypeOptions = ["kahvaltı", "öğle", "akşam"];

  const handleMealTypeToggle = (mealType: string) => {
    setSelectedMealTypes(prev => {
      if (prev.includes(mealType)) {
        return prev.filter(item => item !== mealType);
      } else {
        return [...prev, mealType];
      }
    });
  };

  const handlePlanAdd = (planType: string) => {
    console.log("Plan eklendi:", planType);
  };

  const sliderImages = [
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Image */}
        <View style={styles.heroSection}>
          <ImageSlider images={sliderImages} height={200} />

          {/* <View style={styles.heroContent}> */}
          {/* <View style={styles.badgeContainer}>
              <MaterialIcons
                name="restaurant"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.badgeText}>Sağlıklı & Lezzetli</Text>
            </View> */}

          {/* <Text style={styles.heroTitle}>
              Ev Yapımı Yemekler{"\n"}Kapınızda
            </Text> */}
          {/* <Text style={styles.heroSubtitle}>
              Özenle hazırlanmış menüler, geleneksel tatlar ve sıcacık ev
              lezzetleri ile sofranızı şenlendirin
            </Text> */}
          {/* </View> */}
        </View>

        {/* Features Section */}
        {/* <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="schedule" size={20} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>Hızlı Teslimat</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="eco" size={20} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>Doğal Malzemeler</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="favorite" size={20} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>Ev Lezzetleri</Text>
          </View>
        </View> */}

        {/* Subscription Configuration */}
        {/* <View style={styles.configSection}> */}
        {/* <View style={styles.sectionHeader}>
            <MaterialIcons name="tune" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Abonelik Planını Oluştur</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            İhtiyaçlarınıza göre özelleştirin
          </Text> */}

        {/* Meal Count Selection */}
        {/* <View style={styles.selectionGroup}>
            <Text style={styles.selectionLabel}>Günlük Öğün Sayısı</Text>
            <View style={styles.toggleContainer}>
              {mealCountOptions.map(option => (
                <ToggleButton
                  key={option}
                  title={option}
                  isSelected={selectedMealCount === option}
                  onPress={() => setSelectedMealCount(option)}
                />
              ))}
            </View>
          </View> */}

        {/* Meal Type Selection */}
        {/* <View style={styles.selectionGroup}>
            <Text style={styles.selectionLabel}>Öğün Türleri</Text>
            <View style={styles.toggleContainer}>
              {mealTypeOptions.map(option => (
                <ToggleButton
                  key={option}
                  title={option}
                  isSelected={selectedMealTypes.includes(option)}
                  onPress={() => handleMealTypeToggle(option)}
                />
              ))}
            </View>
          </View> */}
        {/* </View> */}

        {/* Plans Section */}
        <View style={styles.plansSection}>
          <View style={styles.sectionHeader}>
            {/* <MaterialIcons
              name="card-giftcard"
              size={24}
              color={colors.primary}
            /> */}
            <Text style={styles.sectionTitle}>Abonelik Seçin</Text>
          </View>

          <View style={styles.planCards}>
            <PlanCard
              imageSource={require("../../assets/manti.png")}
              title="Aylık"
              subTitle="Sağlıklı Ev Yemekleri"
              duration="20 Gün"
              onPress={() => handlePlanAdd("20-gun")}
            />

            <PlanCard
              imageSource={require("../../assets/ciborek.png")}
              title="Haftalık"
              subTitle="Sağlıklı Ev Yemekleri"
              duration="5 Gün"
              onPress={() => handlePlanAdd("5-gun")}
            />
          </View>
        </View>

        {/* Pickup Discount Option */}
        {/* <View style={styles.discountSection}>
          <TouchableOpacity
            style={[
              styles.discountCard,
              pickupDiscount && styles.discountCardActive,
            ]}
            onPress={() => setPickupDiscount(!pickupDiscount)}
            activeOpacity={0.8}
          >
            {pickupDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>%6 İndirim</Text>
              </View>
            )}
            <View style={styles.discountIcon}>
              <MaterialIcons
                name="local-shipping"
                size={24}
                color={colors.primary}
              />
            </View>

            <View style={styles.discountContent}>
              <Text style={styles.discountTitle}>Gel Al Seçeneği</Text>
              <Text style={styles.discountSubtitle}>
                Restoranımızdan kendiniz alın, %6 indirim kazanın
              </Text>
            </View>

            <View
              style={[
                styles.discountCheckbox,
                pickupDiscount && styles.discountCheckboxActive,
              ]}
            >
              {pickupDiscount && (
                <MaterialIcons
                  name="check"
                  size={18}
                  color={colors.background}
                />
              )}
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Call to Action */}
        {/* <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.primary, "#FF8A2B"]}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Siparişi Tamamla</Text>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={colors.background}
              />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.ctaSubtext}>
            İstediğiniz zaman iptal edebilirsiniz
          </Text>
        </View> */}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    marginBottom: 32,
  },
  imageContainer: {
    position: "relative",
    height: 240,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  heroContent: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  // Features Section
  featuresSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: colors.gray,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },

  // Config Section
  configSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.text,
    fontFamily: "Sen_400Regular",
    // marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    marginLeft: 32,
  },
  selectionGroup: {
    marginBottom: 24,
  },
  selectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  // Plans Section
  plansSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  planCards: {
    gap: 16,
  },

  // Discount Section
  discountSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  discountCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  discountBadge: {
    position: "absolute",
    top: -1,
    right: -1,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.background,
    letterSpacing: 0.5,
  },
  discountCardActive: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  discountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  discountContent: {
    flex: 1,
  },
  discountTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  discountSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  discountCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  discountCheckboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  ctaButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 12,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.background,
    marginRight: 8,
  },
  ctaSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
  },

  bottomSpacing: {
    height: 32,
  },
});
