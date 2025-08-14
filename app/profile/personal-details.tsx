import ContactInfoCard from "@/components/ContactInfoCard";
import ProfileCard from "@/components/profile/ProfileCard";
import CustomButton from "@/components/ui/inputs/CustomButton";
import CustomTextInput from "@/components/ui/inputs/CustomTextInput";
import { BUSINESS_INFO } from "@/constants/business";
import { StyleSheet, View } from "react-native";
import { profileStyles } from './styles';

export default function PersonalDetails() {
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>
        {/* Orange Circle */}
        <View style={styles.avatar} />

        <CustomTextInput
          label="AD"
          placeholder="Adınızı girin"
          value="Kerem"
          onChangeText={() => { }}
        />

        <ContactInfoCard
          sectionTitle="AD"
          cardDescription='Kerem'
        />
        <ContactInfoCard
          sectionTitle="SOYAD"
          cardDescription='Eyüpoğlu'
        />
        <ContactInfoCard
          sectionTitle="CEP TELEFONU"
          cardDescription={BUSINESS_INFO.whatsapp}
        />
        <CustomButton
          title="KAYDET"
          onPress={() => { }}
        />

        <ProfileCard
          label="Şifreyi Değiştir"
          onPress={() => { }}
          imageSource={require('../../assets/icons/lock.png')}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FF6B35',
    alignSelf: 'center',
  },
});