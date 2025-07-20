import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";

import AuthPageContainer from "@/(auth)/components/AuthPageContainer";
import colors from "@/colors";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

interface FormData {
  phoneNumber: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon numarası zorunludur";
    } else if (
      !/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/[-\s]/g, ""))
    ) {
      newErrors.phoneNumber = "Geçerli bir telefon numarası giriniz";
    }

    if (!formData.password) {
      newErrors.password = "Şifre zorunludur";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // TODO: Implement login logic
      console.log("Login data:", formData);
      // Navigate to main app or show success message
    }
  };

  return (
    <AuthPageContainer
      title="Giriş Yap"
      subtitle="Lütfen mevcut hesabınıza giriş yapın"
    >
      <TextInput
        label="TELEFON NUMARANIZ"
        value={formData.phoneNumber}
        onChangeText={value => handleInputChange("phoneNumber", value)}
        placeholder="0543-133-58-02"
        keyboardType="phone-pad"
        error={errors.phoneNumber}
      />

      <TextInput
        label="ŞİFRE"
        value={formData.password}
        onChangeText={value => handleInputChange("password", value)}
        placeholder="••••••••••"
        secureTextEntry
        error={errors.password}
      />

      <View style={styles.forgotPasswordContainer}>
        <Link href="/forgot-password" asChild>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="GİRİŞ YAP" onPress={handleLogin} variant="primary" />
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Hesabınız yok mu? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.registerLink}>KAYDOL</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </AuthPageContainer>
  );
}

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});
