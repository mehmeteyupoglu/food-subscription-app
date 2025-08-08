// Format plan information - Global function
export const getPlanDisplayText = (selectedPlan: string | null | undefined): string => {
  if (!selectedPlan) return "Plan Seçiniz";

  const planName = selectedPlan === "weekly_5" ? "Haftalık Plan" : selectedPlan === "weekly_6" ? "Haftalık Plan" : "Aylık Plan";
  const days = selectedPlan === "weekly_5" ? "5 Gün" : selectedPlan === "weekly_6" ? "6 Gün" : "20 Gün";

  return `${planName} - ${days}`;
};

// Default export to satisfy Expo Router
export default { getPlanDisplayText }; 