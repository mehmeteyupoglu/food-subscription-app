import { Pressable, StyleSheet } from "react-native";

import { Tabs, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "@/colors";
import AppHeader from "@/components/home/AppHeader";
import { Image } from "react-native";

function TabBarWithSafeArea() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        onMenuPress={() => console.log("Menu açıldı")}
        onCartPress={() => router.push("/Cart")}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 70,
            paddingBottom: Math.max(insets.bottom, 12),
            paddingTop: 8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarItemStyle: {
            backgroundColor: 'transparent',
          },
          tabBarButton: (props: any) => (
            <Pressable {...props} android_ripple={{ color: 'transparent' }} />
          ),
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
  );
}

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <TabBarWithSafeArea />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
