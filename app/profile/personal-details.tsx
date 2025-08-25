import ProfileCard from "@/components/profile/ProfileCard";
import CustomButton from "@/components/ui/inputs/CustomButton";
import CustomTextInput from "@/components/ui/inputs/CustomTextInput";
import PhoneInput from "@/components/ui/inputs/PhoneInput";
import { router } from "expo-router";
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

        <CustomTextInput
          label="SOYAD"
          placeholder="Adınızı girin"
          value="Eyüpoğlu"
          onChangeText={() => { }}
        />

        <PhoneInput
          label="CEP TELEFONU"
          placeholder="Telefon numaranızı girin"
          value="505 123 45 67"
          onChangeText={() => { }}
        />
        <CustomButton
          title="KAYDET"
          onPress={() => { }}
        />
        <ProfileCard
          label="Şifreyi Değiştir"
          onPress={() => router.push('/profile/change-password')}
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