import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import TextInput from "./TextInput";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onBlur?: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  onBlur,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!visible}
      style={style} // Pass style to container
      inputStyle={inputStyle} // Only use if needed for overrides
      rightIcon={
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={22}
          color="#B0B0B0"
        />
      }
      onRightIconPress={() => setVisible((v) => !v)}
      onBlur={onBlur}
    />
  );
};

export default PasswordInput;
