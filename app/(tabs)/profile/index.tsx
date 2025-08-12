import colors from '@/colors';
import ProfileCard from '@/components/profile/ProfileCard';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      {/* Profil üst kısmı */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.infoStack}>
          <Text style={styles.name}>Ahmet Yılmaz</Text>
          <Text style={styles.phone}>543-133-58-02</Text>
        </View>
      </View>

      {/* Kartlar */}
      <View style={styles.cardGroup}>
        <ProfileCard
          icon={<MaterialIcons name="person-outline" size={28} color={colors.primary} />}
          label="Kişisel Bilgiler"
          onPress={() => router.push('/profile/personal-details')}
        />
        <ProfileCard
          icon={<MaterialCommunityIcons name="clipboard-text-outline" size={28} color="#6C63FF" />}
          label="Aboneliğim"
          onPress={() => router.push('/profile/subscription-details')}
        />
        <ProfileCard
          icon={<Ionicons name="heart-outline" size={28} color="#C85FFC" />}
          label="İletişim"
          onPress={() => router.push('/profile/contact-details')}
        />
      </View>

      {/* Çıkış kartı */}
      <View style={styles.logoutGroup}>
        <ProfileCard
          icon={<MaterialIcons name="logout" size={28} color="#FF6B6B" />}
          label="Çıkış Yap"
          onPress={() => router.replace('/(auth)/login')}
          isLogout
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 0,
    backgroundColor: colors.primary,
    marginRight: 32,
  },
  infoStack: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
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