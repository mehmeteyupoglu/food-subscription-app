import React from "react";
import type { ImageSourcePropType } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import colors from "@/colors";

interface PlanCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  imageSource?: ImageSourcePropType;
  onAddPress: () => void;
}

export default function PlanCard({
  title,
  price,
  originalPrice,
  imageSource,
  onAddPress,
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
                size={30}
                color={colors.textSecondary}
              />
            </View>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.planTitle}>{title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{price}</Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>{originalPrice}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    marginRight: 12,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.gray,
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
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
