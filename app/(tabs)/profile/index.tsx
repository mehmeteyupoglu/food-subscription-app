import colors from '@/colors';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      {/* Profil üst kısmı */}
      <ProfileHeader name="Ahmet Yılmaz" phone="543-133-58-02" />

      {/* Kartlar */}
      <View style={styles.cardGroup}>
        <ProfileCard
          label="Kişisel Bilgiler"
          imageSource={require('../../../assets/icons/person.png')}
          onPress={() => router.push('/profile/personal-details')}
        />
        <ProfileCard
          label="Aboneliğim"
          imageSource={require('../../../assets/icons/menu.png')}
          onPress={() => router.push('/profile/subscription-details')}
        />
        <ProfileCard
          label="İletişim"
          imageSource={require('../../../assets/icons/heart.png')}
          onPress={() => router.push('/profile/contact-details')}
        />
        <ProfileCard
          label="Çıkış Yap"
          imageSource={require('../../../assets/icons/Logout.png')}
          onPress={() => router.replace('/(auth)/login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  cardGroup: {
    gap: 16,
    marginBottom: 24,
  },
  logoutGroup: {
    marginTop: 8,
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutCard: {
    backgroundColor: colors.gray,
  },
  logoutLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});