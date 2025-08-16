import colors from '@/colors';
import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderProps {
  name: string;
  phone: string;
}

export default function ProfileHeader({ name, phone }: ProfileHeaderProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.avatar} />
      <View style={styles.infoStack}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 0,
    backgroundColor: colors.primary,
    marginRight: 32,
  },
  infoStack: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Sen_700Bold',
    color: colors.text,
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.textSecondary,
    marginBottom: 8,
  },
}); 