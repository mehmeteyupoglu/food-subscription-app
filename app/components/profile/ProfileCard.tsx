import colors from '@/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileCardProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  isLogout?: boolean;
}

export default function ProfileCard({ icon, label, onPress, isLogout }: ProfileCardProps) {
  return (
    <TouchableOpacity style={[styles.card, isLogout && styles.logoutCard]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconCircle}>{icon}</View>
      <Text style={[styles.cardLabel, isLogout && styles.logoutLabel]}>{label}</Text>
      <Ionicons name="chevron-forward" size={22} color={isLogout ? '#FF6B6B' : colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutCard: {
    backgroundColor: colors.gray,
  },
  logoutLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
}); 