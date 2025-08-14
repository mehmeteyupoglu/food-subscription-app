import colors from '@/colors';
import BackButton from '@/components/ui/BackButton';
import { Stack, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

function ProfileLayoutContent() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  // Sadece alt sayfalarda geri butonu göster
  const showBackButton = currentRoute !== 'profile';

  const handleBackPress = () => {
    require('expo-router').router.back();
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <View style={styles.header}>
          <BackButton onPress={handleBackPress} />
          <Text style={styles.title}>
            {currentRoute === 'contact-details' && 'İletişim'}
            {currentRoute === 'personal-details' && 'Kişisel Bilgiler'}
            {currentRoute === 'subscription-details' && 'Aboneliğim'}
          </Text>
        </View>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animation: 'fade_from_bottom',
        }}
      />
    </View>
  );
}

export default function ProfileLayout() {
  return <ProfileLayoutContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 30,
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