import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import colors from "@/colors";

interface AuthFormContainerProps {
  children: ReactNode;
}

export default function AuthFormContainer({
  children,
}: AuthFormContainerProps) {
  return <View style={styles.formContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Minimum yükseklik 400px, içerik uzunsa genişler
    minHeight: 400,
    flexShrink: 0,
    flexGrow: 1,
  },
});
