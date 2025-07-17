import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, right, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Sol üst dekoratif şekil */}
      <View style={styles.topLeftDecoration} />
      {/* Sağ üst dekoratif şekil */}
      <View style={styles.topRightDecoration} />
      {right && <View style={styles.right}>{right}</View>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF7A1A",
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: "relative",
    overflow: "visible",
  },
  topLeftDecoration: {
    position: "absolute",
    top: -24,
    left: -24,
    width: 80,
    height: 80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderWidth: 0,
    borderStyle: "solid",
    backgroundColor: "transparent",
    zIndex: 10,
    overflow: "hidden",
  },
  topRightDecoration: {
    position: "absolute",
    top: 12,
    right: -12,
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#222",
    borderStyle: "dashed",
    zIndex: 10,
    backgroundColor: "transparent",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 8,
  },
  subtitle: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    opacity: 0.85,
    fontWeight: "400",
  },
  right: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 20,
  },
});

export default Header;
