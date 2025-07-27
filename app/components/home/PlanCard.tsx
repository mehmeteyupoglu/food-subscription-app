import React from "react";
import type { ImageSourcePropType } from "react-native";
import { StyleSheet, Text, View } from "react-native";

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
  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray,
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
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  duration: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
  },
});
