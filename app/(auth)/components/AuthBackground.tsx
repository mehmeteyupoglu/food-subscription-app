import { Image, StyleSheet, View } from "react-native";

import colors from "@/colors";

export default function AuthBackground() {
  return (
    <View style={styles.container}>
      {/* Orange Background */}
      <View style={styles.orangeBackground} />

      {/* Background decorations */}
      <View style={styles.decorativeTopLeft}>
        <Image source={require("../../../assets/Ellipse 1005.png")} />
      </View>
      <View style={styles.decorativeTopRight}>
        <Image source={require("../../../assets/Vector 142.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  orangeBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "65%",
    backgroundColor: colors.primary,
  },
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
});
