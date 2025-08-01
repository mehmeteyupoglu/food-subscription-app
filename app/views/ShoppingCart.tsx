import { router } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/colors";
import BackButton from "@/components/ui/BackButton";

export default function ShoppingCart() {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} />
        <Text style={styles.headerTitle}>Sepetim</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Sepetiniz henüz boş</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
