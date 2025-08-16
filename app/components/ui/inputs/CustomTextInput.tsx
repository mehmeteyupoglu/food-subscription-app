import { useState } from "react";
import type { TextInputProps as RNTextInputProps } from "react-native";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import { Ionicons } from "@expo/vector-icons";

import colors from "@/colors";

interface CustomTextInputProps extends Omit<RNTextInputProps, "style"> {
  label: string;
  error?: string;
}

export default function CustomTextInput({
  label,
  error,
  secureTextEntry,
  ...props
}: CustomTextInputProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <RNTextInput
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={toggleSecureEntry}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    minHeight: 56,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.cardTextSecondary,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: "#FFF5F5",
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
