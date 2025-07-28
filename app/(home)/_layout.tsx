import { StyleSheet } from "react-native";

import { Tabs, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import colors from "@/colors";
import AppHeader from "@/components/home/AppHeader";
import { Image } from "react-native";

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
                <Image
                  source={require("../../assets/icons/home.png")}
                  style={{ width: size * 0.7, height: size * 0.7, tintColor: color }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Menu"
            options={{
              title: "Menü",
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("../../assets/icons/menu.png")}
                  style={{ width: size * 0.7, height: size * 0.7, tintColor: color }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            options={{
              title: "Profil",
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("../../assets/icons/profile.png")}
                  style={{ width: size * 0.7, height: size * 0.7, tintColor: color }}
                  resizeMode="contain"
                />
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
