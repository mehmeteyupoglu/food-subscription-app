import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import colors from "@/colors";
import ImageSlider from "@/components/home/ImageSlider";
import MealCustomizationSheet from "@/components/home/MealCustomizationSheet";
import PlanCard from "@/components/home/PlanCard";
import { router } from 'expo-router';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  const [selectedMealType, setSelectedMealType] = useState("2 öğün");
  const [personCount, setPersonCount] = useState('1');
  const [deliveryMethod, setDeliveryMethod] = useState('paket_servis');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleMealTypeSelect = (mealType: string) => {
    setSelectedMealType(mealType);
  };

  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method);
  };

  const handlePlanAdd = (planType: string) => {
    console.log("Plan eklendi:", planType);
    handleSheetOpen();
  };

  const handleContinueToCart = () => {
    console.log("Sepete devam et");
    bottomSheetRef.current?.close();
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
        <View style={styles.heroSection}>
          <ImageSlider images={sliderImages} height={200} />
        </View>

        <View style={styles.subscriptionSection}>
          <Text style={styles.sectionTitle}>Abonelik Seçin</Text>

          <View style={styles.planCards}>
            <PlanCard
              imageSource={require("../../assets/manti.png")}
              title="Aylık"
              subTitle="Sağlıklı Ev Yemekleri"
              duration="20 Gün"
              onPress={() => handlePlanAdd("aylik")}
            />

            <PlanCard
              imageSource={require("../../assets/ciborek.png")}
              title="Haftalık"
              subTitle="Sağlıklı Ev Yemekleri"
              duration="5 Gün"
              onPress={() => handlePlanAdd("haftalik")}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <MealCustomizationSheet
        bottomSheetRef={bottomSheetRef}
        selectedMealType={selectedMealType}
        personCount={personCount}
        deliveryMethod={deliveryMethod}
        onMealTypeSelect={handleMealTypeSelect}
        onPersonCountChange={setPersonCount}
        onDeliveryMethodChange={handleDeliveryMethodChange}
        onContinue={handleContinueToCart}
      />
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
  heroSection: {
    marginBottom: 32,
  },
  subscriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.text,
    fontFamily: "Sen_400Regular",
  },
  planCards: {
    gap: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});
