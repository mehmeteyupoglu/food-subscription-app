import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "@/colors";

interface BackButtonProps {
  onPress: () => void;
  variant?: 'default' | 'dark';
}

export default function BackButton({ onPress, variant = 'default' }: BackButtonProps) {
  const isDark = variant === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDark && styles.shoppingCartButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="chevron-back"
        size={18}
        color={isDark ? '#FFFFFF' : colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shoppingCartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // 10% opacity white background
  },
});
