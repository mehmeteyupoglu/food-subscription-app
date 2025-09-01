import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Link, router } from "expo-router";

import AuthPageContainer from "@/(auth)/components/AuthPageContainer";
import colors from "@/colors";
import CountdownButton from "@/components/ui/inputs/CountdownButton";
import CustomButton from "@/components/ui/inputs/CustomButton";
import CustomTextInput from "@/components/ui/inputs/CustomTextInput";
import OTPInput from "@/components/ui/inputs/OTPInput";
import PhoneInput, {
  validateTurkishPhoneNumber,
} from "@/components/ui/inputs/PhoneInput";
import { apiSignUp } from "@/services/AuthService";
import type { RegisterRequest } from "@/services/types";

type Step = "register" | "verification";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

function Register() {
  const [step, setStep] = useState<Step>("register");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateRegistrationForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ad alanı zorunludur";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyad alanı zorunludur";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon numarası zorunludur";
    } else if (!validateTurkishPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Geçerli bir Türkiye telefon numarası giriniz";
    }

    if (!formData.password) {
      newErrors.password = "Şifre zorunludur";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı zorunludur";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVerificationCode = (): boolean => {
    if (formData.verificationCode.length !== 4) {
      setErrors({ verificationCode: "Doğrulama kodu 4 haneli olmalıdır" });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleRegisterStep = async () => {
    if (validateRegistrationForm()) {
      setIsLoading(true);
      try {
        const registerData: RegisterRequest = {
          email: formData.email.trim() || undefined,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber,
          password: formData.password
        };

        const response = await apiSignUp(registerData);
        console.log("Registration successful:", response);

        // For now, we'll skip SMS verification and go directly to login
        // In a real app, you might want to implement SMS verification
        Alert.alert(
          "Başarılı!",
          "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
          [
            {
              text: "Tamam",
              onPress: () => router.replace("/login"),
            },
          ]
        );
      } catch (error) {
        console.error("Registration error:", error);
        Alert.alert(
          "Hata",
          "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyCode = () => {
    if (validateVerificationCode()) {
      // TODO: Implement registration completion logic
      console.log("Registration completed for:", formData);
      // Navigate to login or main app
      router.replace("/login");
    }
  };

  const handleResendCode = () => {
    // TODO: Implement resend code logic
    console.log("Resending code to:", formData.phoneNumber);
  };

  const getStepContent = () => {
    switch (step) {
      case "register":
        return {
          title: "Kaydol",
          subtitle: "Hesabınızı oluşturun ve hemen başlayın",
          content: (
            <>
              <CustomTextInput
                label="ADINIZ"
                value={formData.firstName}
                onChangeText={value => handleInputChange("firstName", value)}
                placeholder="Ahmet"
                error={errors.firstName}
              />

              <CustomTextInput
                label="SOYADINIZ"
                value={formData.lastName}
                onChangeText={value => handleInputChange("lastName", value)}
                placeholder="Yılmaz"
                error={errors.lastName}
              />

              <CustomTextInput
                label="E-POSTA ADRESİNİZ (İSTEĞE BAĞLI)"
                value={formData.email}
                onChangeText={value => handleInputChange("email", value)}
                placeholder="ahmet.yilmaz@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <PhoneInput
                label="TELEFON NUMARANIZ"
                value={formData.phoneNumber}
                onChangeText={value => handleInputChange("phoneNumber", value)}
                placeholder="505 123 45 67"
                error={errors.phoneNumber}
              />



              <CustomTextInput
                label="ŞİFRENİZ"
                value={formData.password}
                onChangeText={value => handleInputChange("password", value)}
                placeholder="••••••••••"
                secureTextEntry
                error={errors.password}
              />

              <CustomTextInput
                label="ŞİFREYİ TEKRAR GİRİN"
                value={formData.confirmPassword}
                onChangeText={value =>
                  handleInputChange("confirmPassword", value)
                }
                placeholder="••••••••••"
                secureTextEntry
                error={errors.confirmPassword}
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  title={isLoading ? "KAYDEDİLİYOR..." : "KAYDOL"}
                  onPress={handleRegisterStep}
                  variant="primary"
                  disabled={isLoading}
                />
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Hesabınız var mı? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>GİRİŞ YAP</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </>
          ),
        };

      case "verification":
        return {
          title: "Doğrulama",
          subtitle: "Telefon numarasına bir kod gönderdik",
          content: (
            <>
              <Text style={styles.phoneDisplay}>{formData.phoneNumber}</Text>

              <View style={styles.codeContainer}>
                <Text style={styles.codeLabel}>KOD</Text>
                <CountdownButton
                  title="Tekrar Gönder"
                  onPress={handleResendCode}
                  initialCountdown={50}
                />
              </View>

              <OTPInput
                value={formData.verificationCode}
                onChange={value => handleInputChange("verificationCode", value)}
                length={4}
                error={errors.verificationCode}
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="DOĞRULA"
                  onPress={handleVerifyCode}
                  variant="primary"
                />
              </View>
            </>
          ),
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <AuthPageContainer
      title={stepContent.title}
      subtitle={stepContent.subtitle}
    >
      {stepContent.content}
    </AuthPageContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
    letterSpacing: 1,
  },

});

export default Register;
