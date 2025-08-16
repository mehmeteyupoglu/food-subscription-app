import InfoCard from '@/components/InfoCard';
import { BUSINESS_INFO } from '@/constants/business';
import React from 'react';
import { View } from 'react-native';
import { profileStyles } from './styles';

export default function ContactDetails() {
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.content}>
        <InfoCard
          sectionTitle="ŞUBE ADRESİ"
          cardTitle={BUSINESS_INFO.name}
          cardDescription={BUSINESS_INFO.address}
        />
        <InfoCard
          sectionTitle="SABİT TELEFONU"
          cardDescription={BUSINESS_INFO.fixedPhone}
        />
        <InfoCard
          sectionTitle="WHATSAPP"
          cardDescription={BUSINESS_INFO.whatsapp}
        />
      </View>
    </View>
  );
}