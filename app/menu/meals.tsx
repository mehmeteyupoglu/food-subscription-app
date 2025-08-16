import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import colors from "@/colors";
import MenuItem from "@/components/menu/MenuItem";
import BackButton from "@/components/ui/BackButton";
import { getAllWeeks } from "@/constants/monthlyMenu";

export default function MealsPage() {
  const handleGoBack = () => {
    router.push("/menu");
  };

  const allWeeks = getAllWeeks();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} />
        <Text style={styles.headerTitle}>Aylık Menü</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {allWeeks.map((week, weekIndex) => (
          <View key={week.weekTitle} style={styles.weekContainer}>
            <Text style={styles.weekTitle}>{week.weekTitle}</Text>
            <View style={styles.menuItemsContainer}>
              {week.days.map((day) => (
                <View key={day.id}>
                  <MenuItem
                    date={day.dayTitle}
                    mealDescription={day.mealTitle}
                    imageSource={require("../../assets/manti.png")}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 21,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.text,
    marginLeft: 18,
    fontFamily: "Sen_400Regular",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  weekContainer: {
    marginBottom: 32,
  },
  weekTitle: {
    fontSize: 20,
    fontFamily: "Sen_400Regular",
    color: colors.text,
    marginBottom: 12,
  },
  menuItemsContainer: {
    gap: 12,
  },
});
