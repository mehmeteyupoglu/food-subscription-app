import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/colors";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profilim</Text>
        <Text style={styles.subtitle}>
          Profil bilgileriniz burada görüntülenecek
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
