import ContactInfoCard from '@/components/ContactInfoCard';
import { BUSINESS_INFO } from '@/constants/business';
import React from 'react';
import { View } from 'react-native';
import { profileStyles } from './styles';

export default function ContactDetails() {
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>
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