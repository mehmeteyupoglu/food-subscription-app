import { Sen_400Regular, Sen_700Bold } from "@expo-google-fonts/sen";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/colors";
import MenuBanner from "@/components/menu/MenuBanner";
import ProfileCard from "@/components/profile/ProfileCard";

export default function Menu() {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  const handleMenuPress = () => {
    router.push("/menu/meals");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MenuBanner />
      <View style={styles.content}>
        <Text style={styles.title}>Sağlıklı Ev Yemekleri Menü</Text>
        <Text style={styles.subtitle}>
          Ev yemeği lezzetinden vazgeçemeyenler için Ev Yemekleri Paketi ile tanışın!
          Geleneksel tatlar, özenle hazırlanmış menüler ve sıcacık ev lezzetleriyle
          sofranızı şenlendirin! 🍲✨
        </Text>
      </View>
      <ProfileCard
        label="Menüyü Görüntüle"
        onPress={handleMenuPress}
        imageSource={require("../../../assets/icons/download.png")}
        iconSize={24}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 24,
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: "Sen_700Bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Sen_400Regular",
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 24,
  },
});
