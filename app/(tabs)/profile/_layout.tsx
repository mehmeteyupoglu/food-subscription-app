import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

function ProfileLayoutContent() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

export default function ProfileLayout() {
  return <ProfileLayoutContent />;
}

// MARK: - Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});