import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "@/colors";

interface CountdownButtonProps {
  onPress: () => void;
  initialCountdown?: number;
  title: string;
  disabled?: boolean;
}

export default function CountdownButton({
  onPress,
  initialCountdown = 50,
  title,
  disabled = false,
}: CountdownButtonProps) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isCountingDown, setIsCountingDown] = useState(true);

  useEffect(() => {
    if (countdown > 0 && isCountingDown) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }
  }, [countdown, isCountingDown]);

  const handlePress = () => {
    if (!isCountingDown && !disabled) {
      onPress();
      setCountdown(initialCountdown);
      setIsCountingDown(true);
    }
  };

  const isButtonDisabled = isCountingDown || disabled;

  return (
    <TouchableOpacity
      style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
      onPress={handlePress}
      disabled={isButtonDisabled}
    >
      <Text
        style={[
          styles.buttonText,
          isButtonDisabled && styles.buttonTextDisabled,
        ]}
      >
        {isCountingDown ? `${title} ${countdown}sn` : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
});
