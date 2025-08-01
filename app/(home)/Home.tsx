import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import colors from "@/colors";
import ImageSlider from "@/components/home/ImageSlider";
import PlanCard from "@/components/home/PlanCard";
import { subscriptionPlans } from '@/constants/meal';
import { router } from 'expo-router';
import { useBottomSheet } from '../../lib/BottomSheetContext';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  const {
    selectedMealType,
    personCount,
    deliveryMethod,
    selectedPlan,
    totalPrice,
    totalMeals,
    setSelectedMealType,
    setPersonCount,
    setDeliveryMethod,
    setSelectedPlan,
    setTotalPrice,
    setTotalMeals,
    openSheet,
    closeSheet
  } = useBottomSheet();

  // Base meal price
  const mealPrice = 310;

  // Price calculation effect
  useEffect(() => {
    if (!selectedPlan || !personCount) return;

    const people = parseInt(personCount) || 1;
    const days = selectedPlan === "aylik" ? 20 : 5; // Aylık: 20 gün, Haftalık: 5 gün

    // People discount calculation
    let peopleDiscount = 0;
    if (people > 1 && people <= 5) {
      peopleDiscount = people; // 1% per person for up to 5 people
    } else if (people > 5) {
      peopleDiscount = 4 + Math.floor(Math.min(people, 20) / 5); // Capped at 20 people
    }

    // Subscription discount calculation
    let subscriptionDiscount = 0;
    if (selectedPlan === "haftalik") {
      subscriptionDiscount = 3;
    } else if (selectedPlan === "aylik") {
      subscriptionDiscount = 4;
    }

    // Delivery method discount
    const takeawayDiscount = deliveryMethod === 'dine_in' || deliveryMethod === 'take_away' ? 6 : 0;

    // Total discount percentage
    const totalDiscount = peopleDiscount + subscriptionDiscount + takeawayDiscount;

    // Determine meals per day based on selected meal option
    const mealsPerDay = selectedMealType === "2 öğün" ? 2 : 1;
    const mealsTotal = people * mealsPerDay * days;

    // Apply discount to calculate the discounted meal price
    const discountedMealPrice = Math.round(mealPrice * (1 - totalDiscount / 100) * 10) / 10;

    // Calculate overall totals
    setTotalMeals(mealsTotal);
    setTotalPrice(Math.round(discountedMealPrice * mealsTotal * 10) / 10);
  }, [selectedMealType, personCount, deliveryMethod, selectedPlan]);

  const handleMealTypeSelect = (mealType: string) => {
    setSelectedMealType(mealType);
  };

  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method);
  };

  const handlePlanAdd = (planType: string) => {
    console.log("Plan eklendi:", planType);
    setSelectedPlan(planType);
    openSheet();
  };

  const handleContinueToCart = () => {
    console.log("Sepete devam et");
    closeSheet();
    router.push('/views/ShoppingCart');
  };

  const sliderImages = [
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ImageSlider images={sliderImages} height={200} />

        <View style={styles.subscriptionSection}>
          <Text style={styles.sectionTitle}>Abonelik Seçin</Text>

          <View style={styles.planCards}>
            {
              subscriptionPlans
                .filter(plan => plan.status === 'active')
                .map((plan) => (
                  <PlanCard
                    key={plan.value}
                    imageSource={require("../../assets/manti.png")}
                    title={plan.label}
                    subTitle="Sağlıklı Ev Yemekleri"
                    duration={plan.duration.toString() + " Gün"}
                    onPress={() => handlePlanAdd(plan.value)}
                  />
                ))
            }
          </View>
        </View>

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
  subscriptionSection: {
    paddingHorizontal: 20,
    // marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: colors.text,
    fontFamily: "Sen_400Regular",
  },
  planCards: {
    gap: 8,
  },
  bottomSpacing: {
    height: 32,
  },
});
