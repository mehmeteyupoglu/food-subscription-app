import CustomButton from "@/components/ui/inputs/CustomButton";
import CustomTextInput from "@/components/ui/inputs/CustomTextInput";
import { useState } from "react";
import { View } from "react-native";
import { profileStyles } from './styles';

interface FormData {
  phoneNumber: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {

  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    password: "",
    newPassword: "",
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

  const validateChangePasswordForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.password) {
      newErrors.password = "Şifre zorunludur";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Şifre zorunludur";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Şifre en az 6 karakter olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı zorunludur";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = () => {
    if (validateChangePasswordForm()) {
      // TODO: Implement change password logic
      console.log("Change password submitted", {
        password: formData.password,
        newPassword: formData.newPassword,
      });
    }
  };

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>

        <CustomTextInput
          label="ESKİ ŞİFRE"
          value={formData.password}
          onChangeText={value => handleInputChange("password", value)}
          // placeholder="••••••••••"
          secureTextEntry
          error={errors.password}
        />

        <CustomTextInput
          label="YENİ ŞİFRE"
          value={formData.newPassword}
          onChangeText={value => handleInputChange("newPassword", value)}
          // placeholder="••••••••••"
          secureTextEntry
          error={errors.newPassword}
        />

        <CustomTextInput
          label="ŞİFRE TEKRAR"
          value={formData.confirmPassword}
          onChangeText={value => handleInputChange("confirmPassword", value)}
          // placeholder="••••••••••"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <CustomButton
          title="ŞİFRE DEĞİŞTİR"
          onPress={handleChangePassword}
        />

      </View>
    </View>
  );
}