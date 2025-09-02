import colors from '@/colors';
import BackButton from '@/components/ui/BackButton';
import { Stack, useSegments } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ProfileStackLayout() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  const routeTitles: Record<string, string> = {
    'contact-details': 'İletişim',
    'personal-details': 'Kişisel Bilgiler',
    'subscription-details': 'Aboneliğim',
    'change-password': 'Şifre Değiştir',
  };

  const handleBackPress = () => {
    require('expo-router').router.push('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={handleBackPress} />
        <Text style={styles.title}>
          {routeTitles[currentRoute] || ''}
        </Text>
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </View>
  );
}

export default ProfileStackLayout;

// MARK: - Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginLeft: 16,
  },
}); 