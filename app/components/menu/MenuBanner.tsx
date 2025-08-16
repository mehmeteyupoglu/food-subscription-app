import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function MenuBanner() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/food_table.png")}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
});
