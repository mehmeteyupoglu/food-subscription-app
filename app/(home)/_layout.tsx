import { StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import colors from "@/colors";
import AppHeader from "@/components/home/AppHeader";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AppHeader
          onMenuPress={() => console.log("Menu açıldı")}
          onCartPress={() => router.push("/views/ShoppingCart")}
        />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="Home"
            options={{
              title: "Ana Sayfa",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Menu"
            options={{
              title: "Menü",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="restaurant-menu"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            options={{
              title: "Profil",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
