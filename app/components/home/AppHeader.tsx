import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import colors from "@/colors";

interface AppHeaderProps {
  showMenu?: boolean;
  onMenuPress?: () => void;
  onCartPress?: () => void;
}

export default function AppHeader({
  showMenu = true,
  onMenuPress,
  onCartPress,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showMenu && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onMenuPress}
            activeOpacity={0.7}
          >
            <MaterialIcons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.brandTitle}>ŞUBE</Text>
          <Text style={styles.restaurantName}>Bitat Cafe & Restaurant</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        activeOpacity={0.7}
        onPress={onCartPress}
      >
        <MaterialIcons
          name="shopping-cart"
          size={24}
          color={colors.background}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  restaurantName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cartButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 22,
  },
});
