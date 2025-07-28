import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
            <MaterialIcons name="location-on" size={24} color={colors.text} />
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
        <Image source={require("../../../assets/icons/cart.png")} style={{ width: 18, height: 20, tintColor: colors.background }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F8FA',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 45,
    height: 45,
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
