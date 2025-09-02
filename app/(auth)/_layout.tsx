import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { router, Stack, useSegments } from "expo-router";

import BackButton from "@/components/ui/BackButton";
import SkipButton from "@/components/ui/SkipButton";

import { ScrollProvider, useScroll } from "../../lib/ScrollContext";

function AuthLayoutContent() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];
  const { scrollY } = useScroll();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Route-specific configurations
  const getRouteConfig = () => {
    switch (currentRoute) {
      case "login":
        return {
          showSkipButton: true,
          showBackButton: false,
        };
      case "register":
        return {
          showSkipButton: false,
          showBackButton: true,
        };
      case "forgot-password":
        return {
          showSkipButton: false,
          showBackButton: true,
        };
      default:
        return {
          showSkipButton: false,
          showBackButton: false,
        };
    }
  };

  // Scroll position'a göre BackButton visibility
  useEffect(() => {
    const shouldShow = scrollY > 100; // 100px scroll sonra fade out

    Animated.timing(fadeAnim, {
      toValue: shouldShow ? 0 : 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, [scrollY, fadeAnim]);

  const handleSkip = () => {
    // TODO: Navigate to main app without login
    console.log("Skip login");
    router.replace("/(tabs)/home");
  };

  const handleBackPress = () => {
    // Use expo-router's back navigation
    require("expo-router").router.back();
  };

  const config = getRouteConfig();

  return (
    <View style={styles.container}>
      {/* Navigation buttons */}
      {config.showBackButton && (
        <Animated.View
          style={[styles.backButtonContainer, { opacity: fadeAnim }]}
        >
          <BackButton onPress={handleBackPress} />
        </Animated.View>
      )}

      {config.showSkipButton && (
        <Animated.View
          style={[styles.skipButtonContainer, { opacity: fadeAnim }]}
        >
          <SkipButton onPress={handleSkip} />
        </Animated.View>
      )}

      {/* Stack Navigator */}
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: "card",
          animation: "fade_from_bottom",
        }}
      />
    </View>
  );
}

export default function AuthLayout() {
  return (
    <ScrollProvider>
      <AuthLayoutContent />
    </ScrollProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backButtonContainer: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 3,
  },
  skipButtonContainer: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 3,
  },
});
