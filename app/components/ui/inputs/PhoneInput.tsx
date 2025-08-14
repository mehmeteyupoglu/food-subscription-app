import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import { useState } from "react";
import type { TextInputProps as RNTextInputProps } from "react-native";
import { TextInput as RNTextInput, StyleSheet, Text, View } from "react-native";

import colors from "@/colors";

interface PhoneInputProps
  extends Omit<RNTextInputProps, "style" | "value" | "onChangeText"> {
  label: string;
  error?: string;
  value: string;
  onChangeText: (value: string) => void;
}

// TR telefon numarası maskeleme fonksiyonu
const formatPhoneNumber = (value: string): string => {
  // Sadece rakamları al
  const numbers = value.replace(/\D/g, "");

  // 5 ile başlayan 10 haneli formatta maskeleme
  if (numbers.length <= 10) {
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 3) return `${numbers.slice(0, 3)}`;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
  }

  return value;
};

// Ham telefon numarasını al (sadece rakamlar)
const getCleanPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, "");
};

// TR telefon numarası validasyon fonksiyonu
export const validateTurkishPhoneNumber = (phoneNumber: string): boolean => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  // 10 haneli mobil numara kontrolü (5 ile başlayıp)
  if (cleaned.length === 10 && cleaned.startsWith("5")) {
    const operatorCode = cleaned.substring(0, 3);
    // Türkiye mobil operatör kodları: 50x, 51x, 52x, 53x, 54x, 55x, 59x
    const validOperatorCodes = [
      "501",
      "502",
      "503",
      "504",
      "505",
      "506",
      "507",
      "508",
      "509",
      "510",
      "511",
      "512",
      "513",
      "514",
      "515",
      "516",
      "517",
      "518",
      "519",
      "520",
      "521",
      "522",
      "523",
      "524",
      "525",
      "526",
      "527",
      "528",
      "529",
      "530",
      "531",
      "532",
      "533",
      "534",
      "535",
      "536",
      "537",
      "538",
      "539",
      "540",
      "541",
      "542",
      "543",
      "544",
      "545",
      "546",
      "547",
      "548",
      "549",
      "550",
      "551",
      "552",
      "553",
      "554",
      "555",
      "556",
      "557",
      "558",
      "559",
      "590",
      "591",
      "592",
      "593",
      "594",
      "595",
      "596",
      "597",
      "598",
      "599",
    ];

    return validOperatorCodes.includes(operatorCode);
  }

  return false;
};

export default function PhoneInput({
  label,
  error,
  value,
  onChangeText,
  ...props
}: PhoneInputProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  const [displayValue, setDisplayValue] = useState(formatPhoneNumber(value));

  const handleChangeText = (text: string) => {
    // Maskelenmiş metni güncelle
    const formatted = formatPhoneNumber(text);
    setDisplayValue(formatted);

    // Ham telefon numarasını parent komponente gönder
    const cleanNumber = getCleanPhoneNumber(text);
    onChangeText(cleanNumber);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <RNTextInput
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          value={displayValue}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          maxLength={13} // 505 123 45 67 formatı için
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  inputContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    minHeight: 56,
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.cardTextSecondary,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
