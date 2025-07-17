import React from "react";
import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onBlur?: () => void;
}

const TextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  inputStyle,
  keyboardType = "default",
  autoCapitalize = "none",
  rightIcon,
  onRightIconPress,
  onBlur,
}) => {
  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C7C7C7"
        secureTextEntry={secureTextEntry}
        style={[styles.input, inputStyle]}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onBlur={onBlur}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={styles.iconContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 0,
    marginVertical: 4,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default TextInput;
