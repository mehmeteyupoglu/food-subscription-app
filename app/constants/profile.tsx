import { router } from "expo-router";

const profileMenuItems = [
  {
    label: "Kişisel Bilgiler",
    imageSource: require('../../assets/icons/person.png'),
    onPress: () => router.push('/profile/personal-details'),
  },
  {
    label: "Aboneliğim",
    imageSource: require('../../assets/icons/subscription.png'),
    onPress: () => router.push('/profile/subscription-details'),
  },
  {
    label: "İletişim",
    imageSource: require('../../assets/icons/heart.png'),
    onPress: () => router.push('/profile/contact-details'),
  },
  {
    label: "Çıkış Yap",
    imageSource: require('../../assets/icons/Logout.png'),
    onPress: () => router.replace('/(auth)/login'),
  },
];

export default { profileMenuItems };
