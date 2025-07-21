import type { ReactNode } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useScroll } from "../../../lib/ScrollContext";

import AuthBackground from "./AuthBackground";
import AuthFormContainer from "./AuthFormContainer";
import AuthHeader from "./AuthHeader";

interface AuthPageContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const { height: screenHeight } = Dimensions.get("window");

export default function AuthPageContainer({
  title,
  subtitle,
  children,
}: AuthPageContainerProps) {
  const { setScrollY } = useScroll();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setScrollY(scrollY);
  };

  return (
    <View style={styles.container}>
      <AuthBackground />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { minHeight: screenHeight },
          ]}
          showsVerticalScrollIndicator={true}
          indicatorStyle="default"
          scrollEventThrottle={16}
          bounces={true}
          keyboardShouldPersistTaps="handled"
          persistentScrollbar={true}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={handleScroll}
        >
          <AuthHeader title={title} subtitle={subtitle} />

          <AuthFormContainer>{children}</AuthFormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 120,
    // Form'u sayfanın ortasında konumlandır
    justifyContent: "center",
  },
});
