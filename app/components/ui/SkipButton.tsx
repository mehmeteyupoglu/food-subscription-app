import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "@/colors";

interface SkipButtonProps {
  onPress: () => void;
}

export default function SkipButton({ onPress }: SkipButtonProps) {
  return (
    <TouchableOpacity style={styles.skipButton} onPress={onPress}>
      <View style={styles.skipContent}>
        <Text style={styles.skipText}>Atla</Text>
        <View style={styles.skipCircle}>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    padding: 8,
  },
  skipContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  skipCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
