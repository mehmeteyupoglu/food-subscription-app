import colors from '@/colors';
import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileCardProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default function ProfileCard({ icon, label, onPress }: ProfileCardProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconCircle}>{icon}</View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color="#747783" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 0,
    height: 80,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Sen_400Regular',
  },
}); 