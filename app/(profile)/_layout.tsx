import BackButton from '@/components/BackButton';
import { Stack, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ScrollProvider, useScroll } from '../../lib/ScrollContext';

function ProfileLayoutContent() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];
  const { scrollY } = useScroll ? useScroll() : { scrollY: 0 };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Sadece alt sayfalarda geri butonu göster
  const showBackButton = currentRoute !== 'profile';

  useEffect(() => {
    const shouldShow = scrollY > 100;
    Animated.timing(fadeAnim, {
      toValue: shouldShow ? 0 : 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, [scrollY, fadeAnim]);

  const handleBackPress = () => {
    require('expo-router').router.back();
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <Animated.View style={[styles.backButtonContainer, { opacity: fadeAnim }]}>
          <BackButton onPress={handleBackPress} />
        </Animated.View>
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
  return (
    <ScrollProvider>
      <ProfileLayoutContent />
    </ScrollProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 3,
  },
});