import InfoCard from "@/components/InfoCard";
import ProductCard from "@/components/ProductCard";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import { StyleSheet, View } from "react-native";
import { profileStyles } from "./styles";

export default function SubscriptionDetails() {
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>

        <ProductCard
          image={require("../../assets/manti.png")}
          subscriptionPlanLabel="Ev Yemekleri Paketi - 5 Gün"
          discountedMealPrice={310}
          mealTypeLabel="Öğle Yemekleri"
          personCount={1}
          showQuantitySelector={false}
        />
        <View style={styles.gap} />
        <InfoCard
          sectionTitle="ABONELİK TARİHLERİ"
          cardTitle="15 Ağustos - 21 Ağustos"
          cardDescription="Başlangıç tarihi bugünden itibaren en az 3 gün olmalıdır"
        />
        <View style={styles.gap} />
        <SubscriptionStatus currentStep={3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    height: 20,
  },
});