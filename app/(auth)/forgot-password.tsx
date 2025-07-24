import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

import AuthPageContainer from "@/(auth)/components/AuthPageContainer";
import colors from "@/colors";
import CountdownButton from "@/components/CountdownButton";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import OTPInput from "@/components/OTPInput";
import PhoneInput, {
  validateTurkishPhoneNumber,
} from "@/components/PhoneInput";

type Step = "phone" | "verification" | "newPassword";

interface FormData {
  phoneNumber: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("phone");
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validatePhoneNumber = (): boolean => {
    if (!formData.phoneNumber.trim()) {
      setErrors({ phoneNumber: "Telefon numarası zorunludur" });
      return false;
    }

    if (!validateTurkishPhoneNumber(formData.phoneNumber)) {
      setErrors({
        phoneNumber: "Geçerli bir Türkiye telefon numarası giriniz",
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const validateVerificationCode = (): boolean => {
    if (formData.verificationCode.length !== 4) {
      setErrors({ verificationCode: "Doğrulama kodu 4 haneli olmalıdır" });
      return false;
    }

    setErrors({});
    return true;
  };

  const validatePasswords = (): boolean => {
    const newErrors: Partial<FormData> = {};

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

  const handleSendCode = () => {
    if (validatePhoneNumber()) {
      // TODO: Implement send SMS code logic
      console.log("Sending code to:", formData.phoneNumber);
      setStep("verification");
    }
  };

  const handleVerifyCode = () => {
    if (validateVerificationCode()) {
      // TODO: Implement verify code logic
      console.log("Verifying code:", formData.verificationCode);
      setStep("newPassword");
    }
  };

  const handleResetPassword = () => {
    if (validatePasswords()) {
      // TODO: Implement password reset logic
      console.log("Resetting password for:", formData.phoneNumber);
      // Navigate back to login
      router.replace("/login");
    }
  };

  const handleResendCode = () => {
    // TODO: Implement resend code logic
    console.log("Resending code to:", formData.phoneNumber);
  };

  const getStepContent = () => {
    switch (step) {
      case "phone":
        return {
          title: "Şifremi Unuttum",
          subtitle: "Lütfen telefon numaranızı yazın",
          content: (
            <>
              <PhoneInput
                label="TELEFON NUMARASI"
                value={formData.phoneNumber}
                onChangeText={value => handleInputChange("phoneNumber", value)}
                placeholder="505 123 45 67"
                error={errors.phoneNumber}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="ONAYLA"
                  onPress={handleSendCode}
                  variant="primary"
                />
              </View>
            </>
          ),
        };

      case "verification":
        return {
          title: "Şifremi Unuttum",
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

      case "newPassword":
        return {
          title: "Şifremi Unuttum",
          subtitle: "Lütfen yeni şifrenizi girin",
          content: (
            <>
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
                  title="ONAYLA"
                  onPress={handleResetPassword}
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
