import colors from '@/colors';
import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContactInfoCardProps {
  sectionTitle: string;
  cardTitle?: string;
  cardDescription: string;
}

export default function ContactInfoCard({
  sectionTitle,
  cardTitle,
  cardDescription,
}: ContactInfoCardProps) {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.sectionLabel}>{sectionTitle}</Text>
      <View style={styles.contentBox}>
        {cardTitle && (
          <Text style={styles.cardTitle}>{cardTitle}</Text>
        )}
        <Text style={styles.cardDescription}>{cardDescription}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  sectionLabel: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  contentBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Sen_400Regular',
    color: colors.cardTextSecondary,
  },
}); 