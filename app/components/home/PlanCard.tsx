import React from "react";
import type { ImageSourcePropType } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import colors from "@/colors";

interface PlanCardProps {
  title: string;
  subTitle: string;
  duration: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
}

export default function PlanCard({
  title,
  subTitle,
  duration,
  imageSource,
  onPress,
}: PlanCardProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.foodImage}
              contentFit="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialIcons
                name="restaurant"
                size={24}
                color={colors.textSecondary}
              />
            </View>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.planTitle}>{title}</Text>
          <Text style={styles.planSubtitle}>{subTitle}</Text>
        </View>

        <Text style={styles.duration}>{duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F6F8FA",
    borderRadius: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontFamily: "Sen_700Bold",
    color: colors.text,
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    fontFamily: "Sen_400Regular",
    color: colors.textSecondary,
  },
  duration: {
    fontSize: 16,
    fontFamily: "Sen_400Regular",
    color: colors.text,
  },
});
