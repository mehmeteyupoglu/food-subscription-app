import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/colors";

interface HeaderProps {
  showSkipButton?: boolean;
  onSkip?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSkipButton = false, onSkip }) => {
  return (
    <>
      {/* Decorative PNG shapes */}
      <View style={styles.decorativeTopLeft}>
        <Image source={require("../../assets/Ellipse 1005.png")} />
      </View>
      <View style={styles.decorativeTopRight}>
        <Image source={require("../../assets/Vector 142.png")} />
      </View>

      {/* Skip button */}
      {showSkipButton && onSkip && (
        <View style={styles.skipContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <View style={styles.skipContent}>
              <Text style={styles.skipText}>Atla</Text>
              <View style={styles.skipCircle}>
                <Text style={styles.skipArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  decorativeTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  decorativeTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  skipContainer: {
    position: "absolute",
    top: 36,
    right: 24,
    zIndex: 2,
  },
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
  skipArrow: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default Header;
