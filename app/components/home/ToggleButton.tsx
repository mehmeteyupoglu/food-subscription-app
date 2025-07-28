import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "@/colors";

interface ToggleButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function ToggleButton({
  title,
  isSelected,
  onPress,
}: ToggleButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : styles.unselectedButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unselectedButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedText: {
    color: colors.background,
  },
  unselectedText: {
    color: colors.text,
  },
});
