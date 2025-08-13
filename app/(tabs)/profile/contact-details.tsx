import colors from '@/colors';
import ContactInfoCard from '@/components/ContactInfoCard';
import { BUSINESS_INFO } from '@/constants/business';
import { Sen_400Regular, useFonts } from '@expo-google-fonts/sen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ContactDetails() {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>İletişim</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ContactInfoCard
          sectionTitle="ŞUBE ADRESİ"
          cardTitle={BUSINESS_INFO.name}
          cardDescription={BUSINESS_INFO.address}
        />
        <ContactInfoCard
          sectionTitle="SABİT TELEFONU"
          cardDescription={BUSINESS_INFO.fixedPhone}
        />
        <ContactInfoCard
          sectionTitle="WHATSAPP"
          cardDescription={BUSINESS_INFO.whatsapp}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginLeft: 65,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});