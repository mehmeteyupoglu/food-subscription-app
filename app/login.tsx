import {
  ActivityIndicator,
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import colors from "@/colors";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";

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

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Telefon numarası gerekli.")
    .regex(TURKISH_PHONE_REGEX, "Geçerli bir Türk telefon numarası girin."),
  password: z
    .string()
    .min(1, "Şifre gerekli.")
    .min(6, "Şifre en az 6 karakter olmalı."),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "", remember: false },
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((res) => setTimeout(res, 1200));
    await AsyncStorage.setItem(
      "session",
      JSON.stringify({ phone: data.phone, remember: data.remember })
    );
    // TODO: Navigate to app home
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("session", JSON.stringify({ anonymous: true }));
    // TODO: Navigate to app home
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      {/* Decorative PNG shapes */}
      <View style={styles.decorativeTopLeft}>
        <Image source={require("../assets/Ellipse 1005.png")} />
      </View>
      <View style={styles.decorativeTopRight}>
        <Image source={require("../assets/Vector 142.png")} />
      </View>
      {/* Top right skip button */}
      <View style={styles.skipContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={isSubmitting}
        >
          <Text style={styles.skipText}>Atla</Text>
          <View style={styles.skipCircle}>
            <AntDesign name="arrowright" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>
      </View>
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
            <Text style={styles.label}>TELEFON NUMARANIZ</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <RNTextInput
                  value={formatTurkishPhone(value)}
                  onChangeText={(text) => onChange(text)}
                  onBlur={() => {
                    onBlur();
                    if (errors.phone && formatTurkishPhone(value).length >= 13)
                      clearErrors("phone");
                  }}
                  placeholder="543-133-58-02"
                  keyboardType="phone-pad"
                  style={[styles.input, errors.phone && styles.inputError]}
                  placeholderTextColor="#C7C7C7"
                  autoCapitalize="none"
                  maxLength={13}
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ŞİFRE</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    onBlur();
                    if (errors.password && value.length >= 6)
                      clearErrors("password");
                  }}
                  placeholder="***********"
                  style={[styles.input, errors.password && styles.inputError]}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
          <View style={styles.rowBetween}>
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
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? <ActivityIndicator color="#fff" /> : "GİRİŞ YAP"}
          </Button>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Hesabınız yok mu?</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.registerText}>KAYDOL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  decorativeTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  decorativeTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 90,
    paddingBottom: 32,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 12,
    zIndex: 2,
  },
  title: {
    color: colors.background,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 8,
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
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontSize: 13.5,
    color: colors.secondary,
    fontWeight: "500",
    marginBottom: 7,
    marginLeft: 2,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.secondary,
    fontWeight: "500",
    marginBottom: 2,
    width: "100%",
    minHeight: 48,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    marginRight: 6,
  },
  checkboxLabel: {
    color: colors.gray,
    fontSize: 14,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "500",
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: colors.gray,
    fontSize: 15,
    marginRight: 4,
  },
  registerText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  orText: {
    textAlign: "center",
    color: colors.gray,
    marginVertical: 12,
    fontSize: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
  skipContainer: {
    position: "absolute",
    top: 36,
    right: 24,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  skipCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
});
