import colors from "@/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


interface MenuItemProps {
  date: string;
  mealDescription: string;
  imageSource: any;
}

export default function MenuItem({ date, mealDescription, imageSource }: MenuItemProps) {
  return (
    <View style={styles.container}>
      {/* Menu Image */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.menuImage}
          resizeMode="cover"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.mealDescription}>{mealDescription}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    gap: 12,
    height: 84,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  imageContainer: {
    width: 60,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
  },
  menuImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 4,
    flex: 1,
    height: 55,
  },
  dateText: {
    width: "100%",
    height: 17,
    fontFamily: "Sen_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    textTransform: "uppercase",
    color: colors.text,
  },
  mealDescription: {
    width: "100%",
    height: 34,
    fontFamily: "Sen_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: colors.textSecondary,
  },
});
