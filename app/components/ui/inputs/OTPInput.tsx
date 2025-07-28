import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import colors from "@/colors";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
}

export default function OTPInput({
  value,
  onChange,
  length = 4,
  error,
}: OTPInputProps) {
  const inputs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChangeText = (text: string, index: number) => {
    const newValue = value.split("");
    newValue[index] = text;

    const result = newValue.join("").slice(0, length);
    onChange(result);

    // Move to next input if text is entered
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Move to previous input on backspace
    if (key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) inputs.current[index] = ref;
            }}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
              error && styles.inputError,
            ]}
            value={value[index] || ""}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
