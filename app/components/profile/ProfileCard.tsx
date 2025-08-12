import colors from '@/colors';
import { Sen_400Regular, Sen_700Bold, useFonts } from '@expo-google-fonts/sen';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileCardProps {
  label: string;
  onPress: () => void;
  imageSource: any;
}

export default function ProfileCard({ label, onPress, imageSource }: ProfileCardProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconCircle}>
        <Image
          source={imageSource}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
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
  icon: {
    width: 14,
    // height: 14,
  },
}); 