import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/colors";

interface StatusStep {
  id: number;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface SubscriptionStatusProps {
  currentStep: number;
}

export default function SubscriptionStatus({ currentStep }: SubscriptionStatusProps) {
  const steps: StatusStep[] = [
    {
      id: 1,
      text: "Abonelik talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      isActive: currentStep === 1,
      isCompleted: currentStep > 1,
    },
    {
      id: 2,
      text: "Ödeme işlemini tamamlamak için sizinle iletişime geçeceğiz.",
      isActive: currentStep === 2,
      isCompleted: currentStep > 2,
    },
    {
      id: 3,
      text: "Ödemeniz alındı. Aboneliğiniz önümüzdeki Pazartesi başlayacak.",
      isActive: currentStep === 3,
      isCompleted: currentStep > 3,
    },
    {
      id: 4,
      text: "Afiyet olsun! Aboneliğiniz şu anda aktif.",
      isActive: currentStep === 4,
      isCompleted: currentStep > 4,
    },
  ];

  return (
    <View>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconCircle,
                step.isActive && styles.activeIconCircle,
                step.isCompleted && styles.completedIconCircle,
              ]}
            >
              <MaterialIcons
                name={step.isActive ? "star" : "check"}
                size={8}
                color={step.isActive || step.isCompleted ? colors.background : colors.textSecondary}
              />
            </View>
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.connectingLine,
                  step.isCompleted && styles.completedLine,
                ]}
              />
            )}
          </View>

          {/* Text Container */}
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.stepText,
                step.isActive && styles.activeText,
                step.isCompleted && styles.completedText,
              ]}
            >
              {step.text}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  iconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.textSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconCircle: {
    backgroundColor: colors.primary,
  },
  completedIconCircle: {
    backgroundColor: colors.primary,
  },
  connectingLine: {
    width: 1,
    height: 30,
    backgroundColor: colors.textSecondary,
  },
  completedLine: {
    backgroundColor: colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  stepText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: "Sen_400Regular",
  },
  activeText: {
    color: colors.primary,
  },
  completedText: {
    color: colors.primary,
  },
}); 