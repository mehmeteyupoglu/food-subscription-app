import InfoCard from "@/components/InfoCard";
import { View } from "react-native";
import { profileStyles } from "./styles";

export default function SubscriptionDetails() {
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>
        <InfoCard
          sectionTitle="ABONELİK TARİHLERİ"
          cardTitle="15 Ağustos - 21 Ağustos"
          cardDescription="Başlangıç tarihi bugünden itibaren en az 3 gün olmalıdır"
        />
      </View>
    </View>
  );
}