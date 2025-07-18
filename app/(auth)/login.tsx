import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import colors from "@/colors";
import Header from "@/components/Header";

const TURKISH_PHONE_REGEX = /^(5\d{2}-\d{3}-\d{2}-\d{2})$/;
function formatTurkishPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
    6,
    8
  )}-${digits.slice(8, 10)}`;
}

const schema = z.object({
  phone: z
    .string()
    .min(1, "Telefon numarası gerekli.")
    .regex(TURKISH_PHONE_REGEX, "Geçerli bir Türk telefon numarası girin."),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .max(50, "Şifre çok uzun"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  phone: "",
  password: "",
  remember: false,
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkip = () => {
    // Handle skip action
    console.log("Skip pressed");
    reset();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <Header showSkipButton onSkip={handleSkip} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.subtitle}>
            Lütfen mevcut hesabınıza giriş yapın
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    value={formatTurkishPhone(value)}
                    onChangeText={text => onChange(text)}
                    onBlur={() => {
                      onBlur();
                      if (
                        errors.phone &&
                        formatTurkishPhone(value).length >= 13
                      )
                        clearErrors("phone");
                    }}
                    placeholder="Telefon Numarası (5XX-XXX-XX-XX)"
                    keyboardType="phone-pad"
                    style={[styles.input, errors.phone && styles.inputError]}
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="none"
                    maxLength={13}
                    returnKeyType="next"
                    textContentType="telephoneNumber"
                  />
                  {errors.phone && (
                    <Text style={styles.errorText}>{errors.phone.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.password && styles.inputError,
                    ]}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={() => {
                        onBlur();
                        if (errors.password && value.length >= 6)
                          clearErrors("password");
                      }}
                      placeholder="Şifre"
                      secureTextEntry={!showPassword}
                      style={styles.passwordInput}
                      placeholderTextColor={colors.textSecondary}
                      autoCapitalize="none"
                      textContentType="password"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Controller
              control={control}
              name="remember"
              render={({ field: { value, onChange } }) => (
                <TouchableOpacity
                  onPress={() => onChange(!value)}
                  style={styles.checkboxRow}
                  activeOpacity={0.7}
                >
                  <View style={styles.checkboxBox}>
                    {value ? (
                      <Ionicons name="checkbox" size={20} color="#FF7A1A" />
                    ) : (
                      <Ionicons
                        name="square-outline"
                        size={20}
                        color="#C7C7C7"
                      />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Beni hatırla</Text>
                </TouchableOpacity>
              )}
            />
            <Link href="/forgot-password" asChild>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.submitButtonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Hesabın yok mu?</Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Kayıt Ol</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 0,
    paddingBottom: 32,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 12,
    zIndex: 2,
    marginTop: 90,
  },
  title: {
    color: colors.background,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: colors.background,
    fontSize: 15,
    textAlign: "center",
    opacity: 0.85,
    fontWeight: "400",
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 28,
    padding: 24,
    gap: 24,
    width: "90%",
    alignSelf: "center",
    marginTop: 0,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 2,
    alignItems: "stretch",
  },
  inputGroup: {
    gap: 16,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: "transparent",
    minHeight: 48,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    minHeight: 48,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  eyeButton: {
    padding: 12,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    marginRight: 6,
  },
  checkboxLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  registerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
